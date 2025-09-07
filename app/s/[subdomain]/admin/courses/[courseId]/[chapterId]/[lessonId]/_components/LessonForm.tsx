'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/rich-text-editor/Editor';
import { Uploader } from '@/components/file-uploader/Uploader';
import { useTransition } from 'react';
import { updateLesson } from '../actions';
import { toast } from 'sonner';
import { AdminLessonType } from '@/app/s/[subdomain]/data/admin/admin-get-lesson';
import { lessonSchema, LessonSchemaType } from '@/lib/zodSchemas';
import { tryCatch } from '@/hooks/try-catch';
import { useLocale, useTranslations } from 'next-intl';

interface iAppProps {
  data: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({ chapterId, data, courseId }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const t = useTranslations('LessonForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: data.title,
      chapterId: chapterId,
      courseId: courseId,
      description: data.description ?? undefined,
      videoKey: data.videoKey ?? undefined,
      thumbnailKey: data.thumbnailKey ?? undefined,
      type: 'VIDEO',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(values, data.id),
      );

      if (error) {
        toast.error(t('notifications.genericError'));
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }

  function onInvalid() {
    toast.error(t('notifications.invalid'));
  }
  return (
    <div>
      <Link
        className={buttonVariants({ variant: 'outline', className: 'mb-6' })}
        href={`/admin/courses/${courseId}/edit`}
      >
        {isRTL ? (
          <ArrowRight className='size-4' />
        ) : (
          <ArrowLeft className='size-4' />
        )}
        <span>{t('backButton')}</span>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? 'text-right' : 'text-left'}>
            {t('cardTitle')}
          </CardTitle>
          <CardDescription className={isRTL ? 'text-right' : 'text-left'}>
            {t('cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={isRTL ? 'block w-full text-right' : ''}
                    >
                      {t('labels.lessonName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('placeholders.lessonName')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={isRTL ? 'block w-full text-right' : ''}
                    >
                      {t('labels.description')}
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='thumbnailKey'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={isRTL ? 'block w-full text-right' : ''}
                    >
                      {t('labels.thumbnail')}
                    </FormLabel>
                    <FormControl>
                      <Uploader
                        fileTypeAccepted='image'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='videoKey'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={isRTL ? 'block w-full text-right' : ''}
                    >
                      {t('labels.video')}
                    </FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted='video'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end'>
                <Button disabled={pending} type='submit'>
                  {pending ? t('buttons.saving') : t('buttons.save')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
