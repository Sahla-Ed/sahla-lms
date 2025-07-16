import { authViewPaths } from "@daveyplate/better-auth-ui/server";
import { AuthView } from "./view";
import { requireUser } from "@/app/data/user/require-user";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;
  const user = await requireUser();
  if (
    user &&
    (pathname === "sign-up" ||
      pathname === "sign-in" ||
      pathname === "login" ||
      pathname === "signup" ||
      pathname === "signin")
  ) {
    redirect("/");
  }

  return <AuthView pathname={pathname} />;
}
