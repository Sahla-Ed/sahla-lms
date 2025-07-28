'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code, Loader2, Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { AdminLessonType } from '@/app/s/[subdomain]/data/admin/admin-get-lesson';
import { toast } from 'sonner';
import { tryCatch } from '@/hooks/try-catch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { updateCodingExercise } from '../../../../edit/actions';

interface CodingFormProps {
  lesson: AdminLessonType;
  chapterId: string;
  courseId: string;
}

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

export default function CodingForm({
  lesson,
  courseId,
  chapterId,
}: CodingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Form state
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description || '');
  const [instructions, setInstructions] = useState('');
  const [language, setLanguage] = useState('web');

  // Code state
  const [htmlCode, setHtmlCode] = useState(DEFAULT_WEB_CODE.html);
  const [cssCode, setCssCode] = useState(DEFAULT_WEB_CODE.css);
  const [jsCode, setJsCode] = useState(DEFAULT_WEB_CODE.javascript);
  const [serverCode, setServerCode] = useState(SERVER_TEMPLATES.python);

  // Preview state
  const [showPreview, setShowPreview] = useState(false);

  // Load existing coding exercise data
  useEffect(() => {
    const loadCodingExercise = async () => {
      try {
        // Check if lesson has coding exercise data
        if (lesson.codingExercise && lesson.codingExercise.length > 0) {
          const exercise = lesson.codingExercise[0];
          setInstructions(exercise.instructions || '');
          setLanguage(exercise.language || 'web');

          if (exercise.language === 'web') {
            try {
              const parsedCode = JSON.parse(exercise.starterCode || '{}');
              setHtmlCode(parsedCode.html || DEFAULT_WEB_CODE.html);
              setCssCode(parsedCode.css || DEFAULT_WEB_CODE.css);
              setJsCode(parsedCode.javascript || DEFAULT_WEB_CODE.javascript);
            } catch (error) {
              console.error('Failed to parse web code:', error);
              // Keep default values if parsing fails
            }
          } else {
            setServerCode(
              exercise.starterCode ||
                SERVER_TEMPLATES[exercise.language] ||
                '// Write your code here',
            );
          }
        } else {
          // No existing exercise, use defaults
          setInstructions('Complete the coding exercise below.');
          setLanguage('web');
        }
      } catch (error) {
        console.error('Failed to load coding exercise:', error);
        toast.error('Failed to load coding exercise data');
      } finally {
        setIsFetching(false);
      }
    };

    loadCodingExercise();
  }, [lesson]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (newLanguage !== 'web') {
      setServerCode(SERVER_TEMPLATES[newLanguage] || '// Write your code here');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      let starterCode = '';

      if (language === 'web') {
        starterCode = JSON.stringify({
          html: htmlCode,
          css: cssCode,
          javascript: jsCode,
        });
      } else {
        starterCode = serverCode;
      }

      // Call server action to update coding exercise
      const { data: result, error } = await tryCatch(
        updateCodingExercise({
          lessonId: lesson.id,
          title,
          description,
          language,
          starterCode,
          instructions,
        }),
      );

      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.status === 'success') {
        toast.success('Coding exercise updated successfully!');
        router.push(`/admin/courses/${courseId}/edit`);
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/courses/${courseId}/edit`);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const renderPreview = () => {
    if (language === 'web') {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
        </html>
      `;

      return (
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              srcDoc={htmlContent}
              className='h-[400px] w-full rounded-md border'
              sandbox='allow-scripts allow-same-origin'
              title='Code Preview'
            />
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Code Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='max-h-[400px] overflow-auto rounded-md bg-gray-900 p-4 font-mono text-sm text-green-400'>
              <pre>{serverCode}</pre>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  if (isFetching) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2 className='h-6 w-6 animate-spin' />
        <span className='ml-2'>Loading coding exercise...</span>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Code className='h-6 w-6 text-blue-500' />
          <h1 className='text-2xl font-bold'>
            Edit Coding Exercise: {lesson.title}
          </h1>
        </div>
        <Button variant='outline' onClick={togglePreview} className='gap-2'>
          {showPreview ? (
            <>
              <EyeOff className='h-4 w-4' />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className='h-4 w-4' />
              Show Preview
            </>
          )}
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Exercise Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label htmlFor='title'>Exercise Title</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter exercise title...'
            />
          </div>
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter exercise description...'
              className='min-h-[80px]'
            />
          </div>
          <div>
            <Label htmlFor='instructions'>Instructions</Label>
            <Textarea
              id='instructions'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder='Provide instructions for the coding exercise...'
              className='min-h-[100px]'
            />
          </div>
        </CardContent>
      </Card>

      {/* Programming Language Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Programming Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <Label>Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='web'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-orange-100 text-orange-800'
                      >
                        Web
                      </Badge>
                      Web Development (HTML/CSS/JS)
                    </div>
                  </SelectItem>
                  <SelectItem value='python'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-blue-100 text-blue-800'
                      >
                        Python
                      </Badge>
                      Python
                    </div>
                  </SelectItem>
                  <SelectItem value='javascript'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-yellow-100 text-yellow-800'
                      >
                        JS
                      </Badge>
                      JavaScript
                    </div>
                  </SelectItem>
                  <SelectItem value='typescript'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-blue-100 text-blue-800'
                      >
                        TS
                      </Badge>
                      TypeScript
                    </div>
                  </SelectItem>
                  <SelectItem value='cpp'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-purple-100 text-purple-800'
                      >
                        C++
                      </Badge>
                      C++
                    </div>
                  </SelectItem>
                  <SelectItem value='c'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='bg-gray-100 text-gray-800'
                      >
                        C
                      </Badge>
                      C
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {showPreview && <div className='space-y-4'>{renderPreview()}</div>}

      {/* Starter Code Configuration */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Starter Code</CardTitle>
            <Badge variant='outline' className='text-xs'>
              {language === 'web'
                ? 'HTML/CSS/JavaScript'
                : language.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {language === 'web' ? (
            <div className='space-y-6'>
              <div>
                <div className='mb-2 flex items-center gap-2'>
                  <Label htmlFor='html-code'>HTML Starter Code</Label>
                  <Badge
                    variant='outline'
                    className='bg-orange-50 text-orange-700'
                  >
                    HTML
                  </Badge>
                </div>
                <Textarea
                  id='html-code'
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  placeholder='HTML code...'
                  className='min-h-[150px] font-mono text-sm'
                />
              </div>

              <div>
                <div className='mb-2 flex items-center gap-2'>
                  <Label htmlFor='css-code'>CSS Starter Code</Label>
                  <Badge variant='outline' className='bg-blue-50 text-blue-700'>
                    CSS
                  </Badge>
                </div>
                <Textarea
                  id='css-code'
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  placeholder='CSS code...'
                  className='min-h-[150px] font-mono text-sm'
                />
              </div>

              <div>
                <div className='mb-2 flex items-center gap-2'>
                  <Label htmlFor='js-code'>JavaScript Starter Code</Label>
                  <Badge
                    variant='outline'
                    className='bg-yellow-50 text-yellow-700'
                  >
                    JavaScript
                  </Badge>
                </div>
                <Textarea
                  id='js-code'
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  placeholder='JavaScript code...'
                  className='min-h-[150px] font-mono text-sm'
                />
              </div>
            </div>
          ) : (
            <div>
              <div className='mb-2 flex items-center gap-2'>
                <Label htmlFor='server-code'>Starter Code</Label>
                <Badge variant='outline' className='bg-green-50 text-green-700'>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </Badge>
              </div>
              <Textarea
                id='server-code'
                value={serverCode}
                onChange={(e) => setServerCode(e.target.value)}
                placeholder='Write your starter code here...'
                className='min-h-[300px] font-mono text-sm'
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={handleCancel}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            <>
              <Save className='mr-2 h-4 w-4' />
              Save Exercise
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
