// TaskItem manages how one task is displayed and interacted with and represents one individual task in the list 
import {useState} from "react";

function TaskItem({task, handleUpdateTask, handleDeleteTask, handleEditTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDueDate, setEditedDueDate] = useState(task.due_date ? task.due_date.slice(0, 10) : "");
  const [editedPriority, setEditedPriority] = useState(task.priority || "medium");

  return (
    <li>
      {isEditing ? (
        <div>
          <input 
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />

          <input 
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />

          <select 
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={async () => { await
              handleEditTask(task.id, {
                title: editedTitle,
                completed: task.completed,
                dueDate: editedDueDate || null,
                priority: editedPriority,
              });
              setIsEditing(false);
            }}
          > Save </button>

          <button onClick={() => {
            setEditedTitle(task.title);
            setEditedDueDate(task.due_date ? task.due_date.slice(0,10) : "");
            setEditedPriority(task.priority || "medium");
            setIsEditing(false);}}
          > Cancel </button>

        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>Edit</button>

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

          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
//{task.due_date && <span>Due: {task.due_date}</span>}
export default TaskItem;