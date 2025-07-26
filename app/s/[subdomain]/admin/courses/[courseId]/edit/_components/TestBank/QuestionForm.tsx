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

interface QuestionFormProps {
  courseId: string;
  initialData?: Partial<QuestionSchemaType>;
  onSave: (data: QuestionSchemaType) => Promise<ApiResponse>;
  onSuccess: () => void;
  buttonText: string;
  toastSuccessMessage: string;
  toastErrorMessage: string;
}

export const QuestionForm: FC<QuestionFormProps> = ({
  courseId,
  initialData,
  onSave,
  onSuccess,
  buttonText,
  toastSuccessMessage,
  toastErrorMessage,
}) => {
  const [pending, startTransition] = useTransition();
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
      const { error } = await tryCatch(onSave(data));
      if (error) {
        toast.error(toastErrorMessage);
      } else {
        toast.success(toastSuccessMessage);
        if (!initialData) form.reset();
        onSuccess();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='e.g., What is the capital of France?'
                  {...field}
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
              <FormLabel>Question Type</FormLabel>
              <Select
                onValueChange={(value: 'MCQ' | 'TRUE_FALSE') => {
                  field.onChange(value);
                  if (value === 'TRUE_FALSE') {
                    form.setValue('options', ['True', 'False']);
                  } else {
                    form.setValue('options', ['', '']);
                  }
                  form.setValue('answer', '');
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='MCQ'>Multiple Choice</SelectItem>
                  <SelectItem value='TRUE_FALSE'>True/False</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {form.watch('type') === 'MCQ' && (
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <Label>Options</Label>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addOption}
              >
                <Plus className='mr-1 h-4 w-4' /> Add Option
              </Button>
            </div>
            <div className='space-y-2'>
              {(form.watch('options') || []).map((_, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <FormField
                    control={form.control}
                    name={`options.${index}`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder={`Option ${index + 1}`} {...field} />
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
              <FormLabel>Correct Answer</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select the correct answer' />
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
              <FormLabel>Explanation (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Explain why the answer is correct.'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit' disabled={pending}>
            {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
