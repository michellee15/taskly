import { useEffect, useState } from 'react'
import {
  getTasks, createTasks, updateTask, deleteTask
} from "./services/taskApi"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
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

  return (
    <main>
      <h1>Taskly</h1>
      <p>From to-do to done</p>

      <h2>Tasks from database</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Active"}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App
