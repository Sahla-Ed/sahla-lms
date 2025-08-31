'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Rocket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { checkSlugAvailability, createTenantAndAdmin } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';
import slugify from 'slugify';

// Schema for the entire multi-step form
const formSchema = z.object({
  platformName: z
    .string()
    .min(3, 'platform name must be at least 3 characters long'),
  slug: z
    .string()
    .min(3, 'URL must be at least 3 characters long')
    .regex(
      /^[a-z0-9-]+$/,
      'URL can only contain lowercase letters, numbers, and hyphens',
    ),
  name: z.string().min(2, 'Your name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormValues = z.infer<typeof formSchema>;

export default function StartplatformPage() {
  const [step, setStep] = useState(1);
  const [isChecking, startChecking] = useTransition();
  const [isCreating, startCreating] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platformName: '',
      slug: '',
      name: '',
      email: '',
      password: '',
    },
  });

  const handleNextStep = async () => {
    const slug = form.getValues('slug');
    const isValid = await form.trigger(['platformName', 'slug']);

    if (!isValid) return;

    startChecking(async () => {
      const result = await checkSlugAvailability(slug);
      if (result.available) {
        setStep(2);
      } else {
        form.setError('slug', { type: 'manual', message: result.message });
      }
    });
  };

  const onSubmit = (values: FormValues) => {
    startCreating(async () => {
      const result = await createTenantAndAdmin(values);
      if (result.status === 'success' && result.slug) {
        toast.success(result.message);
        const url = `${protocol}://${result.slug}.${rootDomain}/auth/sign-in`;
        router.push(url);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className='bg-muted/20 flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-lg'>
        <CardHeader className='text-center'>
          <div className='bg-primary/10 mx-auto mb-4 w-fit rounded-full p-4'>
            <Rocket className='text-primary size-8' />
          </div>
          <CardTitle className='text-3xl'>
            Let&apos;s build your platform
          </CardTitle>
          <CardDescription>
            {step === 1
              ? 'First, let&apos;s get your platform&apos;s details.'
              : 'Great! Now create your admin account.'}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='space-y-6'>
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name='platformName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>platform Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g., The Design Academy'
                            className='h-11'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              const slug = slugify(e.target.value, {
                                lower: true,
                                strict: true,
                              });
                              form.setValue('slug', slug, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        </FormControl>
                        <p className='text-muted-foreground text-xs'>
                          This is the name your students will see.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='slug'
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor='platformUrl'>platform URL</Label>
                        <div className='flex items-center'>
                          <FormControl>
                            <Input
                              placeholder='design-academy'
                              className='h-11 rounded-r-none focus-visible:ring-0'
                              {...field}
                            />
                          </FormControl>
                          <span className='border-input bg-muted text-muted-foreground inline-flex h-11 items-center rounded-r-md border border-l-0 px-3 text-sm'>
                            .{rootDomain.split(':')[0]}
                          </span>
                        </div>
                        <p className='text-muted-foreground pt-1 pb-2 text-xs'>
                          This will be the unique web address for your platform.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g., Jane Doe'
                            className='h-11'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='e.g., jane@example.com'
                            className='h-11'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='••••••••'
                            className='h-11'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </CardContent>
            <CardFooter className='flex-col gap-4'>
              {step === 1 ? (
                <Button
                  type='button'
                  onClick={handleNextStep}
                  size='lg'
                  className='w-full'
                  disabled={isChecking}
                >
                  {isChecking ? (
                    <Loader2 className='mr-2 size-4 animate-spin' />
                  ) : null}
                  Continue
                </Button>
              ) : (
                <Button
                  type='submit'
                  size='lg'
                  className='mt-6 w-full'
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <Loader2 className='mr-2 size-4 animate-spin' />
                  ) : null}
                  Create My platform
                </Button>
              )}

              {step === 2 && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setStep(1)}
                  className='w-full'
                  disabled={isCreating}
                >
                  <ArrowLeft className='mr-2 size-4' />
                  Back
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
