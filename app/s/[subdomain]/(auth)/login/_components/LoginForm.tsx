'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

import { GithubIcon, Loader, Loader2, Send, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState('');

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Singed in with Github, you will be redirected...');
          },
          onError: () => {
            toast.error('Internal Server Error');
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email sent');
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error('Erorr sending email');
          },
        },
      });
    });
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='space-y-2 text-center'>
        <h2 className='text-foreground text-3xl font-bold tracking-tight'>
          Welcome Back
        </h2>
        <p className='text-muted-foreground'>
          Sign in to your account to continue learning
        </p>
      </div>

      {/* Login Form */}
      <div className='space-y-6'>
        {/* GitHub Login */}
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className='group relative h-12 w-full overflow-hidden border-0 bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-600 hover:shadow-xl'
        >
          <div className='absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full'></div>
          {githubPending ? (
            <>
              <Loader className='mr-2 size-5 animate-spin' />
              <span className='font-medium'>Connecting...</span>
            </>
          ) : (
            <>
              <GithubIcon className='mr-2 size-5' />
              <span className='font-medium'>Continue with GitHub</span>
            </>
          )}
        </Button>

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='border-border w-full border-t'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-card text-muted-foreground px-4 font-medium'>
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='text-foreground text-sm font-medium'
            >
              Email Address
            </Label>
            <div className='relative'>
              <Mail className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform' />
              <Input
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Enter your email address'
                className='bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 h-12 pl-10 transition-all duration-200 focus:ring-1'
                required
              />
            </div>
          </div>

          <Button
            onClick={signInWithEmail}
            disabled={emailPending}
            className='from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground group relative h-12 w-full overflow-hidden bg-gradient-to-r font-medium shadow-lg transition-all duration-300 hover:shadow-xl'
          >
            <div className='absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full'></div>
            {emailPending ? (
              <>
                <Loader2 className='mr-2 size-5 animate-spin' />
                <span>Sending verification...</span>
              </>
            ) : (
              <>
                <Send className='mr-2 size-5' />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>

        {/* Security Note */}
        <div className='text-center'>
          <p className='text-muted-foreground text-xs'>
            <Lock className='mr-1 inline size-3' />
            Your information is protected with industry-standard security
          </p>
        </div>
      </div>
    </div>
  );
}
