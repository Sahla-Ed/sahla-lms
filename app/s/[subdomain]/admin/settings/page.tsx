import {
  AccountSettingsCards,
  SecuritySettingsCards,
} from '@daveyplate/better-auth-ui';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function SettingsPage() {
  const tPage = await getTranslations('SettingsPage');

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{tPage('header.title')}</h1>
      </div>

      <Suspense fallback={tPage('loadingMessage')}>
        <AccountSettingsCards />
        <SecuritySettingsCards />
      </Suspense>
    </>
  );
}
