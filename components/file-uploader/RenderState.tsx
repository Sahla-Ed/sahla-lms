import { cn } from '@/lib/utils';
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  const t = useTranslations('Uploader.emptyState');
  return (
    <div className='text-center'>
      <div className='bg-muted mx-auto mb-4 flex size-12 items-center justify-center rounded-full'>
        <CloudUploadIcon
          className={cn(
            'text-muted-foreground size-6',
            isDragActive && 'text-primary',
          )}
        />
      </div>
      <p className='text-foreground text-base font-semibold'>
        {t('title')}{' '}
        <span className='text-primary cursor-pointer font-bold'>
          {t('cta')}
        </span>
      </p>
      <Button type='button' className='mt-4'>
        {t('selectButton')}
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  const t = useTranslations('Uploader.errorState');
  return (
    <div className='text-center'>
      <div className='bg-destructive/30 mx-auto mb-4 flex size-12 items-center justify-center rounded-full'>
        <ImageIcon className={cn('text-destructive size-6')} />
      </div>
      <p className='text-base font-semibold'>{t('title')}</p>
      <p className='text-muted-foreground mt-1 text-xs'>{t('description')}</p>
      <Button className='mt-4' type='button'>
        {t('retryButton')}
      </Button>
    </div>
  );
}

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: 'image' | 'video';
}) {
  return (
    <div className='group relative flex h-full w-full items-center justify-center'>
      {fileType === 'video' ? (
        <video src={previewUrl} controls className='h-full w-full rounded-md' />
      ) : (
        <Image
          src={previewUrl}
          alt='Uploaded File'
          fill
          className='object-contain p-2'
        />
      )}
      <Button
        variant='destructive'
        size='icon'
        className={cn('absolute top-4 right-4')}
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className='size-4 animate-spin' />
        ) : (
          <XIcon className='size-4' />
        )}
      </Button>
    </div>
  );
}
export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  const t = useTranslations('Uploader.uploadingState');
  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <p className='text-2xl font-bold'>{progress}%</p>
      <p className='text-foreground mt-2 text-sm font-medium'>{t('title')}</p>
      <p className='text-muted-foreground mt-1 max-w-xs truncate text-xs'>
        {file.name}
      </p>
    </div>
  );
}
