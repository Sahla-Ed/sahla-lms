import {
  AccountSettingsCards,
  SecuritySettingsCards,
} from '@daveyplate/better-auth-ui';
import { Suspense } from 'react';

export default function CoursesPage() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Your settings</h1>
      </div>

      <Suspense fallback={'fallback'}>
        <AccountSettingsCards />
        <SecuritySettingsCards />
      </Suspense>
    </>
  );
}
