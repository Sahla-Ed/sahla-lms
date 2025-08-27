'use client';

import { type Editor } from '@tiptap/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Toggle } from '../ui/toggle';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

interface iAppProps {
  editor: Editor | null;
}

export function Menubar({ editor }: iAppProps) {
  const t = useTranslations('RichTextEditor.menubar');

  if (!editor) {
    return null;
  }

  return (
    <div className='border-input bg-card flex flex-wrap items-center gap-1 rounded-t-lg border border-x-0 border-t-0 p-2'>
      <TooltipProvider>
        <div className='flex flex-wrap gap-1'>
     
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('bold')}</TooltipContent>
          </Tooltip>

     
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('italic')}</TooltipContent>
          </Tooltip>

    
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('strike')}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('strike')}</TooltipContent>
          </Tooltip>

       
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('heading1')}</TooltipContent>
          </Tooltip>

       
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('heading2')}</TooltipContent>
          </Tooltip>

         
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('heading3')}</TooltipContent>
          </Tooltip>

    
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('bulletList')}</TooltipContent>
          </Tooltip>

          
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
              >
                <ListOrdered />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('orderedList')}</TooltipContent>
          </Tooltip>
        </div>

        <div className='bg-border mx-2 h-6 w-px'></div>

        <div className='flex flex-wrap gap-1'>
        
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
              >
                <AlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('alignLeft')}</TooltipContent>
          </Tooltip>

       
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
              >
                <AlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('alignCenter')}</TooltipContent>
          </Tooltip>

       
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
              >
                <AlignRight />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{t('alignRight')}</TooltipContent>
          </Tooltip>
        </div>

        <div className='bg-border mx-2 h-6 w-px'></div>

        <div className='flex flex-wrap gap-1'>
       
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                type='button'
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('undo')}</TooltipContent>
          </Tooltip>

     
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                type='button'
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('redo')}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}