'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { authClient } from '@/lib/auth-client';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
      social={{ providers: ['github'] }}
    >
      <ThemeProvider defaultTheme='dark'>{children}</ThemeProvider>
    </AuthUIProvider>
  );
}
