import { createAccessControl } from 'better-auth/plugins/access';
import {
  defaultStatements as adminDefaultStatements,
  adminAc as adminDefaultAc,
} from 'better-auth/plugins/admin/access';
import {
  defaultStatements as orgDefaultStatements,
  adminAc as orgAdminAc,
  ownerAc as orgOwnerAc,
  memberAc as orgMemberAc,
} from 'better-auth/plugins/organization/access';

export const statement = {
  ...adminDefaultStatements,
  ...orgDefaultStatements,
  project: ['create', 'read', 'update', 'delete', 'assign_team'],
  course: [
    'create',
    'read',
    'update',
    'delete',
    'assign_instructor',
    'assign_assistant',
  ],
  lesson: ['create', 'read', 'update', 'delete'],
  quiz: ['create', 'read', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const siteAdmin = ac.newRole({
  ...adminDefaultAc.statements,
  ...orgOwnerAc.statements,
  project: ['create', 'read', 'update', 'delete', 'assign_team'],
  course: [
    'create',
    'read',
    'update',
    'delete',
    'assign_instructor',
    'assign_assistant',
  ],
  lesson: ['create', 'read', 'update', 'delete'],
  quiz: ['create', 'read', 'update', 'delete'],
});

export const instructor = ac.newRole({
  ...orgAdminAc.statements,

  course: ['read', 'update', 'assign_assistant'],
  lesson: ['create', 'read', 'update', 'delete'],
  quiz: ['create', 'read', 'update', 'delete'],
});

export const assistant = ac.newRole({
  ...orgMemberAc.statements,

  course: ['read'],
  lesson: ['read'],
  quiz: ['read'],
});

export const user = ac.newRole({
  ...orgMemberAc.statements,
});
