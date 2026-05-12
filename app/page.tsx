"use client";

import React, { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (taskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  }

  return (
    <main>
      <h1>Taskly</h1>

      <form onSubmit={addTask}>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="add a task"
        />

        <button type="submit">add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}