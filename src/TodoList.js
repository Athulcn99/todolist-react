import { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [newTask, setNewTask] = useState(""); // State for input field

  // Function to add a task
  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent empty tasks
    setTasks([...tasks, newTask]); // Add new task to the list
    setNewTask(""); // Clear input field
  };

  // Function to remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} <button onClick={()=>removeTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
