// handles input box + add button of adding task
function TaskForm({title, setTitle, dueDate, setDueDate, priority, setPriority, handleAddTask}) {
  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value) }
        placeholder="enter task description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm;