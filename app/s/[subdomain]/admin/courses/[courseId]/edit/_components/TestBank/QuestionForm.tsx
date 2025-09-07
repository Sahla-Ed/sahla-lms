'use client';

import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionSchema, QuestionSchemaType } from '@/lib/zodSchemas';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, Loader2, X } from 'lucide-react';
import { ApiResponse } from '@/lib/types';
import { useLocale, useTranslations } from 'next-intl';

interface QuestionFormProps {
  courseId: string;
  initialData?: Partial<QuestionSchemaType>;
  onSave: (data: QuestionSchemaType) => Promise<ApiResponse>;
  onSuccess: () => void;
  mode: 'create' | 'edit';
}

export const QuestionForm: FC<QuestionFormProps> = ({
  courseId,
  initialData,
  onSave,
  onSuccess,
  mode,
}) => {
  const [pending, startTransition] = useTransition();
  const t = useTranslations('QuestionForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const form = useForm<QuestionSchemaType>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || {
      courseId,
      text: '',
      type: 'MCQ',
      options: ['', ''],
      answer: '',
      explanation: '',
    },
  });

  const onSubmit = (data: QuestionSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(onSave(data));
      if (error) {
        toast.error(
          mode === 'create'
            ? t('notifications.createError')
            : t('notifications.updateError'),
        );
      } else if (result?.status === 'success') {
        toast.success(
          result.message ||
            (mode === 'create'
              ? t('notifications.createSuccess')
              : t('notifications.updateSuccess')),
        );
        if (mode === 'create') form.reset();
        onSuccess();
      } else {
        toast.error(
          result?.message ||
            (mode === 'create'
              ? t('notifications.createError')
              : t('notifications.updateError')),
        );
      }
    });
  };

  const addOption = () =>
    form.setValue('options', [...(form.getValues('options') || []), '']);
  const removeOption = (index: number) => {
    const currentOptions = form.getValues('options') || [];
    const newOptions = currentOptions.filter((_, i) => i !== index);
    form.setValue('options', newOptions);
    if (form.getValues('answer') === currentOptions[index])
      form.setValue('answer', '');
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isRTL ? 'block w-full text-right' : ''}>
                  {t('labels.text')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('placeholders.text')}
                    {...field}
                    className={isRTL ? 'text-right' : ''}
                    style={isRTL ? { direction: 'rtl' } : {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isRTL ? 'block w-full text-right' : ''}>
                  {t('labels.type')}
                </FormLabel>
                <Select
                  onValueChange={(value: 'MCQ' | 'TRUE_FALSE') => {
                    field.onChange(value);
                    if (value === 'TRUE_FALSE') {
                      form.setValue('options', [
                        t('types.true'),
                        t('types.false'),
                      ]);
                    } else {
                      form.setValue('options', ['', '']);
                    }
                    form.setValue('answer', '');
                  }}
                  defaultValue={field.value}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('placeholders.type')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='MCQ'>{t('types.mcq')}</SelectItem>
                    <SelectItem value='TRUE_FALSE'>
                      {t('types.trueFalse')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {form.watch('type') === 'MCQ' && (
            <div>
              <div
                className={`mb-2 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Label>{t('labels.options')}</Label>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addOption}
                >
                  <Plus className={isRTL ? 'ml-1' : 'mr-1'} />{' '}
                  {t('buttons.addOption')}
                </Button>
              </div>
              <div className='space-y-2'>
                {(form.watch('options') || []).map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <FormField
                      control={form.control}
                      name={`options.${index}`}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            placeholder={t('placeholders.option', {
                              index: index + 1,
                            })}
                            {...field}
                            className={isRTL ? 'text-right' : ''}
                            style={isRTL ? { direction: 'rtl' } : {}}
                          />
                        </FormControl>
                      )}
                    />
                    {(form.watch('options') || []).length > 2 && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => removeOption(index)}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isRTL ? 'block w-full text-right' : ''}>
                  {t('labels.answer')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('placeholders.answer')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(form.watch('options') || [])
                      .filter((opt) => opt && opt.trim() !== '')
                      .map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='explanation'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isRTL ? 'block w-full text-right' : ''}>
                  {t('labels.explanation')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('placeholders.explanation')}
                    {...field}
                    className={isRTL ? 'text-right' : ''}
                    style={isRTL ? { direction: 'rtl' } : {}}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
            <Button type='submit' disabled={pending}>
              {pending && (
                <Loader2
                  className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`}
                />
              )}
              {pending
                ? t('buttons.saving')
                : mode === 'create'
                  ? t('buttons.save')
                  : t('buttons.update')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
