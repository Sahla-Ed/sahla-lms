import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getProjects } from '../actions';
import { ProjectActions } from './ProjectActions';

export async function ProjectList() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no projects
          </h3>
          <p className='text-muted-foreground text-sm'>
            You can start creating projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {projects.map((project) => (
        <Card key={project.id} className='flex flex-col'>
          <CardHeader className='flex flex-row items-start justify-between'>
            <div>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>
                {project.description || 'No description'}
              </CardDescription>
            </div>
            <ProjectActions project={project} />
          </CardHeader>
          <CardContent className='mt-auto'>
            <p className='text-muted-foreground text-sm'>
              Created on: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
