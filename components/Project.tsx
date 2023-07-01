```tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from '../lib/projects';
import { Project as ProjectType } from '../lib/types';

interface ProjectProps {
  project: ProjectType;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleUpdate = async () => {
    await updateProject({ variables: { id: project.id, title, description } });
  };

  const handleDelete = async () => {
    await deleteProject({ variables: { id: project.id } });
  };

  return (
    <div className="project">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Project</button>
      <button onClick={handleDelete}>Delete Project</button>
    </div>
  );
};

export const NewProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createProject] = useMutation(CREATE_PROJECT);

  const handleCreate = async () => {
    await createProject({ variables: { title, description } });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="new-project">
      <input
        type="text"
        value={title}
        placeholder="Project Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        placeholder="Project Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreate}>Create Project</button>
    </div>
  );
};

export default Project;
```