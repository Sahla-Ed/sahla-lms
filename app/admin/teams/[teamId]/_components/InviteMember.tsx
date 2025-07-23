'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { inviteTeamMember, OrganizationRole } from '../../team-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const inviteSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  role: z.string().min(1, { message: 'Please select a role.' }),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export function InviteMember({ teamId }: { teamId: string }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: 'member',
    },
  });

  const onSubmit = (values: InviteFormData) => {
    startTransition(async () => {
      const response = await inviteTeamMember(
        teamId,
        values.email,
        values.role as OrganizationRole,
      );
      if (response.status === 'success') {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='member'>Member</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='owner'>Owner</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Sending Invitation...
            </>
          ) : (
            'Send Invitation'
          )}
        </Button>
      </form>
    </Form>
  );
}
