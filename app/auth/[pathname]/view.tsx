"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className="container flex grow flex-col items-center justify-center gap-3 p-4 md:p-6 h-screen mx-auto">
      <AuthCard pathname={pathname} />
    </main>
  );
}
