```tsx
import React, { useState } from 'react';

const Filter = () => {
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleFilter = () => {
    // Call filterTasks function from lib/tasks.ts with status and dueDate as parameters
    // This function is not defined in this file, it's just a placeholder for the actual function
    filterTasks(status, dueDate);
  };

  return (
    <div className="filter-container">
      <select value={status} onChange={handleStatusChange}>
        <option value="">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Complete">Complete</option>
      </select>
      <input type="date" value={dueDate} onChange={handleDueDateChange} />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default Filter;
```