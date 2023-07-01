```tsx
import { useState } from 'react';
import { Task } from '../lib/tasks';
import { createDependency } from '../lib/tasks';

const TaskDependency = () => {
  const [dependentTask, setDependentTask] = useState<Task | null>(null);
  const [dependencyTask, setDependencyTask] = useState<Task | null>(null);

  const handleDependentTaskChange = (task: Task) => {
    setDependentTask(task);
  };

  const handleDependencyTaskChange = (task: Task) => {
    setDependencyTask(task);
  };

  const handleCreateDependency = async () => {
    if (dependentTask && dependencyTask) {
      try {
        await createDependency(dependentTask, dependencyTask);
        alert('Dependency created successfully');
      } catch (error) {
        alert('Failed to create dependency');
      }
    } else {
      alert('Please select both tasks');
    }
  };

  return (
    <div>
      <h2>Create Task Dependency</h2>
      <div>
        <label>Dependent Task</label>
        <select onChange={(e) => handleDependentTaskChange(e.target.value)}>
          {/* Populate with tasks */}
        </select>
      </div>
      <div>
        <label>Dependency Task</label>
        <select onChange={(e) => handleDependencyTaskChange(e.target.value)}>
          {/* Populate with tasks */}
        </select>
      </div>
      <button onClick={handleCreateDependency}>Create Dependency</button>
    </div>
  );
};

export default TaskDependency;
```