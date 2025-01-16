import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { KimikastQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { CommentsApi } from '@/services/api/default/Comments.api';
import { Comment } from '@/types/entities/Comment.type';

interface UseCommentsReturn {
  comments: Comment[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

interface UseCommentsParams {
  slug: string;
  onMutateSuccess?: () => void;
}

type UseComments = (params: UseCommentsParams) => UseCommentsReturn;

export const getCommentsQueryHookParams = ({
  slug,
}: {
  slug: string;
}): UseSuspenseQueryOptions<Comment[], Error, Comment[], string[]> => ({
  queryKey: [KimikastQueryKeys.COMMENTS, slug],
  queryFn: () => CommentsApi.findAll(slug),
});

export const useComments: UseComments = ({ slug }) => {
  const {
    data: comments,
    isError,
    isLoading,
    isSuccess,
  } = useSuspenseQuery({
    ...getCommentsQueryHookParams({ slug }),
  });

  return {
    comments,
    isError,
    isLoading,
    isSuccess,
  };
};
