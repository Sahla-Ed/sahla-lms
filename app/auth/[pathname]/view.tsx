'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className='container mx-auto flex h-screen grow flex-col items-center justify-center gap-3 p-4 md:p-6'>
      <AuthCard pathname={pathname} />
    </main>
  );
}
