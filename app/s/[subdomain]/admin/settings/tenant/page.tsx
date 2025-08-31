import { getTenantSettings } from '@/app/s/[subdomain]/data/admin/get-tenant-settings';
import { SettingsForm } from './_components/SettingsForm';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { requireAdmin } from '../../../data/admin/require-admin';
import { getTranslations } from 'next-intl/server';

export default async function TenantSettingsPage() {
  const t = await getTranslations('TenantSettingsPage');

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>{t('header.title')}</h1>
        <p className='text-muted-foreground'>{t('header.description')}</p>
      </div>
      <Suspense fallback={<SettingsSkeleton />}>
        <LoadTenantSettings />
      </Suspense>
    </div>
  );
}

async function LoadTenantSettings() {
  await requireAdmin();
  const tenantData = await getTenantSettings();
  return <SettingsForm tenant={tenantData} />;
}

function SettingsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-4 w-72' />
      </CardHeader>
      <CardContent className='space-y-8'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-64 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-64 w-full' />
          </div>
        </div>
        <div className="flex justify-end">
        <Skeleton className='h-10 w-32' />
        </div>
      </CardContent>
    </Card>
  );
}
