```typescript
import { render, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

describe('Search Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('search-input')).toBeInTheDocument();
  });

  it('calls the onChange prop when it is provided', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Search onChange={handleChange} />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'Test Task' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('updates the value when typing', () => {
    const { getByTestId } = render(<Search />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'Test Task' } });
    expect(searchInput.value).toBe('Test Task');
  });
});
```