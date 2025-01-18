import { Comment, CommentsApi } from '@/entities/comment';
import { DefaultQueryKeys } from '@/shared/model';
import { UseSuspenseQueryOptions } from '@tanstack/react-query';

export const getCommentsQueryHookParams = ({
  slug,
}: {
  slug: string;
}): UseSuspenseQueryOptions<Comment[], Error, Comment[], string[]> => ({
  queryKey: [DefaultQueryKeys.COMMENTS, slug],
  queryFn: () => CommentsApi.findAll(slug),
});
