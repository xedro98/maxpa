```typescript
import { createDependency, deleteDependency } from '../lib/tasks';
import { createUser, deleteUser } from '../lib/users';

describe('Task Dependency', () => {
  let user1, user2, task1, task2, dependency;

  beforeAll(async () => {
    // Create two users
    user1 = await createUser({ username: 'user1', password: 'password1' });
    user2 = await createUser({ username: 'user2', password: 'password2' });

    // Create two tasks
    task1 = await createTask({ title: 'task1', description: 'description1', dueDate: new Date(), status: 'To Do', userId: user1.id });
    task2 = await createTask({ title: 'task2', description: 'description2', dueDate: new Date(), status: 'To Do', userId: user2.id });
  });

  afterAll(async () => {
    // Delete the users and tasks created
    await deleteUser(user1.id);
    await deleteUser(user2.id);
  });

  it('should create a dependency between two tasks', async () => {
    dependency = await createDependency(task1.id, task2.id);
    expect(dependency.taskId).toEqual(task1.id);
    expect(dependency.dependencyId).toEqual(task2.id);
  });

  it('should delete a dependency between two tasks', async () => {
    const result = await deleteDependency(dependency.id);
    expect(result).toBe(true);
  });
});
```