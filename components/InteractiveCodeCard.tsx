'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Terminal, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function InteractiveCodeCard() {
  const t = useTranslations(
    'SahlaPlatform.HomePage.whySahla.feature2_interactive',
  );
  const [runCount, setRunCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    setStatus('idle');

    setTimeout(() => {
      if (runCount % 2 === 0) {
        setOutput(t('error_message'));
        setStatus('error');
      } else {
        setOutput(t('success_message'));
        setStatus('success');
      }
      setRunCount((prev) => prev + 1);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className='relative mt-8 flex h-full flex-col rounded-2xl bg-gray-900 p-6 text-white shadow-lg'>
      <div className='mb-4 flex flex-shrink-0 gap-2'>
        <div className='h-3 w-3 rounded-full bg-red-500'></div>
        <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
        <div className='h-3 w-3 rounded-full bg-green-500'></div>
      </div>

      <div
        dir='ltr'
        className='flex-grow space-y-2 rounded-md bg-black/30 p-4 font-mono text-sm'
      >
        <div>
          <span className='text-purple-400'>console</span>.
          <span className='text-yellow-300'>log</span>(
          <span className='text-green-400'>{'"Hello, Sahla!"'}</span>
        </div>
      </div>

      <div className='mt-4 flex flex-shrink-0 items-center justify-between'>
        <Button
          onClick={handleRunCode}
          disabled={isRunning}
          className='bg-green-500 font-bold text-black hover:bg-green-600'
        >
          {isRunning ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              {t('running')}
            </>
          ) : (
            <>
              <Terminal className='mr-2 h-4 w-4' />
              {t('run_code')}
            </>
          )}
        </Button>

        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='flex items-center gap-2 text-sm'
            >
              {status === 'error' && (
                <XCircle className='h-5 w-5 text-red-500' />
              )}
              {status === 'success' && (
                <CheckCircle className='h-5 w-5 text-green-500' />
              )}
              <span>{output}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
