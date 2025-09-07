// lib/db-unscoped.ts
import { PrismaClient } from '@/lib/generated/prisma';
console.log(
  '<<<<< [db-unscoped] DATABASE_URL IS:',
  process.env.DATABASE_URL,
  '>>>>>',
);

const prismaUnscoped = new PrismaClient();

export default prismaUnscoped;
