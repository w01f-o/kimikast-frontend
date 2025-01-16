import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { CreateCommentDto } from '@/types/dto/CreateComment.dto';
import { CommentsApi } from '@/services/api/default/Comments.api';
import toast from 'react-hot-toast';

interface UseMutateCommentsReturn {
  mutate: ({ dto }: { dto: CreateCommentDto }) => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface UseMutateCommentsParams {
  slug: string;
  onSuccess?: () => void;
}

type UseMutateComments = (
  params: UseMutateCommentsParams
) => UseMutateCommentsReturn;

export const useMutateComments: UseMutateComments = params => {
  const { slug } = params;

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ dto }: { dto: CreateCommentDto }) => CommentsApi.create(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [DefaultQueryKeys.COMMENTS, slug],
      });

      params.onSuccess?.();
    },
    onError() {
      toast.error('Произошла ошибка при создании комментария');
    },
  });

  return {
    mutate,
    isError,

    isPending,
    isSuccess,
  };
};
