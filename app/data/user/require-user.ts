import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireUser = cache(async (shouldRedirect = true) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (shouldRedirect) {
      return redirect("/auth/login");
    }
    return null;
  }

  return session.user;
});
