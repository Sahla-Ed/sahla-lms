import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { lessonSchema, LessonSchemaType } from '@/lib/zodSchemas';
import { Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { tryCatch } from '@/hooks/try-catch';
import { createLesson } from '../actions';
import { toast } from 'sonner';

const DEFAULT_WEB_CODE = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Playground</title>
</head>
<body>
  <div class="container">
    <h1>Welcome to Web Playground!</h1>
    <button id="myButton">Click Me!</button>
    <p id="output">Hello World!</p>
  </div>
</body>
</html>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 400px;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0;
  transition: all 0.3s ease;
}

button:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

#output {
  color: #666;
  font-size: 1.1rem;
  margin-top: 1rem;
}`,
  javascript: `document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('myButton');
  const output = document.getElementById('output');

  let clickCount = 0;

  button.addEventListener('click', function() {
    clickCount++;
    output.textContent = \`Button clicked \${clickCount} time(s)!\`;
    output.style.color = getRandomColor();
  });

  function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  console.log('JavaScript loaded successfully!');
  console.log('Try clicking the button to see the magic!');
});`,
};

const SERVER_TEMPLATES: Record<string, string> = {
  python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 Fibonacci numbers
print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};

    cout << "Original numbers: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    cout << "Squared numbers: ";
    for(int num : numbers) {
        cout << num * num << " ";
    }
    cout << endl;

    return 0;
}`,
  c: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("Factorial calculations:\\n");
    for(int i = 1; i <= 5; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}`,
  javascript: `// JavaScript Example
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for(let i = 0; i < 10; i++) {
    console.log(fibonacci(i));
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log("Factorial calculations:");
for(let i = 1; i <= 5; i++) {
    console.log(i + "! = " + factorial(i));
}`,
  typescript: `// TypeScript Example
interface User {
    name: string;
    age: number;
    email: string;
}

function greetUser(user: User): string {
    return \`Hello \${user.name}, you are \${user.age} years old!\`;
}

const users: User[] = [
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 30, email: "bob@example.com" }
];

users.forEach(user => {
    console.log(greetUser(user));
});`,
};

export function NewLessonModal({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: '',
      courseId: courseId,
      type: 'VIDEO',
      chapterId: chapterId,
      codingLanguage: 'web',
      htmlStarterCode: DEFAULT_WEB_CODE.html,
      cssStarterCode: DEFAULT_WEB_CODE.css,
      jsStarterCode: DEFAULT_WEB_CODE.javascript,
      serverStarterCode: SERVER_TEMPLATES.python,
      codingInstructions: 'Complete the coding exercise below.',
    },
  });

  const watchedType = form.watch('type');
  const watchedCodingLanguage = form.watch('codingLanguage');

  async function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values));

      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.status === 'success') {
        const isQuiz = values.type === 'QUIZ';
        const isCoding = values.type === 'CODING';
        toast.success(
          isQuiz
            ? 'Quiz created successfully'
            : isCoding
              ? 'Coding playground created successfully'
              : result.message,
        );
        form.reset({
          name: '',
          courseId: courseId,
          type: 'VIDEO',
          chapterId: chapterId,
          codingLanguage: 'web',
          htmlStarterCode: DEFAULT_WEB_CODE.html,
          cssStarterCode: DEFAULT_WEB_CODE.css,
          jsStarterCode: DEFAULT_WEB_CODE.javascript,
          serverStarterCode: SERVER_TEMPLATES.python,
          codingInstructions: 'Complete the coding exercise below.',
        });
        setIsOpen(false);
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset({
        name: '',
        courseId: courseId,
        type: 'VIDEO',
        chapterId: chapterId,
        codingLanguage: 'web',
        htmlStarterCode: DEFAULT_WEB_CODE.html,
        cssStarterCode: DEFAULT_WEB_CODE.css,
        jsStarterCode: DEFAULT_WEB_CODE.javascript,
        serverStarterCode: SERVER_TEMPLATES.python,
        codingInstructions: 'Complete the coding exercise below.',
      });
    }

    setIsOpen(open);
  }

  const handleLanguageChange = (language: string) => {
    form.setValue('codingLanguage', language);
    if (language !== 'web') {
      form.setValue(
        'serverStarterCode',
        SERVER_TEMPLATES[language] || '// Write your code here',
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full justify-center gap-1'>
          <Plus className='size-4' /> New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent
        className={
          watchedType === 'CODING'
            ? 'max-h-[90vh] overflow-y-auto sm:max-w-4xl'
            : 'sm:max-w-[425px]'
        }
        aria-describedby='new-lesson-desc'
      >
        <DialogHeader>
          <DialogTitle>Create new lesson</DialogTitle>
          <DialogDescription id='new-lesson-desc'>
            What would you like to name your lesson?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Lesson Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Lesson Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex space-x-4'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='VIDEO' />
                        </FormControl>
                        <FormLabel className='font-normal'>Video</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='QUIZ' />
                        </FormControl>
                        <FormLabel className='font-normal'>Quiz</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='CODING' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Coding Playground
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Coding Exercise Fields */}
            {watchedType === 'CODING' && (
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='codingInstructions'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Provide instructions for the coding exercise...'
                          className='min-h-[80px]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='codingLanguage'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programming Language</FormLabel>
                      <Select
                        onValueChange={handleLanguageChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select language' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='web'>
                            Web Development (HTML/CSS/JS)
                          </SelectItem>
                          <SelectItem value='python'>Python</SelectItem>
                          <SelectItem value='javascript'>JavaScript</SelectItem>
                          <SelectItem value='typescript'>TypeScript</SelectItem>
                          <SelectItem value='cpp'>C++</SelectItem>
                          <SelectItem value='c'>C</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchedCodingLanguage === 'web' ? (
                  <div className='grid grid-cols-1 gap-4'>
                    <FormField
                      control={form.control}
                      name='htmlStarterCode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HTML Starter Code</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='HTML code...'
                              className='min-h-[120px] font-mono text-sm'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='cssStarterCode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CSS Starter Code</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='CSS code...'
                              className='min-h-[120px] font-mono text-sm'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='jsStarterCode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>JavaScript Starter Code</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='JavaScript code...'
                              className='min-h-[120px] font-mono text-sm'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name='serverStarterCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starter Code</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Write your starter code here...'
                            className='min-h-[200px] font-mono text-sm'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            <DialogFooter>
              <Button disabled={pending} type='submit'>
                {pending ? 'Saving...' : ' Save Change'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
