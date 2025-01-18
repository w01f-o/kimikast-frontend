import { useComments } from '@/entities/comment';
import { AnimeCommentCreator } from '@/features/anime';
import { Col, Row } from '@/shared/ui';
import { Comment } from '@/widgets/comments/ui';
import { FC } from 'react';

interface TitleCommentsProps {
  slug: string;
}

export const TitleComments: FC<TitleCommentsProps> = ({ slug }) => {
  const { comments } = useComments({ slug });

  return (
    <>
      <Col xs={12}>
        <h3 className="mb-6 pt-8 text-center text-3xl">Комментарии</h3>
      </Col>
      <AnimeCommentCreator />
      <Col xs={12}>
        <Row>
          {comments.map(item => (
            <Col xs={12} key={item.id} className="mb-4">
              <Comment item={item} />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};
