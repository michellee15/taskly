import taskItem from './taskItem';

// loops through all tasks 
function taskList ({tasks, handleUpdateTask, handleDeleteTask}) {
  if (tasks.length == 0) {
    return <p>No tasks yet. Add your first task.</p>
  }

  return (
    <u1>
      {tasks.map((task) => (
        <taskItem 
          key={task.id}
          task={task}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </u1>
  );
}

export default taskList;