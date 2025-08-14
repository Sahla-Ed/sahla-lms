'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { authClient } from '@/lib/auth-client';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const customPush = (url: string) => {
    router.push(url);
  };

  const customReplace = (url: string) => {
    router.replace(url);
  };

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={customPush}
      replace={customReplace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
      social={{ providers: ['github'] }}
      redirectTo='/random'
    >
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AuthUIProvider>
  );
}
