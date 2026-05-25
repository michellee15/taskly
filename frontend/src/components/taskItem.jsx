// TaskItem manages how one task is displayed and interacted with and represents one task in the list 
function TaskItem({task, handleUpdateTask, handleDeleteTask}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleUpdateTask(task)}
      />
        
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
        {task.due_date && <span> | Due: {new Date(task.due_date).toLocaleDateString("en-SG", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })}</span>}
        {task.priority && <span> | Priority: {task.priority}</span>}
      </span>
        
      <button onClick={() => handleDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}
//{task.due_date && <span>Due: {task.due_date}</span>}
export default TaskItem;