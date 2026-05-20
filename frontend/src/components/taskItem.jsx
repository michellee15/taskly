// TaskItem manages how one task is displayed and interacted with and represents one task in the list 
function taskItem({task, handleUpdateTask, handleDeleteTask}) {
  return (
    <li>
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
  );
}

export default taskItem;