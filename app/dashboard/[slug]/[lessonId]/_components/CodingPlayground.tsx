'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';
import { toast } from 'sonner';

// Default starter code for different languages
const LANGUAGE_TEMPLATES: Record<string, string> = {
  javascript: `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));`,
  python: `def add(a, b):\n    return a + b\n\nprint(add(2, 3))`,
  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Playground</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>`,
  css: `body {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}`,
  typescript: `function add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(2, 3));`,
};

export function CodingPlayground() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Initialize with default code for selected language
  useEffect(() => {
    setCode(LANGUAGE_TEMPLATES[language] || '');
  }, [language]);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  async function handleRunCode() {
    if (!code.trim()) return;

    setIsRunning(true);
    setOutput('Running...');

    try {
      // Call your API route to execute code securely
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        setOutput(result.output);
      }
    } catch (error) {
      setOutput('Failed to execute code. Please try again.');
      console.error('Execution error:', error);
      toast.error('Code execution failed');
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className='flex h-full flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Coding Playground</h1>

        <div className='flex items-center gap-4'>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='bg-background rounded-md border px-3 py-2'
          >
            <option value='javascript'>JavaScript</option>
            <option value='typescript'>TypeScript</option>
            <option value='python'>Python</option>
            <option value='html'>HTML</option>
            <option value='css'>CSS</option>
          </select>

          <Button onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Running...
              </>
            ) : (
              'Run Code'
            )}
          </Button>
        </div>
      </div>

      <div className='grid flex-grow grid-cols-1 gap-4 lg:grid-cols-2'>
        <div className='overflow-hidden rounded-md border'>
          <Editor
            height='100%'
            defaultLanguage={language}
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme='vs-dark'
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            onMount={handleEditorDidMount}
          />
        </div>

        <div className='rounded-md border bg-gray-900 p-4 text-gray-100'>
          <h2 className='mb-2 text-lg font-semibold'>Output</h2>
          <pre className='font-mono text-sm break-words whitespace-pre-wrap'>
            {output || 'Your output will appear here...'}
          </pre>
        </div>
      </div>

      <div className='text-muted-foreground text-sm'>
        <p>Note: Code execution is limited to 5 seconds runtime</p>
      </div>
    </div>
  );
}
// export function CodingPlayground() {
//   return (
//     <iframe
//       src='https://stackblitz.com/edit/web-platform-9xtryh?embed=1&file=index.html'
//       className='h-[600px] w-full rounded-lg border'
//       sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
//     />
//   );
// }
