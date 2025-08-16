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
import { useTranslations } from 'next-intl';

const getFormSchema = (t: (key: string) => string) =>
  z.object({
    platformName: z.string().min(3, t('validation.platformNameMin')),
    slug: z
      .string()
      .min(3, t('validation.slugMin'))
      .regex(/^[a-z0-9-]+$/, t('validation.slugRegex')),
    name: z.string().min(2, t('validation.nameMin')),
    email: z.string().email(t('validation.emailInvalid')),
    password: z.string().min(8, t('validation.passwordMin')),
  });

type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

export default function StartplatformPage() {
  const t = useTranslations('SahlaPlatform.StartPage');

  const formSchema = getFormSchema(t);

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
        const messageKey = result.message?.includes('taken')
          ? 'slugTaken'
          : 'creationError';
        form.setError('slug', {
          type: 'manual',
          message: t(`serverMessages.${messageKey}`),
        });
      }
    });
  };

  const onSubmit = (values: FormValues) => {
    startCreating(async () => {
      const result = await createTenantAndAdmin(values);
      if (result.status === 'success' && result.slug) {
        toast.success(t('serverMessages.creationSuccess'));
        const url = `${protocol}://${result.slug}.${rootDomain}/auth/sign-in`;
        router.push(url);
      } else {
        // Handle specific server-side errors
        const messageKey = result.message.includes('email already exists')
          ? 'emailExists'
          : result.message.includes('URL is already taken')
            ? 'slugTaken'
            : 'creationError';
        toast.error(t(`serverMessages.${messageKey}`));
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
          <CardTitle className='text-3xl'>{t('title')}</CardTitle>
          <CardDescription>
            {step === 1 ? t('step1.description') : t('step2.description')}
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
                        <FormLabel>{t('step1.platformName')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('step1.platformNamePlaceholder')}
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
                          {t('step1.platformNameHint')}
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
                        <Label htmlFor='platformUrl'>
                          {t('step1.platformUrl')}
                        </Label>
                        <div className='flex items-center'>
                          <FormControl>
                            <Input
                              placeholder={t('step1.platformUrlPlaceholder')}
                              className='h-11 rounded-r-none focus-visible:ring-0'
                              {...field}
                            />
                          </FormControl>
                          <span className='border-input bg-muted text-muted-foreground inline-flex h-11 items-center rounded-r-md border border-l-0 px-3 text-sm'>
                            .{rootDomain.split(':')[0]}
                          </span>
                        </div>
                        <p className='text-muted-foreground pt-1 pb-2 text-xs'>
                          {t('step1.platformUrlHint')}
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
                        <FormLabel>{t('step2.yourName')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('step2.yourNamePlaceholder')}
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
                        <FormLabel>{t('step2.email')}</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder={t('step2.emailPlaceholder')}
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
                        <FormLabel>{t('step2.password')}</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder={t('step2.passwordPlaceholder')}
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
                  {t('step1.continueButton')}
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
                  {t('step2.createButton')}
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
                  {t('step2.backButton')}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
