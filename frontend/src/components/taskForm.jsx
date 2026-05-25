// handles input box + add button of adding task
function TaskForm({title, setTitle, handleAddTask}) {
  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value) }
        placeholder="enter task description"
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm;