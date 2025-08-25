'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { authClient } from '@/lib/auth-client';

export function WelcomeToast() {
  const searchParams = useSearchParams();
  const t = useTranslations('TenantPlatform.Dashboard');


  const { data: session } = authClient.useSession();

  useEffect(() => {
    const showWelcome = searchParams.get('welcome');
    if (showWelcome === 'true' && session?.user) {
      const username =
        session.user.name && session.user.name.length > 0
          ? session.user.name
          : session.user.email.split('@')[0];

      toast.success(t('welcomeMessage', { username }));
    }
  }, [searchParams, t, session]);

  return null;
}