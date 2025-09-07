'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function PrivacySettingsButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('PrivacyPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <>
      <Button size='lg' className='group' onClick={() => setOpen(true)}>
        {t('cta.settingsButton')}
        <Settings
          className={cn(
            'h-4 w-4 transition-transform group-hover:rotate-90',
            isRTL ? 'mr-2' : 'ml-2',
          )}
        />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle>{t('settingsDialog.title')}</DialogTitle>
          </DialogHeader>
          <div className='text-muted-foreground py-4 text-center'>
            <p className='mb-2 text-lg font-semibold'>
              {t('settingsDialog.comingSoon')}
            </p>
            <p>{t('settingsDialog.description')}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className='w-full'>
              {t('settingsDialog.closeButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
