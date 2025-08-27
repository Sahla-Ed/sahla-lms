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
import { ArrowLeft, ArrowRight, Loader2, PlusIcon, SparkleIcon } from 'lucide-react';
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
import { CreateCourse } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useConfetti } from '@/hooks/use-confetti';
import { useLocale, useTranslations } from 'next-intl';

export default function CourseCreationForm() {
    const t = useTranslations('CreateCoursePage');
    const tValidation = useTranslations('ZodValidation'); 
    const tEnums = useTranslations('CourseEnums');
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const { triggerConfetti } = useConfetti();
    const locale = useLocale();
    const isRTL = locale === 'ar';
  
    const courseSchema = getCourseSchema((key) => tValidation(key as ZodValidationKeys));
    // 1. Define your form.
    const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema),
      defaultValues: {
        title: '',
        description: '',
        fileKey: '',
        price: 0,
        duration: 0,
        level: 'Beginner',
        category: 'Health & Fitness',
        status: 'Draft',
        slug: '',
        smallDescription: '',
      },
    });
  
    // 2. Define a submit handler.
    function onSubmit(values: CourseSchemaType) {
      startTransition(async () => {
        const { data: result, error } = await tryCatch(CreateCourse(values));
  
        if (error) {
          toast.error(t('notifications.error'));
          return;
        }
  
        if (result.status === 'success') {
          toast.success(t('notifications.success'));
          triggerConfetti();
          form.reset();
          router.push('/admin/courses');
        } else if (result.status === 'error') {
          toast.error(
            result.message.includes('slug')
              ? t('notifications.slugTaken')
              : result.message,
          );
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
                      <FormLabel>{t('form.title')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.titlePlaceholder')}
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
                        <FormLabel>{t('form.slug')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('form.slugPlaceholder')}
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
                    {t('form.generateSlug')}{' '}
                    <SparkleIcon className='ml-1' size={16} />
                  </Button>
                </div>
  
                <FormField
                  control={form.control}
                  name='smallDescription'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{t('form.smallDescription')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('form.smallDescriptionPlaceholder')}
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
                      <FormLabel>{t('form.description')}</FormLabel>
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
                      <FormLabel>{t('form.thumbnail')}</FormLabel>
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
                        <FormLabel>{t('form.category')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <FormControl>
                            <SelectTrigger
                              className='w-full'
                              style={{
                                textAlign: isRTL ? 'right' : 'left',
                                direction: isRTL ? 'rtl' : 'ltr',
                              }}
                            >
                              <SelectValue
                                placeholder={t('form.selectCategory')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            dir={isRTL ? 'rtl' : 'ltr'}
                            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                          >
                            {courseCategories.map((categoryKey) => (
                              <SelectItem
                                key={categoryKey}
                                value={categoryKey}
                                style={{
                                  textAlign: isRTL ? 'right' : 'left',
                                  direction: isRTL ? 'rtl' : 'ltr',
                                }}
                              >
                                {tEnums(`categories.${categoryKey}`)}
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
                        <FormLabel>{t('form.level')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <FormControl>
                            <SelectTrigger
                              className='w-full'
                              style={{
                                textAlign: isRTL ? 'right' : 'left',
                                direction: isRTL ? 'rtl' : 'ltr',
                              }}
                            >
                              <SelectValue placeholder={t('form.selectLevel')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            dir={isRTL ? 'rtl' : 'ltr'}
                            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                          >
                            {courseLevels.map((levelKey) => (
                              <SelectItem
                                key={levelKey}
                                value={levelKey}
                                style={{
                                  textAlign: isRTL ? 'right' : 'left',
                                  direction: isRTL ? 'rtl' : 'ltr',
                                }}
                              >
                                {tEnums(`levels.${levelKey}`)}
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
                        <FormLabel>{t('form.duration')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('form.durationPlaceholder')}
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
                        <FormLabel>{t('form.price')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('form.pricePlaceholder')}
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
                      <FormLabel>{t('form.status')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        <FormControl>
                          <SelectTrigger
                            className='w-full'
                            style={{
                              textAlign: isRTL ? 'right' : 'left',
                              direction: isRTL ? 'rtl' : 'ltr',
                            }}
                          >
                            <SelectValue placeholder={t('form.selectStatus')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          dir={isRTL ? 'rtl' : 'ltr'}
                          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                        >
                          {courseStatus.map((statusKey) => (
                            <SelectItem
                              key={statusKey}
                              value={statusKey}
                              style={{
                                textAlign: isRTL ? 'right' : 'left',
                                direction: isRTL ? 'rtl' : 'ltr',
                              }}
                            >
                              {tEnums(`statuses.${statusKey}`)}
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
                      {t('form.creatingButton')}
                      <Loader2 className='ml-1 animate-spin' />
                    </>
                  ) : (
                    <>
                      {t('form.createButton')}{' '}
                      <PlusIcon className='ml-1' size={16} />
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
  