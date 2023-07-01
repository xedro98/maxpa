```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../../../lib/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const allUsers = await users.getAll();
        res.status(200).json(allUsers);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
      }
      break;
    case 'POST':
      try {
        const newUser = await users.create(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Unable to create user' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```