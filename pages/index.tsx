```tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import SignIn from '../components/SignIn';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Task from '../components/Task';
import Project from '../components/Project';
import Notification from '../components/Notification';

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/signin');
    }
  }, [session, loading, router]);

  if (loading) return null;

  return (
    <div>
      <Navbar />
      {session ? (
        <div>
          <Task />
          <Project />
          <Notification />
        </div>
      ) : (
        <SignIn />
      )}
      <Footer />
    </div>
  );
}
```