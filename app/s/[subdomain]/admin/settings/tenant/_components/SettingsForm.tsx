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
import { useTranslations } from 'next-intl';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type TenantSettings = Awaited<ReturnType<typeof getTenantSettings>>;

interface SettingsFormProps {
  tenant: TenantSettings;
}

const getSettingsSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(3, t('validation.nameRequired')),
    slug: z.string().min(3, t('validation.slugRequired')),
    logo: z.string().optional(),
    logoDark: z.string().optional(),
  });

export function SettingsForm({ tenant }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations('TenantSettingsPage.form');

  const settingsSchema = getSettingsSchema(t);
  type SettingsFormValues = z.infer<typeof settingsSchema>;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: tenant.name || '',
      slug: tenant.slug || '',
      logo: tenant.logo || '',
      logoDark: tenant.logoDark || '',
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    startTransition(async () => {
      const result = await updateTenantSettings(values);

      if (result.status === 'success') {
        toast.success(
          result.newSlug
            ? t('notifications.updateSuccessRedirect')
            : t('notifications.updateSuccess'),
        );
        if (result.newSlug && result.transferToken) {
          const newUrl = `${protocol}://${result.newSlug}.${rootDomain}/api/auth/session-transfer?token=${result.transferToken}`;
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
        <CardTitle>{t('cardTitle')}</CardTitle>
        <CardDescription>{t('cardDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('namePlaceholder')} {...field} />
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
                  <FormLabel>{t('urlLabel')}</FormLabel>
                  <FormControl>
                    <div className='flex items-center'>
                      <Input
                        placeholder={t('urlPlaceholder')}
                        {...field}
                        className='rounded-r-none focus-visible:ring-0 rtl:rounded-l-none rtl:rounded-r-md'
                      />
                      <span className='border-input bg-muted text-muted-foreground inline-flex h-9 items-center rounded-r-md border border-l-0 px-3 text-sm rtl:rounded-l-md rtl:rounded-r-none rtl:border-r-0 rtl:border-l'>
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
                    <FormLabel>{t('logoLightLabel')}</FormLabel>
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
                    <FormLabel>{t('logoDarkLabel')}</FormLabel>
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
            <div className='flex justify-end'>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader2 className='ml-2 size-4 animate-spin' />
                ) : (
                  <Save className='ml-2 size-4' />
                )}
                {isPending ? t('savingButton') : t('saveButton')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
