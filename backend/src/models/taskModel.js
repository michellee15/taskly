const pool = require("../config/db");

async function getAllTasks() {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );

  return result.rows;
}

async function getTaskById(id) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

async function createTask(title, dueDate, priority) {
  const result = await pool.query(
    `INSERT INTO tasks (title, due_date, priority)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, dueDate || null, priority || "medium"]
  );

  return result.rows[0];
}

async function updateTask(id, title, completed, dueDate, priority) {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         completed = $2,
         due_date = $3,
         priority = $4,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [title, completed, dueDate || null, priority || "medium", id]
  );

  return result.rows[0];
}

async function deleteTask(id) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};