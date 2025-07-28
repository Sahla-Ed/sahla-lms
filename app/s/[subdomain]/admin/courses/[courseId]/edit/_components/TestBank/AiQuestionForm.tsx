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

export const AiQuestionForm: FC<SubComponentProps> = ({
  courseId,
  onSuccess,
}) => {
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
          (await res.json()).error || 'Failed to generate questions',
        );

      const { questions: generatedQuestions } = await res.json();
      if (!generatedQuestions || generatedQuestions.length === 0) {
        toast.warning(
          'AI did not generate any questions. Try a different topic.',
        );
        return;
      }
      await Promise.all(
        generatedQuestions.map((q: Omit<Question, 'id' | 'courseId'>) =>
          createQuestion({ ...q, courseId }),
        ),
      );
      toast.success(
        `Generated and saved ${generatedQuestions.length} new questions!`,
      );
      onSuccess();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='ai-topic'>Topic</Label>
        <Input
          id='ai-topic'
          placeholder='e.g., JavaScript data types'
          value={aiTopic}
          onChange={(e) => setAiTopic(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor='ai-count'>Number of Questions</Label>
        <Select
          value={String(aiCount)}
          onValueChange={(v) => setAiCount(Number(v))}
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
        {isGenerating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Generate Questions
      </Button>
    </div>
  );
};
