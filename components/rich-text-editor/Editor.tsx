'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Menubar } from './Menubar';
import TextAlign from '@tiptap/extension-text-align';
import {
  type ControllerRenderProps,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';
export function RichTextEditor<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ field }: { field: ControllerRenderProps<TFieldValues, TName> }) {
  const t = useTranslations('RichTextEditor');
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      
    ],

    editorProps: {
      attributes: {
        class:
          'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none',
      },
    },

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value ? JSON.parse(field.value) : t.raw('defaultContent'),
  });

  return (
    <div className='border-input dark:bg-input/30 w-full overflow-hidden rounded-lg border'>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
