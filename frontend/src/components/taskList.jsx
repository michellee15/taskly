import TaskItem from './taskItem'

// loops through all tasks
function TaskList({ tasks, handleUpdateTask, handleDeleteTask }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add your first task.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;