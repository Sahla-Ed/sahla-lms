// import { authViewPaths } from '@daveyplate/better-auth-ui/server';
import { AuthView } from './view';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
import { redirect } from 'next/navigation';

// export function generateStaticParams() {
//   return Object.values(authViewPaths).map((pathname) => ({ pathname }));
// }

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;
  const user = await requireUser(false);
  if (
    user &&
    ['sign-up', 'sign-in', 'login', 'signup', 'signin'].includes(pathname)
  ) {
    redirect('/');
  }

  return (
    <>
      <AuthView pathname={pathname} />
    </>
  );
}
