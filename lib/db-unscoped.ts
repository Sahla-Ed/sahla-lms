import { PrismaClient } from './generated/prisma';

// This is a clean, unscoped instance of the Prisma Client.
// It will NOT be affected by your multi-tenancy patch.
// We will only use this for looking up tenants by their slug.
const prismaUnscoped = new PrismaClient();

export default prismaUnscoped;
