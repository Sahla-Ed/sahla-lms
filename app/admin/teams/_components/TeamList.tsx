/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Link from 'next/link';
import { getTeams } from '../actions';

export async function TeamList() {
  const teams = await getTeams();

  if (teams.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no teams
          </h3>
          <p className='text-muted-foreground text-sm'>
            You can start creating teams.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {teams.map((team: any) => (
        <Link href={`/admin/teams/${team.id}`} key={team.id}>
          <Card className='hover:border-primary h-full transition-colors'>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>{team.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-sm'>
                Created on: {new Date(team.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
