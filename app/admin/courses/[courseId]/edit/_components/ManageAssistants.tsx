'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  addAssistant,
  getAssistants,
  removeAssistant,
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
import { CourseAssistant } from '@/lib/generated/prisma';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ASSISTANT_PERMISSIONS = {
  lesson: ['create', 'update', 'delete'],
  quiz: ['create', 'update', 'delete'],
};

interface ManageAssistantsProps {
  courseId: string;
}

export function ManageAssistants({ courseId }: ManageAssistantsProps) {
  const [assistants, setAssistants] = useState<
    (CourseAssistant & { assistant: User })[]
  >([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    startTransition(async () => {
      const [currentAssistants, users] = await Promise.all([
        getAssistants(courseId),
        getUsers(),
      ]);
      setAssistants(
        currentAssistants as (CourseAssistant & { assistant: User })[],
      );
      setAllUsers(users);
    });
  }, [courseId]);

  const openPermissionModal = (user: User) => {
    setSelectedUser(user);
    setSelectedPermissions({});
    setIsModalOpen(true);
  };

  const handlePermissionChange = (
    resource: string,
    action: string,
    checked: boolean,
  ) => {
    setSelectedPermissions((prev) => {
      const newPermissions = { ...prev };
      if (!newPermissions[resource]) {
        newPermissions[resource] = [];
      }
      if (checked) {
        newPermissions[resource].push(action);
      } else {
        newPermissions[resource] = newPermissions[resource].filter(
          (a) => a !== action,
        );
      }
      return newPermissions;
    });
  };

  const handleAddAssistant = () => {
    if (!selectedUser) return;

    startTransition(async () => {
      const response = await addAssistant({
        courseId,
        assistantId: selectedUser.id,
        permissions: selectedPermissions,
      });
      if (response.status === 'success') {
        toast.success(response.message);
        const newAssistants = await getAssistants(courseId);
        setAssistants(
          newAssistants as (CourseAssistant & { assistant: User })[],
        );
        setIsModalOpen(false);
        setSelectedUser(null);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleRemoveAssistant = (assistantId: string) => {
    startTransition(async () => {
      const response = await removeAssistant(assistantId, courseId);
      if (response.status === 'success') {
        toast.success(response.message);
        const newAssistants = await getAssistants(courseId);
        setAssistants(
          newAssistants as (CourseAssistant & { assistant: User })[],
        );
      } else {
        toast.error(response.message);
      }
    });
  };

  const unassignedUsers = allUsers.filter(
    (user) =>
      user.role === 'assistant' &&
      !assistants.some((assistant) => assistant.assistantId === user.id),
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Assistants</CardTitle>
          <CardDescription>
            Add or remove assistants and manage their permissions for this
            course.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h4 className='mb-2 text-sm font-medium'>Current Assistants</h4>
            {assistants.length === 0 && (
              <p className='text-muted-foreground text-sm'>
                No assistants assigned.
              </p>
            )}
            <div className='space-y-2'>
              {assistants.map((assistant) => (
                <div
                  key={assistant.id}
                  className='hover:bg-accent flex items-center justify-between rounded-md p-2'
                >
                  <div className='flex items-center space-x-2'>
                    <Avatar>
                      <AvatarImage src={assistant.assistant.image || ''} />
                      <AvatarFallback>
                        {assistant.assistant.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span>{assistant.assistant.name}</span>
                      <div className='mt-1 flex flex-wrap gap-1'>
                        {Object.entries(
                          assistant.permissions as Record<string, string[]>,
                        ).flatMap(([resource, actions]) =>
                          actions.map((action) => (
                            <Badge
                              key={`${resource}:${action}`}
                              variant='secondary'
                              className='text-xs'
                            >
                              {resource}:{action}
                            </Badge>
                          )),
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRemoveAssistant(assistant.id)}
                    disabled={isPending}
                  >
                    <XCircle className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className='text-sm font-medium'>Add Assistant</h4>
            <Command>
              <CommandInput placeholder='Search for users to add as assistants...' />
              <CommandList>
                <CommandEmpty>
                  No users with the assistant role found.
                </CommandEmpty>
                <CommandGroup>
                  {unassignedUsers.map((user) => (
                    <CommandItem
                      key={user.id}
                      onSelect={() => openPermissionModal(user)}
                      className='cursor-pointer'
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
                        <PlusCircle className='text-muted-foreground h-4 w-4' />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Permissions for {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            {Object.entries(ASSISTANT_PERMISSIONS).map(
              ([resource, actions]) => (
                <div key={resource}>
                  <h4 className='mb-2 font-medium capitalize'>
                    {resource} Permissions
                  </h4>
                  <div className='grid gap-2'>
                    {actions.map((action) => (
                      <div key={action} className='flex items-center space-x-2'>
                        <Checkbox
                          id={`${resource}-${action}`}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(resource, action, !!checked)
                          }
                        />
                        <Label
                          htmlFor={`${resource}-${action}`}
                          className='capitalize'
                        >
                          {action}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
          <Button onClick={handleAddAssistant} disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Assistant'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
