```typescript
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "./db";

export async function signIn(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const { db } = await connectToDatabase();

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // Here you would generate a JWT token and send it to the user
  // For simplicity, we are skipping this step

  return res.status(200).json({ message: "Logged in successfully" });
}

export async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const { db } = await connectToDatabase();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = await db.collection("users").insertOne({ email, password });

  // Here you would generate a JWT token and send it to the user
  // For simplicity, we are skipping this step

  return res.status(200).json({ message: "User created successfully" });
}

export async function signOut(req: NextApiRequest, res: NextApiResponse) {
  // Here you would invalidate the user's JWT token
  // For simplicity, we are skipping this step

  return res.status(200).json({ message: "Logged out successfully" });
}

export async function checkAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    return res.status(200).json({ message: "User is authenticated" });
  } else {
    return res.status(401).json({ message: "User is not authenticated" });
  }
}
```