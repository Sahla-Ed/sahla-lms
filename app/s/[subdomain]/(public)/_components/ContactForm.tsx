'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail, Phone, User, MessageCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '../contact/actions';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'A valid phone number is required'),
  role: z.string().min(1, 'Please select a role'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
      message: '',
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      const result = await submitContactForm(values);
      if (result.status === 'success') {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <Card className='rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800'>
        <CardHeader className='pb-8 text-center'>
          <CardTitle className='flex items-center justify-center gap-3 text-3xl font-bold'>
            <MessageCircle className='h-8 w-8 text-blue-600 dark:text-blue-400' />
            Contact Form
          </CardTitle>
          <p className='text-slate-600 dark:text-slate-400'>
            Tell us about yourself and how we can help you
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <User className='h-4 w-4 text-blue-600 dark:text-blue-400' />{' '}
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your full name' {...field} />
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
                    <FormLabel className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-blue-600 dark:text-blue-400' />{' '}
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter your email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-blue-600 dark:text-blue-400' />{' '}
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='tel'
                        placeholder='Enter your phone number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <MessageCircle className='h-4 w-4 text-blue-600 dark:text-blue-400' />{' '}
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='How can we help you?'
                        className='min-h-[100px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>I am interested in joining as:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col space-y-2'
                      >
                        <FormItem className='flex items-center space-y-0 space-x-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50'>
                          <FormControl>
                            <RadioGroupItem value='student' />
                          </FormControl>
                          <FormLabel className='font-normal'>Student</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-y-0 space-x-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50'>
                          <FormControl>
                            <RadioGroupItem value='instructor' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Instructor
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                size='lg'
                className='h-12 w-full transform bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-600/40'
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
