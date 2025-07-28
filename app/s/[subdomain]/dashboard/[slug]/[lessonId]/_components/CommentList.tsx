import { CommentWithUserAndReplies } from '../comment-actions';
import { CommentItem } from './CommentItem';
interface CommentListProps {
  comments: CommentWithUserAndReplies[];
  lessonId: string;
}
export function CommentList({ comments, lessonId }: CommentListProps) {
  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} lessonId={lessonId} />
      ))}
    </div>
  );
}
