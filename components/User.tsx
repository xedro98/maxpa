```tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../lib/users';
import styles from '../styles/User.module.css';

interface UserProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    variables: { id: user.id, name, email, role },
    onCompleted: () => {
      alert('User updated successfully');
    },
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.user}>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          Update User
        </button>
      </form>
      {error && <p>Error updating user: {error.message}</p>}
    </div>
  );
};

export default User;
```