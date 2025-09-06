'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Mail, User, MessageCircle, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormField = keyof FormData;

export function ContactForm() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('ContactPage.contactForm');
  const tSuccess = useTranslations('ContactPage.successDialog');
  const tError = useTranslations('ContactPage.errorDialog');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (field: FormField, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setShowErrorDialog(true);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    setShowSuccessDialog(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-2xl font-semibold'>
              {tSuccess('title')}
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base leading-relaxed'>
              {tSuccess('description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessDialog(false)}
              className='bg-primary hover:bg-primary/90 w-full'
            >
              {tSuccess('button')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-2xl font-semibold text-red-600'>
              {tError('title')}
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base leading-relaxed'>
              {tError('description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowErrorDialog(false)}
              className='w-full bg-red-600 hover:bg-red-700'
            >
              {tError('button')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card
        className='from-card to-muted/5 border-0 bg-gradient-to-br shadow-2xl'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <CardHeader className='pb-8 text-center'>
          <CardTitle className='flex items-center justify-center gap-3 text-3xl font-bold'>
            <MessageCircle className='text-primary h-8 w-8' />
            {t('title')}
          </CardTitle>
          <p className='text-muted-foreground'>{t('description')}</p>
        </CardHeader>

        <CardContent className='space-y-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label
                htmlFor='name'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <User className='text-primary h-4 w-4' />
                {t('fullName')}
              </Label>
              <Input
                id='name'
                type='text'
                placeholder={t('fullNamePlaceholder')}
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
                {t('email')}
              </Label>
              <Input
                id='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className='border-muted-foreground/20 focus:border-primary h-12'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='message'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <MessageCircle className='text-primary h-4 w-4' />
                {t('message')}
              </Label>
              <Textarea
                id='message'
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className='border-muted-foreground/20 focus:border-primary min-h-[120px]'
                required
              />
            </div>

            <Button
              type='submit'
              size='lg'
              className='h-12 w-full text-lg font-semibold'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='me-2 h-4 w-4 animate-spin' />
                  {t('submittingButton')}
                </>
              ) : (
                t('submitButton')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
