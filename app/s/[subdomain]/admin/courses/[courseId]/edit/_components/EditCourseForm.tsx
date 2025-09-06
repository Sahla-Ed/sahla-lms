'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  courseCategories,
  courseLevels,
  getCourseSchema,
  CourseSchemaType,
  courseStatus,
  ZodValidationKeys,
} from '@/lib/zodSchemas';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  PlusIcon,
  SparkleIcon,
} from 'lucide-react';
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
import slugify from 'slugify';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/rich-text-editor/Editor';
import { Uploader } from '@/components/file-uploader/Uploader';
import { useTransition } from 'react';
import { tryCatch } from '@/hooks/try-catch';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { editCourse } from '../actions';
import { AdminCourseSingularType } from '@/app/s/[subdomain]/data/admin/admin-get-course';
import { useLocale, useTranslations } from 'next-intl';
interface iAppProps {
  data: AdminCourseSingularType;
}

export function EditCourseForm({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const t = useTranslations('EditCourseForm');
  const tCreate = useTranslations('CreateCoursePage');
  const tEnums = useTranslations('CourseEnums');

  const tValidation = useTranslations('ZodValidation');

  const locale = useLocale();
  const isRTL = locale === 'ar';

  const courseSchema = getCourseSchema((key) =>
    tValidation(key as ZodValidationKeys),
  );
  // 1. Define your form.
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      fileKey: data.fileKey || '',
      price: data.price,
      duration: data.duration,
      level: data.level,
      category: data.category as CourseSchemaType['category'],
      status: data.status,
      slug: data.slug,
      smallDescription: data.smallDescription,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, data.id),
      );

      if (error) {
        toast.error(t('notifications.error'));
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        form.reset();
        router.push('/admin/courses');
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <Link
          href='/admin/courses'
          className={buttonVariants({
            variant: 'outline',
            size: 'icon',
          })}
        >
          {isRTL ? (
            <ArrowRight className='size-4' />
          ) : (
            <ArrowLeft className='size-4' />
          )}
        </Link>
        <h1 className='text-2xl font-bold'>{t('header')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>{t('cardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tCreate('form.title')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tCreate('form.titlePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex items-end gap-4'>
                <FormField
                  control={form.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{tCreate('form.slug')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tCreate('form.slugPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='button'
                  className='w-fit'
                  onClick={() => {
                    const titleValue = form.getValues('title');
                    const slug = slugify(titleValue, {
                      lower: true,
                      strict: true,
                    });
                    form.setValue('slug', slug, { shouldValidate: true });
                  }}
                >
                  {tCreate('form.generateSlug')}{' '}
                  <SparkleIcon className='ml-1' size={16} />
                </Button>
              </div>

              <FormField
                control={form.control}
                name='smallDescription'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{tCreate('form.smallDescription')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={tCreate(
                          'form.smallDescriptionPlaceholder',
                        )}
                        className='min-h-[120px]'
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
                  <FormItem className='w-full'>
                    <FormLabel>{tCreate('form.description')}</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fileKey'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{tCreate('form.thumbnail')}</FormLabel>
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

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{tCreate('form.category')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue
                              placeholder={tCreate('form.selectCategory')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir={isRTL ? 'rtl' : 'ltr'}>
                          {courseCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {tEnums(`categories.${category}`)}
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
                  name='level'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{tCreate('form.level')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue
                              placeholder={tCreate('form.selectLevel')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir={isRTL ? 'rtl' : 'ltr'}>
                          {courseLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {tEnums(`levels.${level}`)}
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
                  name='duration'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{tCreate('form.duration')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tCreate('form.durationPlaceholder')}
                          type='number'
                          {...field}
                          value={field.value === 0 ? '' : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ''
                                ? 0
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{tCreate('form.price')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tCreate('form.pricePlaceholder')}
                          type='number'
                          {...field}
                          value={field.value === 0 ? '' : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ''
                                ? 0
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{tCreate('form.status')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder={tCreate('form.selectStatus')}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent dir={isRTL ? 'rtl' : 'ltr'}>
                        {courseStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {tEnums(`statuses.${status}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={pending}>
                {pending ? (
                  <>
                    {t('updatingButton')}
                    <Loader2 className='ml-1 animate-spin' />
                  </>
                ) : (
                  <>
                    {t('updateButton')} <PlusIcon className='ml-1' size={16} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
