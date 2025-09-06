'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';

import { useTranslations } from 'next-intl';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const t = useTranslations('BetterAuth');

  const localization = {
    SETTINGS: t('SETTINGS'),
    ACCOUNT: t('ACCOUNT'),
    SECURITY: t('SECURITY'),
    SETTINGS_DESCRIPTION: t('SETTINGS_DESCRIPTION'),
    NAME: t('NAME'),
    NAME_DESCRIPTION: t('NAME_DESCRIPTION'),
    NAME_INSTRUCTIONS: t('NAME_INSTRUCTIONS'),
    EMAIL: t('EMAIL'),
    EMAIL_DESCRIPTION: t('EMAIL_DESCRIPTION'),
    EMAIL_INSTRUCTIONS: t('EMAIL_INSTRUCTIONS'),
    SAVE: t('SAVE'),
    UPDATED_SUCCESSFULLY: t('UPDATED_SUCCESSFULLY'),
    CHANGE_PASSWORD: t('CHANGE_PASSWORD'),
    CHANGE_PASSWORD_DESCRIPTION: t('CHANGE_PASSWORD_DESCRIPTION'),
    CHANGE_PASSWORD_INSTRUCTIONS: t('CHANGE_PASSWORD_INSTRUCTIONS'),
    CURRENT_PASSWORD: t('CURRENT_PASSWORD'),
    CURRENT_PASSWORD_PLACEHOLDER: t('CURRENT_PASSWORD_PLACEHOLDER'),
    NEW_PASSWORD: t('NEW_PASSWORD'),
    NEW_PASSWORD_PLACEHOLDER: t('NEW_PASSWORD_PLACEHOLDER'),
    CONFIRM_PASSWORD: t('CONFIRM_PASSWORD'),
    CONFIRM_PASSWORD_PLACEHOLDER: t('CONFIRM_PASSWORD_PLACEHOLDER'),
    UPDATE_PASSWORD: t('UPDATE_PASSWORD'),
    CHANGE_PASSWORD_SUCCESS: t('CHANGE_PASSWORD_SUCCESS'),
    TWO_FACTOR: t('TWO_FACTOR'),
    TWO_FACTOR_CARD_DESCRIPTION: t('TWO_FACTOR_CARD_DESCRIPTION'),
    TWO_FACTOR_ENABLE_INSTRUCTIONS: t('TWO_FACTOR_ENABLE_INSTRUCTIONS'),
    TWO_FACTOR_DISABLE_INSTRUCTIONS: t('TWO_FACTOR_DISABLE_INSTRUCTIONS'),
    ENABLE_TWO_FACTOR: t('ENABLE_TWO_FACTOR'),
    DISABLE_TWO_FACTOR: t('DISABLE_TWO_FACTOR'),
    TWO_FACTOR_ENABLED: t('TWO_FACTOR_ENABLED'),
    TWO_FACTOR_DISABLED: t('TWO_FACTOR_DISABLED'),
    PROVIDERS: t('PROVIDERS'),
    PROVIDERS_DESCRIPTION: t('PROVIDERS_DESCRIPTION'),
    LINK: t('LINK'),
    UNLINK: t('UNLINK'),
    SESSIONS: t('SESSIONS'),
    SESSIONS_DESCRIPTION: t('SESSIONS_DESCRIPTION'),
    REVOKE: t('REVOKE'),
    CURRENT_SESSION: t('CURRENT_SESSION'),
    SIGN_OUT: t('SIGN_OUT'),
  };

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
      social={{ providers: ['github'] }}
      redirectTo='/random'
      localization={localization}
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
