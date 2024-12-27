import { FC } from "react";
import Col from "@/components/shared/layout/Col";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { MessageSquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Comment } from "@/types/entities/Comment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { CreateCommentDto } from "@/types/dto/createComment.dto";
import { commentsApi } from "@/services/api/main/Comments.api";
import { useParams } from "next/navigation";

const TitleCommentCreator: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<Comment, "content">>();

  const queryClient = useQueryClient();

  const slug = useParams().slug as string;

  const { mutate: mutateComment, isPending: mutateCommentIsPending } =
    useMutation({
      mutationFn: ({ dto }: { dto: CreateCommentDto }) =>
        commentsApi.createComment(dto),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [KimikastQueryKeys.COMMENTS, slug],
        });
        reset();
      },
    });

  const commentSubmitHandler = (data: Pick<Comment, "content">) => {
    mutateComment({ dto: { content: data.content, anilibriaSlug: slug } });
  };

  return (
    <Col xs={12}>
      <form
        onSubmit={handleSubmit(commentSubmitHandler)}
        className="flex gap-12 items-center mb-8"
      >
        <Textarea
          label="Новый комментарий"
          {...register("content", {
            required: true,
          })}
          isInvalid={!!errors.content}
        />
        <Button isIconOnly type="submit" isLoading={mutateCommentIsPending}>
          <MessageSquarePlus />
        </Button>
      </form>
    </Col>
  );
};

export default TitleCommentCreator;
