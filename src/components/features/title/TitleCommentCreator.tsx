import { FC } from "react";
import Col from "@/components/shared/layout/Col";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { MessageSquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Comment } from "@/types/entities/Comment.type";
import { useParams } from "next/navigation";
import { useMutateComments } from "@/hooks/api/useMutateComments";

const TitleCommentCreator: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<Comment, "content">>();

  const slug = useParams().slug as string;

  const { mutate, isPending } = useMutateComments({
    slug,
    onSuccess: reset,
  });

  const commentSubmitHandler = (data: Pick<Comment, "content">) => {
    mutate({ dto: { content: data.content, anilibriaSlug: slug } });
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
        <Button isIconOnly type="submit" isLoading={isPending}>
          <MessageSquarePlus />
        </Button>
      </form>
    </Col>
  );
};

export default TitleCommentCreator;
