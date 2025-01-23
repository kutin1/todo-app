import React, { useState } from 'react';
import './App.css';

interface Task {
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    setTasks([...tasks, { text: taskText, completed: false }]);
    setTaskText('');
  };

  const toggleTaskCompletion = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <header>
        <h1>todos</h1>
      </header>
      <div>
        <input
          type="text"
          placeholder="Добавить новую задачу"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Добавить</button>
      </div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                aria-label={task.text}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
            </label>
            <button onClick={() => removeTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
      <h2>Active Tasks</h2>
      <ul>
        {activeTasks.map((task, index) => (
          <li key={index}>
            {task.text}
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>
            {task.text}
          </li>
        ))}
      </ul>
      <div>
        <span>{activeTasks.length} items left</span>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
};

export default App;
