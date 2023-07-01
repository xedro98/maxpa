```tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SHARE_PROJECT } from '../lib/projects';
import { Project } from '../lib/projects';

interface SharedProjectProps {
  project: Project;
}

const SharedProject: React.FC<SharedProjectProps> = ({ project }) => {
  const [email, setEmail] = useState('');
  const [shareProject, { data, loading, error }] = useMutation(SHARE_PROJECT);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await shareProject({ variables: { projectId: project.id, email } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shared-project">
      <h2>Share Project</h2>
      <form onSubmit={handleShare}>
        <input
          type="email"
          placeholder="Enter email to share with"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Share
        </button>
      </form>
      {data && <p>Project shared successfully!</p>}
      {error && <p>Error sharing project: {error.message}</p>}
    </div>
  );
};

export default SharedProject;
```