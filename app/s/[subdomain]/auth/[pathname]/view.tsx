'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';
import { redirect, useSearchParams } from 'next/navigation';

type AuthLocalization = {
  [key: string]: string;
};

export function AuthView({
  pathname,
  role,
  localization,
}: {
  pathname: string;
  role: string | null | undefined;
  localization: AuthLocalization;
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
      redirect('/admin?welcome=true');
    }
    redirect('/dashboard?welcome=true');
  }

  return (
    <main className='container mx-auto flex h-screen grow flex-col items-center justify-center gap-3 p-4 md:p-6'>
      <AuthCard pathname={pathname} localization={localization} />
    </main>
  );
}
