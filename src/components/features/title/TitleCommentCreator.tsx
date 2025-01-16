import { FC, KeyboardEvent } from 'react';
import Col from '@/components/shared/layout/Col';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { MessageSquarePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Comment } from '@/types/entities/Comment.type';
import { useParams } from 'next/navigation';
import { useMutateComments } from '@/hooks/api/useMutateComments';
import { useComments } from '@/hooks/api/useComments';

const TitleCommentCreator: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<Comment, 'content'>>();

  const slug = useParams().slug as string;

  const { comments } = useComments({ slug });

  const { mutate, isPending } = useMutateComments({
    slug,
    onSuccess: () => {
      reset();
      if (!comments.length) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    },
  });

  const commentSubmitHandler = (data: Pick<Comment, 'content'>) => {
    mutate({ dto: { content: data.content, anilibriaSlug: slug } });
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(commentSubmitHandler)();
    }
  };

  return (
    <Col xs={12}>
      <form
        onSubmit={handleSubmit(commentSubmitHandler)}
        className="mb-8 flex items-center gap-12"
        onKeyDown={keyDownHandler}
      >
        <Textarea
          label="Новый комментарий"
          {...register('content', {
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
