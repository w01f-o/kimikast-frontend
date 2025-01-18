import type { Comment } from '@/entities/comment';
import { useComments, useMutateComments } from '@/entities/comment';
import { Col } from '@/shared/ui';
import { Button } from '@heroui/button';
import { Textarea } from '@heroui/input';
import { MessageSquarePlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

export const AnimeCommentCreator: FC = () => {
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
      if (comments.length < 5) {
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
