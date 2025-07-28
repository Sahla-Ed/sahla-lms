'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Mail, Phone, User, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

type FormField = keyof FormData;

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (field: FormField, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role
    ) {
      setShowErrorDialog(true);
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowSuccessDialog(true);
    setIsSubmitting(false);

    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
    });
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-2xl font-semibold'>
              🎉 Thank You!
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base leading-relaxed'>
              Thank you for contacting us! We&apos;ve received your message and
              will get back to you within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessDialog(false)}
              className='bg-primary hover:bg-primary/90 w-full'
            >
              Great!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-2xl font-semibold text-red-600'>
              ⚠️ Error
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base leading-relaxed'>
              Please fill in all fields before submitting the form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowErrorDialog(false)}
              className='w-full bg-red-600 hover:bg-red-700'
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

        <CardContent className='space-y-6'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label
                htmlFor='name'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <User className='text-primary h-4 w-4' />
                Full Name
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter your full name'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className='border-muted-foreground/20 focus:border-primary h-12'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <Mail className='text-primary h-4 w-4' />
                Email Address
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email address'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className='border-muted-foreground/20 focus:border-primary h-12'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='phone'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <Phone className='text-primary h-4 w-4' />
                Phone Number
              </Label>
              <Input
                id='phone'
                type='tel'
                placeholder='Enter your phone number'
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className='border-muted-foreground/20 focus:border-primary h-12'
                required
              />
            </div>

            <div className='space-y-4'>
              <Label className='text-sm font-medium'>
                I am interested in joining as:
              </Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange('role', value)}
                className='grid grid-cols-1 gap-4'
              >
                <div className='hover:bg-muted/50 flex items-center space-x-3 rounded-lg border p-4 transition-colors'>
                  <RadioGroupItem value='student' id='student' />
                  <Label htmlFor='student' className='flex-1 cursor-pointer'>
                    <div className='font-medium'>Student</div>
                    <div className='text-muted-foreground text-sm'>
                      I want to learn new skills and advance my career
                    </div>
                  </Label>
                </div>

                <div className='hover:bg-muted/50 flex items-center space-x-3 rounded-lg border p-4 transition-colors'>
                  <RadioGroupItem value='instructor' id='instructor' />
                  <Label htmlFor='instructor' className='flex-1 cursor-pointer'>
                    <div className='font-medium'>Instructor</div>
                    <div className='text-muted-foreground text-sm'>
                      I want to share my expertise and teach others
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleSubmit}
              size='lg'
              className='h-12 w-full text-lg font-semibold'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
