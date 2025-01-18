import { Comment, getCommentsQueryHookParams } from '@/entities/comment';
import { useSuspenseQuery } from '@tanstack/react-query';

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
