import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { commentsApi } from "@/services/api/main/Comments.api";
import { CreateCommentDto } from "@/types/dto/createComment.dto";

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
  params: UseMutateCommentsParams,
) => UseMutateCommentsReturn;

export const useMutateComments: UseMutateComments = (params) => {
  const { slug } = params;

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ dto }: { dto: CreateCommentDto }) =>
      commentsApi.createComment(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [KimikastQueryKeys.COMMENTS, slug],
      });

      params.onSuccess?.();
    },
  });

  return {
    mutate,
    isError,

    isPending,
    isSuccess,
  };
};
