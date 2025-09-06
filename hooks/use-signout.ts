'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useSignOut() {
  const router = useRouter();
  const t = useTranslations('Auth');
  const handleSignout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          toast.success(t('signOutSuccess'));
        },
        onError: () => {
          toast.error(t('signOutError'));
        },
      },
    });
  };

  return handleSignout;
}
