import 'server-only';
import { prisma } from '@/lib/db';
import { requireUser } from '../user/require-user';
import { statement as allStatements } from '@/lib/permissions';

type Resource = keyof typeof allStatements;
type Action<R extends Resource> = (typeof allStatements)[R][number];

export async function checkCoursePermission<R extends Resource>(
  courseId: string,
  resource: R,
  action: Action<R>,
) {
  const session = await requireUser();
  if (!session) {
    throw new Error('Authentication required.');
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  if (userRole === 'admin') {
    return true;
  }

  const isAssignedInstructor = await prisma.course.findFirst({
    where: {
      id: courseId,
      instructors: { some: { id: userId } },
    },
  });

  if (isAssignedInstructor) {
    if (resource === 'lesson' || resource === 'quiz') {
      return true;
    }
    if (resource === 'course' && action === 'update') {
      return true;
    }
    if (resource === 'course' && action === 'assign_assistant') {
      return true;
    }
    if (resource === 'course' && action === 'assign_instructor') {
      return true;
    }
  }

  if (userRole === 'assistant') {
    const assistant = await prisma.courseAssistant.findFirst({
      where: {
        courseId: courseId,
        assistantId: userId,
      },
    });

    if (assistant) {
      const permissions = assistant.permissions as Record<string, string[]>;
      if (
        permissions[resource] &&
        permissions[resource].includes(action as string)
      ) {
        return true;
      }
    }
  }

  throw new Error(
    'Permission Denied: You do not have the necessary rights to perform this action.',
  );
}
