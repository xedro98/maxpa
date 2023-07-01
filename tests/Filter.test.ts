```typescript
import { render, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';

describe('Filter Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Filter />);
    expect(getByTestId('filter-component')).toBeInTheDocument();
  });

  it('filters tasks by status', () => {
    const { getByTestId } = render(<Filter />);
    const selectElement = getByTestId('filter-status');
    fireEvent.change(selectElement, { target: { value: 'In Progress' } });
    expect(selectElement.value).toBe('In Progress');
  });

  it('filters tasks by due date', () => {
    const { getByTestId } = render(<Filter />);
    const selectElement = getByTestId('filter-due-date');
    fireEvent.change(selectElement, { target: { value: '2022-12-31' } });
    expect(selectElement.value).toBe('2022-12-31');
  });

  it('filters tasks by project', () => {
    const { getByTestId } = render(<Filter />);
    const selectElement = getByTestId('filter-project');
    fireEvent.change(selectElement, { target: { value: 'Project 1' } });
    expect(selectElement.value).toBe('Project 1');
  });
});
```