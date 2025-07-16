"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LogoLight from "@/public/logoLight.png";
import LogoDark from "@/public/logoDark.png";
import { ThemeToggle } from "@/components/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount state for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Dynamic navigation items based on session
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    session 
      ? { name: "Dashboard", href: "/dashboard" }
      : { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          {mounted ? (
            <Image 
              src={currentTheme === 'dark' ? LogoDark : LogoLight} 
              alt="Logo" 
              className="size-20"
              priority
            />
          ) : (
            <div className="size-20 bg-muted animate-pulse rounded-md" />
          )}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-8 mx-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-primary relative pb-2 ${
                  pathname === item.href 
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full' 
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isPending ? (
              <LoadingSpinner />
            ) : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Login
                </Link>
                <Link href="/about" className={buttonVariants()}>
                  Discover More
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4 ml-auto">
          <ThemeToggle />
          
          {isPending ? (
            <LoadingSpinner />
          ) : session ? (
            <UserDropdown
              email={session.user.email}
              image={
                session?.user.image ??
                `https://avatar.vercel.sh/${session?.user.email}`
              }
              name={
                session?.user.name && session.user.name.length > 0
                  ? session.user.name
                  : session?.user.email.split("@")[0]
              }
            />
          ) : null}
          
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-md ${
                  pathname === item.href 
                    ? 'text-primary bg-accent' 
                    : 'text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile auth buttons */}
            {!isPending && !session && (
              <div className="pt-4 pb-3 border-t border-border">
                <div className="flex flex-col space-y-2 px-3">
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/about" 
                    className={buttonVariants({ className: "w-full justify-start" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}