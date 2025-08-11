// import { authViewPaths } from '@daveyplate/better-auth-ui/server';
import { AuthView } from './view';
import { requireUser } from '@/app/s/[subdomain]/data/user/require-user';
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

  return (
    <>
      <AuthView pathname={pathname} role={user?.role} />
    </>
  );
}
