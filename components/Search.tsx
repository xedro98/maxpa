```tsx
import { useState } from 'react';
import { useTasks } from '../lib/tasks';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { tasks, searchTasks } = useTasks();

  const handleSearch = (event) => {
    event.preventDefault();
    searchTasks(searchTerm);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {tasks && tasks.map((task) => (
        <div key={task.id} className="task">
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due date: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
```