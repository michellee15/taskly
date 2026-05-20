import { useEffect, useState } from 'react'
import {
  getTasks, createTask, updateTask, deleteTask
} from "./services/taskApi"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import taskForm from './components/taskForm'
import taskList from './components/taskList';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error.message);
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
        dueDate: null,
      });
      setTasks([newTask, ...tasks]);
      setTitle("");
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

      <taskForm
        title={title}
        setTitle={setTitle}
        handleAddTask={handleAddTask}
      />

      <taskList
        tasks={tasks}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />
    </main>
  );
}

export default App
