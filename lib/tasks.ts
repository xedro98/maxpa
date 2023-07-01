```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (taskData) => {
  const newTask = await prisma.task.create({
    data: taskData,
  });
  return newTask;
};

export const readTask = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  return task;
};

export const updateTask = async (id, updatedData) => {
  const updatedTask = await prisma.task.update({
    where: { id },
    data: updatedData,
  });
  return updatedTask;
};

export const deleteTask = async (id) => {
  const deletedTask = await prisma.task.delete({
    where: { id },
  });
  return deletedTask;
};

export const getTasksByProject = async (projectId) => {
  const tasks = await prisma.task.findMany({
    where: { projectId },
  });
  return tasks;
};

export const getTasksByUser = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: { userId },
  });
  return tasks;
};

export const searchTasks = async (searchTerm) => {
  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
      ],
    },
  });
  return tasks;
};

export const filterTasks = async (filter) => {
  const tasks = await prisma.task.findMany({
    where: filter,
  });
  return tasks;
};
```