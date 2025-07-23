'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  addInstructor,
  getInstructors,
  removeInstructor,
} from '../access-actions';
import { useEffect, useState, useTransition } from 'react';
import { User } from '@/lib/generated/prisma';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getUsers } from '@/app/data/user/get-users';

interface ManageInstructorsProps {
  courseId: string;
}

export function ManageInstructors({ courseId }: ManageInstructorsProps) {
  const [instructors, setInstructors] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [currentInstructors, users] = await Promise.all([
        getInstructors(courseId),
        getUsers(),
      ]);
      setInstructors(currentInstructors);
      setAllUsers(users);
    });
  }, [courseId]);

  const handleAddInstructor = (userId: string) => {
    startTransition(async () => {
      const response = await addInstructor({ courseId, userId });
      if (response.status === 'success') {
        toast.success(response.message);
        const newInstructors = await getInstructors(courseId);
        setInstructors(newInstructors);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleRemoveInstructor = (userId: string) => {
    startTransition(async () => {
      const response = await removeInstructor({ courseId, userId });
      if (response.status === 'success') {
        toast.success(response.message);
        const newInstructors = await getInstructors(courseId);
        setInstructors(newInstructors);
      } else {
        toast.error(response.message);
      }
    });
  };

  const unassignedUsers = allUsers.filter(
    (user) => !instructors.some((instructor) => instructor.id === user.id),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Instructors</CardTitle>
        <CardDescription>
          Add or remove instructors for this course.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h4 className='text-sm font-medium'>Current Instructors</h4>
          <div className='space-y-2'>
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center space-x-2'>
                  <Avatar>
                    <AvatarImage src={instructor.image || ''} />
                    <AvatarFallback>
                      {instructor.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{instructor.name}</span>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleRemoveInstructor(instructor.id)}
                  disabled={isPending}
                >
                  <XCircle className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className='text-sm font-medium'>Add Instructor</h4>
          <Command>
            <CommandInput placeholder='Search for users...' />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {unassignedUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => handleAddInstructor(user.id)}
                  >
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Avatar>
                          <AvatarImage src={user.image || ''} />
                          <AvatarFallback>
                            {user.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <Button variant='ghost' size='sm' disabled={isPending}>
                        <PlusCircle className='h-4 w-4' />
                      </Button>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </CardContent>
    </Card>
  );
}
