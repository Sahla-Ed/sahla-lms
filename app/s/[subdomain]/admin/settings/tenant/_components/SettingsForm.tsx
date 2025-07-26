'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import { Uploader } from '@/components/file-uploader/Uploader';
import { getTenantSettings } from '@/app/s/[subdomain]/data/admin/get-tenant-settings';
import { updateTenantSettings } from '../actions';
import { protocol, rootDomain } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const settingsSchema = z.object({
  name: z.string().min(3, 'platform name is required'),
  slug: z.string().min(3, 'URL slug is required'),
  logo: z.string().optional(),
  logoDark: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;
type TenantSettings = Awaited<ReturnType<typeof getTenantSettings>>;

interface SettingsFormProps {
  tenant?: TenantSettings;
}

export function SettingsForm({ tenant }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: tenant?.name || '',
      slug: tenant?.slug || '',
      logo: tenant?.logo || '',
      logoDark: tenant?.logoDark || '',
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    startTransition(async () => {
      const result = await updateTenantSettings(values);

      if (result.status === 'success') {
        toast.success(result.message);
        if (result.newSlug && result.transferToken) {
          const newUrl = `${protocol}://${result.newSlug}.${rootDomain}/api/auth/session-transfer?token=${result.transferToken}`;
          // Use window.location for a full page reload to the new domain
          window.location.href = newUrl;
        } else {
          router.refresh();
        }
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>platform Settings</CardTitle>
        <CardDescription>
          Manage your platform&apos;s name, URL, and branding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>platform Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Your platform Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>platform URL</FormLabel>
                  <FormControl>
                    <div className='flex items-center'>
                      <Input
                        placeholder='your-platform'
                        {...field}
                        className='rounded-r-none focus-visible:ring-0'
                      />
                      <span className='border-input bg-muted text-muted-foreground inline-flex h-9 items-center rounded-r-md border border-l-0 px-3 text-sm'>
                        .{rootDomain.split(':')[0]}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='logo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo (Light Mode)</FormLabel>
                    <FormControl>
                      <Uploader
                        fileTypeAccepted='image'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='logoDark'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo (Dark Mode)</FormLabel>
                    <FormControl>
                      <Uploader
                        fileTypeAccepted='image'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader2 className='mr-2 size-4 animate-spin' />
              ) : (
                <Save className='mr-2 size-4' />
              )}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
