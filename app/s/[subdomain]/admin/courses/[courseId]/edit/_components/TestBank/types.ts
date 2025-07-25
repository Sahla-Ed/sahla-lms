export interface Question {
  id: string;
  courseId: string;
  text: string;
  type: 'MCQ' | 'TRUE_FALSE';
  options: string[];
  answer: string;
  explanation?: string;
}

export interface SubComponentProps {
  courseId: string;
  onSuccess: () => void;
}