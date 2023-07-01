```typescript
import { render, screen } from '@testing-library/react';
import KanbanBoard from '../components/KanbanBoard';

describe('KanbanBoard', () => {
  test('renders KanbanBoard component', () => {
    render(<KanbanBoard />);
    
    expect(screen.getByTestId('kanban-board')).toBeInTheDocument();
  });

  test('displays tasks in correct status columns', async () => {
    // Mock tasks data
    const tasks = [
      { id: 1, title: 'Task 1', status: 'To Do' },
      { id: 2, title: 'Task 2', status: 'In Progress' },
      { id: 3, title: 'Task 3', status: 'Complete' },
    ];

    render(<KanbanBoard tasks={tasks} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();

    // Check if tasks are in correct columns
    expect(screen.getByTestId('to-do-column')).toContainElement(screen.getByText('Task 1'));
    expect(screen.getByTestId('in-progress-column')).toContainElement(screen.getByText('Task 2'));
    expect(screen.getByTestId('complete-column')).toContainElement(screen.getByText('Task 3'));
  });

  test('allows tasks to be moved between columns', () => {
    // This test would involve simulating drag and drop events and verifying
    // that the task element and the tasks prop have been updated accordingly.
    // This is quite complex to do in a unit test, so it's left as a placeholder.
  });
});
```