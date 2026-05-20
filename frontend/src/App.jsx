import { useEffect, useState } from 'react'
import {
  getTasks, createTask, updateTask, deleteTask
} from "./services/taskApi"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a description"
        />
        <button type="submit">Add</button>  
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleUpdateTask(task)}
          />
        
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
        
          <button onClick={() => handleDeleteTask(task.id)}>
            Delete
          </button>
        </li>
        ))}
      </ul>
    </main>
  );
}

export default App
