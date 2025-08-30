'use client';

import { FC, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionForm } from './QuestionForm';
import { SubComponentProps } from './types';
import { createQuestion } from '../../quiz-actions';
import { AiQuestionForm } from './AiQuestionForm';
import { ImportQuestionForm } from './ImportQuestionForm';
import { useLocale, useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CreateQuestionViewProps extends SubComponentProps {
  planName: 'FREE' | 'PRO';
}

export const CreateQuestionView: FC<CreateQuestionViewProps> = ({
  courseId,
  onSuccess,
  planName,
}) => {
  const canUseAi = planName === 'PRO';
  const t = useTranslations('CreateQuestionView');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const handleAiTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canUseAi) {
      e.preventDefault();
      setShowUpgradeDialog(true);
    }
  };

  const handleUpgradeClick = () => {
    router.push('/admin/settings/billing');
    setShowUpgradeDialog(false);
  };
  return (
    <>
      <Tabs defaultValue='manual'>
        <TabsList
          className={`w-full ${isRTL ? 'flex flex-row-reverse' : 'grid grid-cols-3'}`}
          style={isRTL ? { gap: '0.25rem' } : {}}
        >
          <TabsTrigger value='manual' className={isRTL ? 'flex-1' : ''}>
            {t('tabs.manual')}
          </TabsTrigger>
          <TabsTrigger
            value='ai'
            // disabled={!canUseAi}
            title={!canUseAi ? t('aiDisabledTooltip') : ''}
            onClick={handleAiTabClick}
            className={cn(
              isRTL ? 'flex-1' : '',
              !canUseAi && 'cursor-pointer opacity-70' 
            )}
          >
            {t('tabs.ai')}
          </TabsTrigger>
          <TabsTrigger value='import' className={isRTL ? 'flex-1' : ''}>
            {t('tabs.import')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='manual' className='pt-6'>
          <QuestionForm
           courseId={courseId}
           onSave={createQuestion}
           onSuccess={onSuccess}
           mode="create"
          />
        </TabsContent>

        <TabsContent value='ai' className='pt-6'>
          {canUseAi ? (
            <AiQuestionForm courseId={courseId} onSuccess={onSuccess} />
          ) : (
            <div className='rounded-lg border p-8 text-center'>
            <h3 className='font-bold'>{t('upgradeNotice.title')}</h3>
            <p className='text-muted-foreground text-sm'>
              {t('upgradeNotice.description')}
            </p>
          </div>
          )}
        </TabsContent>

        <TabsContent value='import' className='pt-6'>
          <ImportQuestionForm courseId={courseId} onSuccess={onSuccess} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={isRTL ? 'text-right' : 'text-left'}>
              {t('upgradeDialog.title')}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={isRTL ? 'text-right' : 'text-left'}
            >
              {t('upgradeDialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isRTL ? 'flex-row-reverse' : ''}>
            <AlertDialogCancel>
              {t('upgradeDialog.cancelButton')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleUpgradeClick}>
              {t('upgradeDialog.upgradeButton')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
