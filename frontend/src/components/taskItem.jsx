// TaskItem manages how one task is displayed and interacted with and represents one individual task in the list 
import './TaskItem.css';
import {useState} from "react";

function TaskItem({task, handleUpdateTask, handleDeleteTask, handleEditTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDueDate, setEditedDueDate] = useState(task.due_date ? task.due_date.slice(0, 10) : "");
  const [editedPriority, setEditedPriority] = useState(task.priority || "medium");

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="task-edit-form">
          <div className="task-edit-fields">
            <input
              className="task-edit-input"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Task title"
            />
            <div className="task-edit-row">
              <input
                className="task-edit-input"
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
              />
              <select
                className="task-edit-input"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="task-edit-actions">
            <button
              className="primary"
              onClick={async () => {
                await handleEditTask(task.id, {
                  title: editedTitle,
                  completed: task.completed,
                  dueDate: editedDueDate || null,
                  priority: editedPriority,
                });
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="secondary"
              onClick={() => {
                setEditedTitle(task.title);
                setEditedDueDate(task.due_date ? task.due_date.slice(0, 10) : "");
                setEditedPriority(task.priority || "medium");
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-row">
          {/* Left: checkbox + content */}
          <div className="task-left">
            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleUpdateTask(task)}
            />
            <div className="task-content">
              <span className={`task-title ${task.completed ? "task-completed" : ""}`}>
                {task.title}
              </span>
              <div className="task-meta">
                {task.due_date && (
                  <span className="task-meta-item">
                    {new Date(task.due_date).toLocaleDateString("en-SG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
                {task.priority && (
                  <span className={`task-priority task-priority--${task.priority}`}>
                    {task.priority}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="task-actions">
            <button className="task-btn task-btn--edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="task-btn task-btn--delete" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
