'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { removeTeamMember } from '../../team-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export function TeamMembers({
  teamId,
  members,
}: {
  teamId: string;
  members: {
    id: string;
    userId: string;
    user: {
      name?: string;
      image?: string;
    };
    role: string;
  }[];
}) {
  const [isPending, startTransition] = useTransition();

  const onRemove = (userId: string) => {
    startTransition(async () => {
      const response = await removeTeamMember(teamId, userId);
      if (response.status === 'success') {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className='space-y-4'>
      {members.length === 0 ? (
        <p className='text-muted-foreground text-sm'>
          No members in this team yet.
        </p>
      ) : (
        members.map((member) => (
          <div key={member.id} className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Avatar>
                <AvatarImage src={member.user.image || ''} />
                <AvatarFallback>{member.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium'>{member.user.name}</p>
                <p className='text-muted-foreground text-xs'>{member.role}</p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onRemove(member.userId)}
              disabled={isPending}
            >
              <XCircle className='h-4 w-4' />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
