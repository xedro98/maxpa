```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data) {
  return await prisma.user.create({
    data,
  });
}

export async function getUser(id) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
  });
}

export async function getUsers() {
  return await prisma.user.findMany();
}
```