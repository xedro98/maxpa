```tsx
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

const Navbar: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <nav className="navbar">
      <Link href="/">
        <a className="navbar-brand">Task Manager</a>
      </Link>
      <div className="navbar-nav">
        {!loading && !session && (
          <>
            <Link href="/signin">
              <a className="nav-link">Sign In</a>
            </Link>
            <Link href="/signup">
              <a className="nav-link">Sign Up</a>
            </Link>
          </>
        )}
        {!loading && session && (
          <>
            <Link href="/tasks">
              <a className="nav-link">Tasks</a>
            </Link>
            <Link href="/projects">
              <a className="nav-link">Projects</a>
            </Link>
            <Link href="/notifications">
              <a className="nav-link">Notifications</a>
            </Link>
            <a className="nav-link" onClick={() => signOut()}>Sign Out</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
```