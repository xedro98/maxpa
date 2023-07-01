```tsx
import { useState } from 'react';
import { tasks } from '../lib/tasks';
import '../styles/Task.css';

type TaskProps = {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
  };
};

const Task = ({ task }: TaskProps) => {
  const [taskData, setTaskData] = useState(task);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTask = await tasks.updateTask(taskData);
    setTaskData(updatedTask);
  };

  const handleDelete = async () => {
    await tasks.deleteTask(taskData.id);
  };

  return (
    <div className="task">
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <textarea
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        />
        <input
          type="date"
          value={taskData.dueDate}
          onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
        />
        <select
          value={taskData.status}
          onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default Task;
```