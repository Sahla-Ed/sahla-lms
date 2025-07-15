"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

import { GithubIcon, Loader, Loader2, Send, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Singed in with Github, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Erorr sending email");
          },
        },
      });
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your account to continue learning
        </p>
      </div>

      {/* Login Form */}
      <div className="space-y-6">
        {/* GitHub Login */}
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full h-12 relative group overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          {githubPending ? (
            <>
              <Loader className="size-5 animate-spin mr-2" />
              <span className="font-medium">Connecting...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-5 mr-2" />
              <span className="font-medium">Continue with GitHub</span>
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground font-medium">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email address"
                className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          <Button 
            onClick={signInWithEmail} 
            disabled={emailPending}
            className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {emailPending ? (
              <>
                <Loader2 className="size-5 animate-spin mr-2" />
                <span>Sending verification...</span>
              </>
            ) : (
              <>
                <Send className="size-5 mr-2" />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            <Lock className="inline size-3 mr-1" />
            Your information is protected with industry-standard security
          </p>
        </div>
      </div>
    </div>
  );
}
