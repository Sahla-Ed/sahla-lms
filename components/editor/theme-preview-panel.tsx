'use client';

// import ShadcnBlocksLogo from '@/assets/shadcnblocks.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { useFullscreen } from '@/hooks/use-fullscreen';
import { cn } from '@/lib/utils';
import { ThemeEditorPreviewProps } from '@/types/theme';
import { Maximize, Minimize, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { lazy, useState } from 'react';
import { HorizontalScrollArea } from '../horizontal-scroll-area';
import { TooltipWrapper } from '../tooltip-wrapper';
import ColorPreview from './theme-preview/color-preview';
import ExamplesPreviewContainer from './theme-preview/examples-preview-container';
import TabsTriggerPill from './theme-preview/tabs-trigger-pill';
import { ThemeToggle } from '../themeToggle';

// Lazy load the new preview components
const Home = lazy(() => import('@/components/examples/home'));
const Courses = lazy(() => import('@/components/examples/courses'));
const SignUp = lazy(() => import('@/components/examples/sign-up'));
const SignIn = lazy(() => import('@/components/examples/sign-in'));
const ForgetPassword = lazy(
  () => import('@/components/examples/forget-password'),
);

const ThemePreviewPanel = ({
  styles,
  currentMode,
}: ThemeEditorPreviewProps) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [activeTab, setActiveTab] = useState('home');

  if (!styles || !styles[currentMode]) {
    return null;
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col',
          isFullscreen && 'bg-background fixed inset-0 z-50',
        )}
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='flex flex-1 flex-col overflow-hidden'
        >
          <HorizontalScrollArea className='mt-2 mb-1 flex w-full items-center justify-between px-4'>
            <TabsList className='bg-background text-muted-foreground inline-flex w-fit items-center justify-center rounded-full px-0'>
              <TabsTriggerPill value='home'>Home</TabsTriggerPill>
              <TabsTriggerPill value='courses'>Courses</TabsTriggerPill>
              <TabsTriggerPill value='sign-up'>Sign Up</TabsTriggerPill>
              <TabsTriggerPill value='sign-in'>Sign In</TabsTriggerPill>
              <TabsTriggerPill value='forget-password'>
                Forget Password
              </TabsTriggerPill>
              <TabsTriggerPill value='colors'>Color Palette</TabsTriggerPill>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-8 rounded-full'
                  >
                    <MoreVertical className='size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem
                    onClick={() => handleTabChange('typography')}
                  >
                    Typography
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>

            <div className='flex items-center gap-0.5'>
              {isFullscreen && <ThemeToggle />}
              <TooltipWrapper
                label={isFullscreen ? 'Exit full screen' : 'Full screen'}
                className='hidden md:inline-flex'
              >
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={toggleFullscreen}
                  className='group size-8'
                >
                  {isFullscreen ? (
                    <Minimize className='transition-all group-hover:scale-120' />
                  ) : (
                    <Maximize className='transition-all group-hover:scale-120' />
                  )}
                </Button>
              </TooltipWrapper>
            </div>
          </HorizontalScrollArea>

          <section className='relative size-full overflow-hidden p-4 pt-1'>
            <div className='relative isolate size-full overflow-hidden rounded-lg border'>
              <TabsContent value='home' className='m-0 size-full'>
                <ExamplesPreviewContainer className='size-full'>
                  <ScrollArea className='size-full'>
                    <div className='size-full'>
                      <Home />
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </ExamplesPreviewContainer>
              </TabsContent>

              <TabsContent value='courses' className='m-0 size-full'>
                <ExamplesPreviewContainer className='size-full'>
                  <ScrollArea className='size-full'>
                    <Courses />
                  </ScrollArea>
                </ExamplesPreviewContainer>
              </TabsContent>

              <TabsContent value='sign-up' className='@container m-0 size-full'>
                <ExamplesPreviewContainer className='size-full'>
                  <ScrollArea className='size-full'>
                    <div className='size-full'>
                      <SignUp />
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </ExamplesPreviewContainer>
              </TabsContent>
              <TabsContent value='sign-in' className='@container m-0 size-full'>
                <ExamplesPreviewContainer className='size-full'>
                  <ScrollArea className='size-full'>
                    <div className='size-full'>
                      <SignIn />
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </ExamplesPreviewContainer>
              </TabsContent>
              <TabsContent
                value='forget-password'
                className='@container m-0 size-full'
              >
                <ExamplesPreviewContainer className='size-full'>
                  <ScrollArea className='size-full'>
                    <div className='size-full'>
                      <ForgetPassword />
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </ExamplesPreviewContainer>
              </TabsContent>

              <TabsContent value='colors' className='m-0 size-full'>
                <ScrollArea className='size-full'>
                  <div className='p-4'>
                    <ColorPreview styles={styles} currentMode={currentMode} />
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </section>
        </Tabs>
      </div>
    </>
  );
};

export default ThemePreviewPanel;
