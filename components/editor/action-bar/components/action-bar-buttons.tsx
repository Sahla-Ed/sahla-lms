import { useEditorStore } from '@/store/editor-store';
import { useThemePresetStore } from '@/store/theme-preset-store';
import { ThemeToggle } from './theme-toggle';
import { UndoRedoButtons } from './undo-redo-buttons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ActionBarButtonsProps {
  onImportClick?: () => void;
  onCodeClick?: () => void;
  onSaveClick?: () => void;
  onShareClick?: (id?: string) => void;
  isSaving?: boolean;
}

export function ActionBarButtons({}: ActionBarButtonsProps) {
  const { themeState } = useEditorStore();
  const { getPreset } = useThemePresetStore();
  const currentPreset = themeState?.preset
    ? getPreset(themeState?.preset)
    : undefined;

  return (
    <div className='flex items-center gap-1'>
      <UndoRedoButtons />
      <Separator orientation='vertical' className='mx-1 h-8' />
      <Button
        onClick={() => console.log(JSON.stringify(themeState.styles))}
        variant='ghost'
        size='sm'
      >
        <span className='hidden text-sm md:block'>Save</span>
      </Button>
      <Separator orientation='vertical' className='mx-1 h-8' />
      <ThemeToggle />
    </div>
  );
}
