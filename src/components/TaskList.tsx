import React from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask, removeTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
          {task.text}
          <button onClick={() => removeTask(task.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
