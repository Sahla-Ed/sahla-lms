import { AuthView } from './view';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pathname: string }>;
}): Promise<Metadata> {
  const { pathname } = await params;
  const t = await getTranslations('AuthMetadata');

  let title = t('defaultTitle');

  if (['sign-in', 'login', 'signin'].includes(pathname)) {
    title = t('signInTitle');
  } else if (['sign-up', 'signup'].includes(pathname)) {
    title = t('signUpTitle');
  } else if (['forgot-password', 'reset-password'].includes(pathname)) {
    title = t('forgotPasswordTitle');
  }

  return {
    title: title,
  };
}

interface AuthPageProps {
  params: Promise<{
    pathname: string;
  }>;
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { pathname } = await params;
  const user = await requireUser(false);

  const t = await getTranslations('Auth');

  const localization = {
    OR_CONTINUE_WITH: t('OR_CONTINUE_WITH'),
    GO_BACK: t('GO_BACK'),

    SIGN_IN: t('SIGN_IN'),
    SIGN_IN_DESCRIPTION: t('SIGN_IN_DESCRIPTION'),
    SIGN_IN_ACTION: t('SIGN_IN_ACTION'),
    DONT_HAVE_AN_ACCOUNT: t('DONT_HAVE_AN_ACCOUNT'),
    SIGN_UP: t('SIGN_UP'),
    SIGN_IN_WITH: t('SIGN_IN_WITH'),

    SIGN_UP_ACTION: t('SIGN_UP_ACTION'),
    SIGN_UP_DESCRIPTION: t('SIGN_UP_DESCRIPTION'),
    ALREADY_HAVE_AN_ACCOUNT: t('ALREADY_HAVE_AN_ACCOUNT'),

    FORGOT_PASSWORD: t('FORGOT_PASSWORD'),
    FORGOT_PASSWORD_LINK: t('FORGOT_PASSWORD_LINK'),
    FORGOT_PASSWORD_DESCRIPTION: t('FORGOT_PASSWORD_DESCRIPTION'),
    FORGOT_PASSWORD_ACTION: t('FORGOT_PASSWORD_ACTION'),

    EMAIL: t('EMAIL'),
    EMAIL_PLACEHOLDER: t('EMAIL_PLACEHOLDER'),
    PASSWORD: t('PASSWORD'),
    PASSWORD_PLACEHOLDER: t('PASSWORD_PLACEHOLDER'),
    NAME: t('NAME'),
    NAME_PLACEHOLDER: t('NAME_PLACEHOLDER'),

    MAGIC_LINK_ACTION: t('MAGIC_LINK_ACTION'),

    EMAIL_REQUIRED: t('Validation.EMAIL_REQUIRED'),
    PASSWORD_REQUIRED: t('Validation.PASSWORD_REQUIRED'),
    IS_INVALID: t('Validation.IS_INVALID'),
    PASSWORDS_DO_NOT_MATCH: t('Validation.PASSWORDS_DO_NOT_MATCH'),
    PASSWORD_TOO_SHORT: t('Validation.PASSWORD_TOO_SHORT'),
    INVALID_EMAIL_OR_PASSWORD: t('Validation.INVALID_EMAIL_OR_PASSWORD'),
    IS_REQUIRED: t('Validation.IS_REQUIRED'),
    USER_ALREADY_EXISTS: t('Validation.USER_ALREADY_EXISTS'),
  };

  return (
    <>
      <AuthView
        pathname={pathname}
        role={user?.role}
        localization={localization}
      />
    </>
  );
}
