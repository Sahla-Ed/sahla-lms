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
import { Mail, Phone, User, MessageCircle, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

type FormField = keyof FormData;

export function ContactForm() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('SahlaPlatform.ContactPage.contactForm');
  const tSuccess = useTranslations('SahlaPlatform.ContactPage.successDialog');
  const tError = useTranslations('SahlaPlatform.ContactPage.errorDialog');

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
    setFormData({ name: '', email: '', phone: '', role: '' });
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

      <Card className='from-card to-muted/5 border-0 bg-gradient-to-br shadow-2xl'>
        <CardHeader className='pb-8 text-center'>
          <CardTitle className='flex items-center justify-center gap-3 text-3xl font-bold'>
            <MessageCircle className='text-primary h-8 w-8' />
            {t('title')}
          </CardTitle>
          <p className='text-muted-foreground'>{t('description')}</p>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='space-y-6'>
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
                htmlFor='phone'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <Phone className='text-primary h-4 w-4' />
                {t('phone')}
              </Label>
              <Input
                id='phone'
                type='text'
                inputMode='tel'
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                placeholder={t('phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className='border-muted-foreground/20 focus:border-primary h-12'
                required
              />
            </div>

            <div className='space-y-4'>
              <Label className='text-sm font-medium'>{t('roleQuestion')}</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange('role', value)}
                className='grid grid-cols-1 gap-4'
              >
                <div
                  className={`hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <RadioGroupItem value='student' id='student' />
                  <Label
                    htmlFor='student'
                    className={`flex-1 cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    <div className='font-medium'>{t('roleStudent.title')}</div>
                    <div className='text-muted-foreground text-sm'>
                      {t('roleStudent.description')}
                    </div>
                  </Label>
                </div>

                <div
                  className={`hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <RadioGroupItem value='instructor' id='instructor' />
                  <Label
                    htmlFor='instructor'
                    className={`flex-1 cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    <div className='font-medium'>
                      {t('roleInstructor.title')}
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      {t('roleInstructor.description')}
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
                  <Loader2 className='me-2 h-4 w-4 animate-spin' />
                  {t('submittingButton')}
                </>
              ) : (
                t('submitButton')
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
