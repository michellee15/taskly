const API_URL = "http://localhost:5000/api/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch tasks");
  }
  return result.data;
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create task");
  }

  return result.data;
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update task");
  }

  return result.data;
}

export async function deleteTask(id){
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to delete task");
  }

  return result.data;
}
