function TaskStats({tasks}) {
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const highPriorityTasks = tasks.filter((task) => task.priority == "high").length;
  return (
    <div>
      <h2>Task Summary</h2>
      <p>Total tasks: {totalTasks}</p>
      <p>Active Tasks: {activeTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>High priority tasks: {highPriorityTasks}</p>
    </div>
  )

}

export default TaskStats;