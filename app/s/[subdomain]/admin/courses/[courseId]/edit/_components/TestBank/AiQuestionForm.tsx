'use client';
import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Question, SubComponentProps } from './types';
import { createQuestion } from '../../quiz-actions';
import { useLocale, useTranslations } from 'next-intl';

export const AiQuestionForm: FC<SubComponentProps> = ({
  courseId,
  onSuccess,
}) => {
  const t = useTranslations('AiQuestionForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(5);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, numQuestions: aiCount }),
      });
      if (!res.ok)
        throw new Error(
          (await res.json()).error || t('notifications.generationFailed'),
        );

      const { questions: generatedQuestions } = await res.json();
      if (!generatedQuestions || generatedQuestions.length === 0) {
        toast.warning(t('notifications.noQuestionsGenerated'));
        return;
      }
      await Promise.all(
        generatedQuestions.map((q: Omit<Question, 'id' | 'courseId'>) =>
          createQuestion({ ...q, courseId }),
        ),
      );
      toast.success(
        t('notifications.success', { count: generatedQuestions.length }),
      );
      onSuccess();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='space-y-4' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='space-y-2'>
        <Label htmlFor='ai-topic' className={isRTL ? 'text-right' : ''}>
          {t('labels.topic')}
        </Label>
        <Input
          id='ai-topic'
          placeholder={t('placeholders.topic')}
          value={aiTopic}
          onChange={(e) => setAiTopic(e.target.value)}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='ai-count' className={isRTL ? 'text-right' : ''}>
          {t('labels.questionCount')}
        </Label>
        <Select
          value={String(aiCount)}
          onValueChange={(v) => setAiCount(Number(v))}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='3'>3</SelectItem>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !aiTopic}
        className='w-full'
      >
        {isGenerating ? (
          <>
            <Loader2 className={isRTL ? 'ml-2' : 'mr-2'} />
            {t('buttons.generating')}
          </>
        ) : (
          t('buttons.generate')
        )}
      </Button>
    </div>
  );
};
