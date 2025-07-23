'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteTeam } from '../../team-actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function DeleteTeam({ teamId }: { teamId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    startTransition(async () => {
      const response = await deleteTeam(teamId);
      if (response.status === 'success') {
        toast.success(response.message);
        router.push('/admin/teams');
        router.refresh(); // Force a refresh of the team list page
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className='space-y-4'>
      <p className='text-muted-foreground text-sm'>
        Once you delete a team, there is no going back. Please be certain.
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' className='w-full'>
            Delete Team
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              team and remove all members.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant='destructive'
                onClick={onDelete}
                disabled={isPending}
              >
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isPending ? 'Deleting...' : 'Delete Team'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
