'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { LessonContentType } from '@/app/s/[subdomain]/data/course/get-lesson-content';
import { Button } from '@/components/ui/button';
import { Loader2, Play, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  submitCode,
  getUserSubmissions,
  getLatestUserSubmission,
} from '@/app/s/[subdomain]/dashboard/[slug]/[lessonId]/actions';
import { CodingSubmissionStatus } from '@/lib/generated/prisma';

//map judge0 status id to description to match CodingSubmissionStatus enum
export const statusMap: Record<number, CodingSubmissionStatus> = {
  1: 'InQueue',
  2: 'Processing',
  3: 'Accepted',
  4: 'WrongAnswer',
  5: 'TimeLimitExceeded',
  6: 'CompilationError',
  7: 'RuntimeError',
  8: 'RuntimeError',
  9: 'RuntimeError',
  10: 'RuntimeError',
  11: 'RuntimeError',
  12: 'RuntimeError',
  13: 'InternalError',
  14: 'ExecFormatError',
};

type CodingSubmission = {
  id: string;
  userId: string;
  lessonId: string;
  code: string | null;
  htmlCode: string | null;
  cssCode: string | null;
  jsCode: string | null;
  language: string;
  submissionType: string;
  output: string | null;
  status: CodingSubmissionStatus;
  score: number | null;
  passed: boolean | null;
  attemptNumber: number;
  createdAt: Date;
  updatedAt: Date;
};

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
  css: `
* {
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
  javascript: `
document.addEventListener('DOMContentLoaded', function() {
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

  // Add some console output
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

type WebTab = 'html' | 'css' | 'javascript';

interface iAppProps {
  data: LessonContentType;
}

export function CodingPlayground({
  data,
  userId,
}: {
  data: iAppProps['data'];
  userId: string;
}) {
  //code submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<CodingSubmission[]>([]);

  const [executionStatus, setExecutionStatus] = useState<number>(0);

  // Initialize coding exercise data
  const codingExercise = data.codingExercise?.[0];
  const exerciseLanguage = codingExercise?.language || 'web';

  // State for tracking if we&apos;ve loaded user submission
  const [isCodeInitialized, setIsCodeInitialized] = useState(false);
  const [hasUserSubmission, setHasUserSubmission] = useState(false);
  const [lastSubmissionDate, setLastSubmissionDate] = useState<Date | null>(
    null,
  );
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Memoize starter code to prevent re-creation on every render
  const starterCode = useMemo(() => {
    if (!codingExercise?.starterCode) {
      return {
        webCode: DEFAULT_WEB_CODE,
        serverCode: SERVER_TEMPLATES.python,
        language: 'python',
        mode: 'web' as 'web' | 'server',
      };
    }

    if (exerciseLanguage === 'web') {
      try {
        const parsedWebCode = JSON.parse(codingExercise.starterCode);
        return {
          webCode: {
            html: parsedWebCode.html || DEFAULT_WEB_CODE.html,
            css: parsedWebCode.css || DEFAULT_WEB_CODE.css,
            javascript: parsedWebCode.javascript || DEFAULT_WEB_CODE.javascript,
          },
          serverCode: SERVER_TEMPLATES.python,
          language: 'python',
          mode: 'web' as 'web' | 'server',
        };
      } catch {
        return {
          webCode: DEFAULT_WEB_CODE,
          serverCode: SERVER_TEMPLATES.python,
          language: 'python',
          mode: 'web' as 'web' | 'server',
        };
      }
    } else {
      return {
        webCode: DEFAULT_WEB_CODE,
        serverCode: codingExercise.starterCode,
        language: exerciseLanguage,
        mode: 'server' as 'web' | 'server',
      };
    }
  }, [codingExercise?.starterCode, exerciseLanguage]);

  // Use ref for stable starter code reference
  const starterCodeRef = useRef(starterCode);
  starterCodeRef.current = starterCode;

  // Web development state
  const [webCode, setWebCode] = useState(starterCode.webCode);
  const [activeWebTab, setActiveWebTab] = useState<WebTab>('html');

  // Server-side development state
  const [serverCode, setServerCode] = useState(starterCode.serverCode);
  const [serverLanguage, setServerLanguage] = useState(starterCode.language);

  // UI state
  const [mode, setMode] = useState<'web' | 'server'>(starterCode.mode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleWebCodeChange = useCallback(
    (value: string | undefined, tab: WebTab) => {
      setWebCode((prev) => ({
        ...prev,
        [tab]: value || '',
      }));
      // Reset execution status when code changes
      setExecutionStatus(0);
    },
    [setExecutionStatus],
  );

  const handleServerCodeChange = useCallback(
    (value: string | undefined) => {
      setServerCode(value || '');
      // Reset execution status when code changes
      setExecutionStatus(0);
    },
    [setExecutionStatus],
  );

  const resetToStarterCode = useCallback(() => {
    const currentStarterCode = starterCodeRef.current;
    if (exerciseLanguage === 'web') {
      setWebCode(currentStarterCode.webCode);
    } else {
      setServerCode(currentStarterCode.serverCode);
    }
    setHasUserSubmission(false);
    setLastSubmissionDate(null);
    setOutput('');
    setShowResetDialog(false);
    setExecutionStatus(0);
    toast.success('Reset to starter code');
  }, [exerciseLanguage, setExecutionStatus]);

  const loadSubmission = useCallback(
    (submission: CodingSubmission) => {
      const currentStarterCode = starterCodeRef.current;
      if (submission.submissionType === 'Web' && exerciseLanguage === 'web') {
        setWebCode({
          html: submission.htmlCode || currentStarterCode.webCode.html,
          css: submission.cssCode || currentStarterCode.webCode.css,
          javascript:
            submission.jsCode || currentStarterCode.webCode.javascript,
        });
      } else if (
        submission.submissionType === 'Programming' &&
        exerciseLanguage !== 'web'
      ) {
        setServerCode(submission.code || currentStarterCode.serverCode);
      }

      setHasUserSubmission(true);
      setLastSubmissionDate(new Date(submission.createdAt));
      setOutput('');
      toast.success(
        `Loaded submission from attempt #${submission.attemptNumber}`,
      );
    },
    [exerciseLanguage],
  );

  const runWebCode = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Web Preview</title>
        <style>
          ${webCode.css}
        </style>
      </head>
      <body>
        ${webCode.html}
        <script>
          // Console override to capture logs
          const originalLog = console.log;
          const logs = [];
          console.log = function(...args) {
            logs.push(args.join(' '));
            originalLog.apply(console, arguments);
          };

          try {
            ${webCode.javascript}
          } catch (error) {
            console.error('JavaScript Error:', error.message);
            document.body.innerHTML += '<div style="color: red; padding: 10px; background: #ffe6e6; margin: 10px; border-radius: 5px;">Error: ' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;

    iframe.onload = () => URL.revokeObjectURL(url);
  }, [webCode]);

  const runServerCode = useCallback(async () => {
    try {
      setOutput('Running...');

      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: serverCode,
          language: serverLanguage,
          stdin: '',
        }),
      });

      const result = await response.json();

      if (result.error) {
        setOutput(`Error: ${result.error}\n${result.details || ''}`);
        toast.error('Code execution failed');
        return result.status;
      } else {
        setOutput(result.output || 'No output');
        toast.error(`Code execution status: ${statusMap[result.status]}`);
        return result.status;
      }
    } catch (error) {
      console.error('Server Error:', error);
      setOutput('Failed to execute code. Please try again.');
      toast.error('Network error');
    }
  }, [serverCode, serverLanguage]);

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);

    try {
      if (mode === 'web') {
        runWebCode();
        //todo: handle web code execution status correctly
        setExecutionStatus(3);
      } else {
        const status = await runServerCode();
        setExecutionStatus(status || 0);
      }
    } finally {
      setIsRunning(false);
    }
  }, [mode, runWebCode, runServerCode]);

  const handleSubmitCode = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const submissionData = {
        lessonId: data.id,
        userId,
        language: mode === 'web' ? 'web' : serverLanguage,
        submissionType: (mode === 'web' ? 'Web' : 'Programming') as
          | 'Web'
          | 'Programming',
        // For web development
        ...(mode === 'web' && {
          htmlCode: webCode.html,
          cssCode: webCode.css,
          jsCode: webCode.javascript,
        }),
        // For programming languages
        ...(mode === 'server' && {
          code: serverCode,
        }),
      };
      const slug = data.Chapter?.Course?.slug;
      console.log('ExecutionStatus:', executionStatus);
      const result = await submitCode(submissionData, slug, executionStatus);

      if (result.status === 'success') {
        toast.success('Code submitted successfully! 🎉');
        // Refresh submissions list and update status
        try {
          const userSubmissions = await getUserSubmissions(data.id, userId);
          setSubmissions(userSubmissions);
        } catch (error) {
          console.error('Failed to refresh submissions:', error);
        }
        setHasUserSubmission(true);
        setLastSubmissionDate(new Date());
        setIsCodeInitialized(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Server Error:', error);
      toast.error('Failed to submit code');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    data.id,
    data.Chapter?.Course?.slug,
    userId,
    mode,
    serverLanguage,
    webCode,
    serverCode,
    executionStatus,
  ]);

  // Reset execution status when mode changes
  useEffect(() => {
    setExecutionStatus(0);
  }, [mode]);

  // Initialize component - load submissions and latest submission only once
  useEffect(() => {
    let mounted = true;

    // Prevent re-initialization if already initialized
    if (isCodeInitialized) {
      return;
    }

    const initializeComponent = async () => {
      try {
        // Load submissions
        const userSubmissions = await getUserSubmissions(data.id, userId);
        if (mounted) {
          setSubmissions(userSubmissions);
        }

        // Load latest submission for code initialization
        const latestSubmission = await getLatestUserSubmission(data.id, userId);

        if (mounted && latestSubmission) {
          // User has previous submissions, load the latest one
          setHasUserSubmission(true);
          setLastSubmissionDate(new Date(latestSubmission.createdAt));

          if (
            latestSubmission.submissionType === 'Web' &&
            exerciseLanguage === 'web'
          ) {
            const currentStarterCode = starterCodeRef.current;
            setWebCode({
              html:
                latestSubmission.htmlCode || currentStarterCode.webCode.html,
              css: latestSubmission.cssCode || currentStarterCode.webCode.css,
              javascript:
                latestSubmission.jsCode ||
                currentStarterCode.webCode.javascript,
            });
            setMode('web');
          } else if (
            latestSubmission.submissionType === 'Programming' &&
            exerciseLanguage !== 'web'
          ) {
            const currentStarterCode = starterCodeRef.current;
            setServerCode(
              latestSubmission.code || currentStarterCode.serverCode,
            );
            setServerLanguage(exerciseLanguage);
            setMode('server');
          }
        } else if (mounted && !latestSubmission) {
          // No previous submissions, use starter code (already set in initial state)
          setHasUserSubmission(false);
          setLastSubmissionDate(null);
        }

        if (mounted) {
          setIsCodeInitialized(true);
        }
      } catch (error) {
        console.error('Failed to initialize component:', error);
        if (mounted) {
          setIsCodeInitialized(true);
        }
      }
    };

    initializeComponent();

    return () => {
      mounted = false;
    };
  }, [data.id, userId, exerciseLanguage]);

  return (
    <div className='flex h-full flex-col gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Coding Playground</h1>
          {/* Status Indicator */}
          {isCodeInitialized && (
            <div className='mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
              {hasUserSubmission ? (
                <>
                  <span className='flex items-center gap-1'>
                    <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                    Previous work loaded
                  </span>
                  {lastSubmissionDate && (
                    <span className='text-xs'>
                      (Last saved: {lastSubmissionDate.toLocaleDateString()}{' '}
                      {lastSubmissionDate.toLocaleTimeString()})
                    </span>
                  )}
                </>
              ) : (
                <span className='flex items-center gap-1'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  Using starter code
                </span>
              )}
            </div>
          )}
        </div>

        <div className='flex items-center gap-4'>
          {/* Language Display */}
          <div className='rounded-md border bg-gray-50 px-3 py-2 text-sm font-medium dark:bg-gray-800'>
            {exerciseLanguage === 'web' ? (
              <span className='text-blue-600'>🌐 Web Development</span>
            ) : (
              <span className='text-green-600'>
                🖥️{' '}
                {exerciseLanguage.charAt(0).toUpperCase() +
                  exerciseLanguage.slice(1)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2'>
            {hasUserSubmission && (
              <AlertDialog
                open={showResetDialog}
                onOpenChange={setShowResetDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-orange-600 hover:text-orange-700'
                  >
                    <RotateCcw className='mr-2 h-4 w-4' />
                    Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset to Starter Code?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will replace your current code with the original
                      starter code. Your previous submissions will still be
                      saved, but any unsaved changes will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetToStarterCode}>
                      Reset Code
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              variant='outline'
            >
              {isRunning ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Running...
                </>
              ) : (
                <>
                  <Play className='mr-2 h-4 w-4' />
                  Run
                </>
              )}
            </Button>

            <Button onClick={handleSubmitCode} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Submit Code
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {codingExercise?.instructions && (
        <div className='rounded-md border bg-blue-50 p-4 dark:bg-blue-950'>
          <h3 className='mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200'>
            Instructions
          </h3>
          <p className='whitespace-pre-wrap text-blue-700 dark:text-blue-300'>
            {codingExercise.instructions}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className='grid flex-grow grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* Code Editor */}
        <div className='overflow-hidden rounded-md border'>
          {mode === 'web' ? (
            <>
              {/* Web Development Tabs */}
              <div
                className={`flex border-b ${currentTheme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
              >
                {(['html', 'css', 'javascript'] as WebTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveWebTab(tab)}
                    className={`border-r px-4 py-2 text-sm font-medium transition-colors ${
                      activeWebTab === tab
                        ? `border-b-2 border-blue-600 ${currentTheme === 'light' ? 'bg-white' : 'bg-gray-800'} text-blue-600`
                        : `text-gray-300 hover:bg-gray-100 hover:text-gray-500 ${currentTheme === 'light' ? 'bg-white' : 'bg-gray-800'}`
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <Editor
                height='400px'
                language={
                  activeWebTab === 'javascript' ? 'javascript' : activeWebTab
                }
                value={webCode[activeWebTab]}
                onChange={(value) => handleWebCodeChange(value, activeWebTab)}
                theme={currentTheme === 'light' ? 'vs-light' : 'vs-dark'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                }}
              />
            </>
          ) : (
            <>
              {/* Server Development Header */}
              <div
                className={`border-b ${currentTheme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'} px-4 py-2 text-sm font-medium`}
              >
                {serverLanguage.toUpperCase()} Editor
              </div>

              <Editor
                height='400px'
                language={serverLanguage === 'cpp' ? 'cpp' : serverLanguage}
                value={serverCode}
                onChange={handleServerCodeChange}
                theme={currentTheme === 'light' ? 'vs-light' : 'vs-dark'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                }}
              />
            </>
          )}
        </div>

        {/* Output Panel */}
        {/* <div className='overflow-hidden rounded-md border'>
          <div
            className={`border-b ${currentTheme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} px-4 py-2 text-sm font-medium`}
          >
            {mode === 'web' ? '🌐 Live Preview' : '📄 Output'}
          </div>

          {mode === 'web' ? (
            <iframe
              ref={iframeRef}
              className='h-[400px] w-full'
              sandbox='allow-scripts allow-same-origin'
              title='Web Preview'
            />
          ) : (
            <div
              className={`h-[400px] overflow-auto ${currentTheme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'} p-4`}
            >
              <pre className='font-mono text-sm break-words whitespace-pre-wrap'>
                {output || 'Click "Run Code" to see output...'}
              </pre>
            </div>
          )}
        </div> */}
        <div className='flex-1 overflow-hidden rounded-md border'>
          <div
            className={`border-b ${currentTheme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} px-4 py-2 text-sm font-medium`}
          >
            {mode === 'web' ? '🌐 Live Preview' : '📄 Output'}
          </div>

          {mode === 'web' ? (
            <iframe
              ref={iframeRef}
              className='h-full w-full'
              sandbox='allow-scripts allow-same-origin'
              title='Web Preview'
            />
          ) : (
            <div
              className={`h-[400px] overflow-auto ${currentTheme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'} p-4`}
            >
              <pre className='font-mono text-sm break-words whitespace-pre-wrap'>
                {output || 'Click "Run Code" to see output...'}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {/* <div className='grid flex-grow grid-cols-1 gap-4 lg:grid-cols-3'> */}
      {/* Code Editor - Takes 2 columns */}
      {/* <div className='overflow-hidden rounded-md border lg:col-span-2'> */}
      {/* ... (previous editor code) */}
      {/* </div> */}

      {/* Right Sidebar - Output + Submissions */}
      <div className='flex flex-col gap-4'>
        {/* Output Panel */}
        {/* <div className='flex-1 overflow-hidden rounded-md border'>
            <div className='border-b bg-gray-50 px-4 py-2 text-sm font-medium'>
              {mode === 'web' ? '🌐 Live Preview' : '📄 Output'}
            </div>

            {mode === 'web' ? (
              <iframe
                ref={iframeRef}
                className='h-[300px] w-full'
                sandbox='allow-scripts allow-same-origin'
                title='Web Preview'
              />
            ) : (
              <div className='h-[300px] overflow-auto bg-gray-900 p-4 text-gray-100'>
                <pre className='font-mono text-sm break-words whitespace-pre-wrap'>
                  {output || 'Click "Run Code" to see output...'}
                </pre>
              </div>
            )}
          </div> */}

        {/* Submissions History */}
        <div className='overflow-hidden rounded-md border'>
          <div className='border-b bg-gray-50 px-4 py-2 text-sm font-medium dark:bg-gray-800 dark:text-gray-200'>
            📚 My Submissions ({submissions.length})
          </div>
          <div className='max-h-[300px] overflow-y-auto p-4'>
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <div
                  key={submission.id}
                  className={`mb-3 rounded border p-3 text-sm ${
                    index === 0
                      ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>
                        Attempt #{submission.attemptNumber}
                      </span>
                      {index === 0 && (
                        <span className='rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                          Latest
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {new Date(submission.createdAt).toLocaleDateString()}{' '}
                        {new Date(submission.createdAt).toLocaleTimeString()}
                      </span>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => loadSubmission(submission)}
                        className='h-6 px-2 text-xs'
                      >
                        Load
                      </Button>
                    </div>
                  </div>
                  <div className='mt-2 text-xs text-gray-600 dark:text-gray-400'>
                    <div className='flex items-center justify-between'>
                      <span>
                        Language: {submission.language} | Type:{' '}
                        {submission.submissionType}
                      </span>
                      <span
                        className={`rounded px-1 py-0.5 text-xs ${
                          submission.status === 'Accepted'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : submission.status === 'WrongAnswer'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  </div>
                  {submission.submissionType === 'Web' ? (
                    <div className='mt-2 grid grid-cols-3 gap-1 text-xs'>
                      <div className='text-orange-600 dark:text-orange-400'>
                        HTML:{' '}
                        {submission.htmlCode
                          ? `${Math.min(submission.htmlCode.length, 1000)}${submission.htmlCode.length > 1000 ? '...' : ''} chars`
                          : 'Empty'}
                      </div>
                      <div className='text-blue-600 dark:text-blue-400'>
                        CSS:{' '}
                        {submission.cssCode
                          ? `${Math.min(submission.cssCode.length, 1000)}${submission.cssCode.length > 1000 ? '...' : ''} chars`
                          : 'Empty'}
                      </div>
                      <div className='text-yellow-600 dark:text-yellow-400'>
                        JS:{' '}
                        {submission.jsCode
                          ? `${Math.min(submission.jsCode.length, 1000)}${submission.jsCode.length > 1000 ? '...' : ''} chars`
                          : 'Empty'}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 text-xs text-gray-600 dark:text-gray-400'>
                      Code:{' '}
                      {submission.code
                        ? `${Math.min(submission.code.length, 1000)}${submission.code.length > 1000 ? '...' : ''} chars`
                        : 'Empty'}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                No submissions yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
