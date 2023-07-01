```typescript
import { render, fireEvent } from '@testing-library/react';
import { Task } from '../components/Task';
import { tasks } from '../lib/tasks';

describe('Task Component', () => {
  it('renders without crashing', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      status: 'To Do',
    };

    const { getByText } = render(<Task task={task} />);
    expect(getByText('Test Task')).toBeInTheDocument();
  });

  it('updates task status', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      status: 'To Do',
    };

    const { getByTestId } = render(<Task task={task} />);
    const statusSelect = getByTestId('status-select');
    fireEvent.change(statusSelect, { target: { value: 'In Progress' } });
    expect(tasks.updateTask).toHaveBeenCalledWith('1', { status: 'In Progress' });
  });

  it('deletes a task', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      status: 'To Do',
    };

    const { getByTestId } = render(<Task task={task} />);
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(tasks.deleteTask).toHaveBeenCalledWith('1');
  });
});
```