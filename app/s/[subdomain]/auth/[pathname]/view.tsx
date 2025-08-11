'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';
import { redirect, useSearchParams } from 'next/navigation';

export function AuthView({
  pathname,
  role,
}: {
  pathname: string;
  role: string | null | undefined;
}) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  if (
    role &&
    ['sign-up', 'sign-in', 'login', 'signup', 'signin'].includes(pathname)
  ) {
    if (redirectTo) {
      redirect(redirectTo);
    }
    if (role === 'admin') {
      redirect('/admin');
    }
    redirect('/dashboard');
  }
  return (
    <main className='container mx-auto flex h-screen grow flex-col items-center justify-center gap-3 p-4 md:p-6'>
      <AuthCard pathname={pathname} />
    </main>
  );
}
