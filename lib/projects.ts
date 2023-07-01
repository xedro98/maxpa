```typescript
import { db } from './db';

export const createProject = async (project) => {
  const result = await db.query('INSERT INTO projects (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *', [project.title, project.description, project.owner_id]);
  return result.rows[0];
};

export const getProjects = async () => {
  const result = await db.query('SELECT * FROM projects');
  return result.rows;
};

export const getProjectById = async (id) => {
  const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateProject = async (id, project) => {
  const result = await db.query('UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *', [project.title, project.description, id]);
  return result.rows[0];
};

export const deleteProject = async (id) => {
  const result = await db.query('DELETE FROM projects WHERE id = $1', [id]);
  return result.rowCount > 0;
};

export const assignTaskToProject = async (taskId, projectId) => {
  const result = await db.query('UPDATE tasks SET project_id = $1 WHERE id = $2', [projectId, taskId]);
  return result.rowCount > 0;
};

export const getTasksByProjectId = async (projectId) => {
  const result = await db.query('SELECT * FROM tasks WHERE project_id = $1', [projectId]);
  return result.rows;
};
```