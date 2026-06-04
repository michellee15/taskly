import { useEffect, useState } from 'react'
import {
  getTasks, createTask, updateTask, deleteTask
} from "./services/taskApi"
import TaskForm from './components/taskForm'
import TaskList from './components/taskList'
import TaskFilter from './components/taskFilter'
import SearchBar from './components/searchBar'
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
        dueDate: due_date || null, //if user never choose a date, then database should receive null
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

  return (
    <main>
      <h1>Taskly</h1>
  
      <TaskForm
        title={title}
        setTitle={setTitle}
        dueDate={dueDate}
        setDueDate={setDueDate}
        priority={priority}
        setPriority={setPriority}
        handleAddTask={handleAddTask}
      />

      <TaskFilter filter={filter} setFilter={setFilter}/>

      <SearchBar 
        searchTask={searchTask}
        setSearchTask={setSearchTask}
      />

      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={searchedTasks}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}
    </main>
  );
}

export default App
