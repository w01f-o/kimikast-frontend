import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { KimikastQueryKeys } from '@/enums/KimikastQueryKeys.enum';
import { commentsApi } from '@/services/api/main/Comments.api';
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
  queryFn: () => commentsApi.getComments(slug),
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
