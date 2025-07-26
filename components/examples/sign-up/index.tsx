'use client';

import { AuthView } from '@/app/s/[subdomain]/auth/[pathname]/view';

export default function Dashboard() {
  return <AuthView pathname='sign-up' />;
}
