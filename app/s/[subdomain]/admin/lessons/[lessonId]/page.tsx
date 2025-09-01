import { getComments } from '@/app/s/[subdomain]/dashboard/[slug]/[lessonId]/comment-actions';
import { requireAdmin } from '@/app/s/[subdomain]/data/admin/require-admin';
import { CommentList } from '@/app/s/[subdomain]/dashboard/[slug]/[lessonId]/_components/CommentList';
import { CommentForm } from '@/app/s/[subdomain]/dashboard/[slug]/[lessonId]/_components/CommentForm';
import { adminGetLessonContent } from '@/app/s/[subdomain]/data/admin/admin-get-lesson-content';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';
import { BookIcon } from 'lucide-react';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { getTranslations } from 'next-intl/server';
import { Player } from '@/components/player/player';

interface AdminLessonPreviewProps {
  params: Promise<{ lessonId: string }>;
}

export const dynamic = 'force-dynamic';

async function LessonPreview({
  data,
}: {
  data: Awaited<ReturnType<typeof adminGetLessonContent>>;
}) {
  const videoUrl = useConstructUrl(data.videoKey ?? '');
  const thumbnailUrl = useConstructUrl(data.thumbnailKey ?? '');
  const t = await getTranslations('AdminLessonPreview.preview');

  if (!data.videoKey) {
    return (
      <div className='bg-muted flex aspect-video flex-col items-center justify-center rounded-lg'>
        <BookIcon className='text-primary mx-auto mb-4 size-16' />
        <p className='text-muted-foreground'>{t('noVideo')}</p>
      </div>
    );
  }

  return (
    <div className='relative aspect-video overflow-hidden rounded-lg bg-black'>
      <Player src={videoUrl} coverSrc={thumbnailUrl} />
    </div>
  );
}

export default async function AdminLessonPreviewPage({
  params,
}: AdminLessonPreviewProps) {
  const { lessonId } = await params;
  await requireAdmin();

  const [lessonData, comments, t] = await Promise.all([
    adminGetLessonContent(lessonId),
    getComments(lessonId),
    getTranslations('AdminLessonPreview.comments'),
  ]);

  return (
    <div className='p-6'>
      <div className='space-y-6'>
        <LessonPreview data={lessonData} />

        <div>
          <h1 className='text-3xl font-bold'>{lessonData.title}</h1>
          {lessonData.description && (
            <div className='mt-2'>
              <RenderDescription json={JSON.parse(lessonData.description)} />
            </div>
          )}
        </div>
        <div className='mt-8 flex-grow overflow-y-auto border-t pt-6'>
          <h2 className='mb-4 text-2xl font-bold'>
            {t('title', { count: comments.length })}
          </h2>
          <div className='space-y-6'>
            <CommentForm lessonId={lessonData.id} />
            <CommentList comments={comments} lessonId={lessonData.id} />
          </div>
        </div>
      </div>
    </div>
  );
}