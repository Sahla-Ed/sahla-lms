"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import LogoLight from "@/public/logoLight.png";
import LogoDark from "@/public/logoDark.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          {mounted ? (
            <Image 
              src={currentTheme === 'dark' ? LogoDark : LogoLight} 
              alt="Logo" 
              width={90} 
              height={90}
              priority
            />
          ) : (
            <div className="w-8 h-8 bg-muted animate-pulse rounded-md" />
          )}
        </Link>
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
}