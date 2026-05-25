// controls the category all/active/completed tasks
function TaskFilter({filter, setFilter}) {
  const filters = ["all", "active", "completed"];
  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </div>

  )
}

export default TaskFilter;