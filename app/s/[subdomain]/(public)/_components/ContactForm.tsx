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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
      <Card className='from-card to-muted/5 border-0 bg-gradient-to-br shadow-2xl'>
        <CardHeader className='pb-8 text-center'>
          <CardTitle className='flex items-center justify-center gap-3 text-3xl font-bold'>
            <MessageCircle className='text-primary h-8 w-8' />
            Contact Form
          </CardTitle>
          <p className='text-muted-foreground'>
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
                    <FormLabel className='flex items-center gap-2'><User className='text-primary h-4 w-4' /> Full Name</FormLabel>
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
                    <FormLabel className='flex items-center gap-2'><Mail className='text-primary h-4 w-4' /> Email Address</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='Enter your email address' {...field} />
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
                    <FormLabel className='flex items-center gap-2'><Phone className='text-primary h-4 w-4' /> Phone Number</FormLabel>
                    <FormControl>
                      <Input type='tel' placeholder='Enter your phone number' {...field} />
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
                    <FormLabel className='flex items-center gap-2'><MessageCircle className='text-primary h-4 w-4' /> Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder='How can we help you?' className='min-h-[100px]' {...field} />
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
                        <FormItem className='flex items-center space-x-3 space-y-0 rounded-lg border p-4'>
                          <FormControl><RadioGroupItem value='student' /></FormControl>
                          <FormLabel className='font-normal'>Student</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0 rounded-lg border p-4'>
                          <FormControl><RadioGroupItem value='instructor' /></FormControl>
                          <FormLabel className='font-normal'>Instructor</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' size='lg' className='h-12 w-full text-lg font-semibold' disabled={isPending}>
                {isPending ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Sending...</>) : 'Send Message'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
