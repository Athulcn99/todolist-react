import { useState, useEffect } from "react";
import './TodoList.css'; // Import the CSS file

function TodoList() {
  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { 
      text: newTask, 
      id: Date.now() 
    }]);
    setNewTask("");
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h2 className="todo-header">To-Do List</h2>
      
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-message">No tasks yet. Add one above!</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className="task-text">{task.text}</span>
              <button 
                onClick={() => removeTask(task.id)} 
                className="delete-button"
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
