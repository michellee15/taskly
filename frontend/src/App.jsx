import { useEffect, useState } from 'react'
import {
  getTasks, createTask, updateTask, deleteTask
} from "./services/taskApi"
import TaskForm from './components/taskForm'
import TaskList from './components/taskList'
import TaskFilter from './components/taskFilter'
import SearchBar from './components/searchBar'
import SortDropdown from './components/sortDropdown'
import TaskStats from './components/taskStats';
import './App.css'

function App() {
  const[filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [searchTask, setSearchTask] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredTasks = tasks.filter((task) => {
    if (filter == "active") {
      return !task.completed;
    }

    if (filter == "completed") {
      return task.completed;
    }

    return true;
  });
  
  const searchedTasks = filteredTasks.filter((task) => task.title.toLowerCase().includes(searchTask.toLowerCase())); 

  const sortedTasks = [...searchedTasks].sort((a, b) => {

    if (a.completed !== b.completed) return a.completed - b.completed;

    if (sortBy == "newest") return new Date(b.created_at) - new Date(a.created_at);

    if (sortBy == "oldest") return new Date(a.created_at) - new Date(b.created_at);

    if (sortBy == "dueDate") {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;

      return new Date(a.due_date) - new Date(b.due_date);
    }

    if (sortBy == "priority") {
      const priorityOrder = {high: 3, medium: 2, low: 1}
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return 0;
  })

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  async function handleAddTask(e) {
    e.preventDefault();
    if (title.trim() == "") return;
    try {
      const newTask = await createTask({
        title: title,
        dueDate: dueDate || null, //if user never choose a date, then database should receive null
        priority: priority,
      });
      setTasks([newTask, ...tasks]);

      setTitle("");
      setDueDate("");
      setPriority("medium");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleUpdateTask(task) {
    try {
      const updatedTask = await updateTask(task.id, {
        title: task.title,
        completed: !task.completed,
        dueDate: task.due_date,
        priority: task.priority,
      });
      setTasks(
        tasks.map((currentTask) => currentTask.id == task.id ? updatedTask : currentTask)
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleEditTask(id, updatedTaskData){
    try {
      const editedTask = await updateTask(id, updatedTaskData);
      setTasks(
        tasks.map((currentTask) => currentTask.id == id ? editedTask : currentTask)
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Taskly</h1>
        <p>Organise your tasks, priorities, and deadlines in one place.</p>
      </header>
    
      <section className="task-form-section">
        <TaskForm
          title={title}
          setTitle={setTitle}
          dueDate={dueDate}
          setDueDate={setDueDate}
          priority={priority}
          setPriority={setPriority}
          handleAddTask={handleAddTask}
        />
      </section>

      <section className="stats-section">
        <TaskStats tasks={tasks} />
      </section>

      <section className="controls-container">
        <TaskFilter filter={filter} setFilter={setFilter}/>
        <SearchBar 
          searchTask={searchTask}
          setSearchTask={setSearchTask}
        />
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy}/>
      </section>

      <section className="task-list-section">
        {loading && <p>Loading tasks...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <TaskList
              tasks={sortedTasks}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
            />
          )}
      </section>
    </main>
  );
}

export default App
