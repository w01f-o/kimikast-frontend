import { FC } from "react";
import Col from "@/components/shared/layout/Col";
import Row from "@/components/shared/layout/Row";
import TitleCommentCreator from "@/components/features/title/TitleCommentCreator";
import Comment from "@/components/entities/Comment";
import { useComments } from "@/hooks/api/useComments";

interface TitleCommentsProps {
  slug: string;
}

const TitleComments: FC<TitleCommentsProps> = ({ slug }) => {
  const { comments } = useComments({ slug });

  return (
    <>
      <Col xs={12}>
        <h3 className="text-3xl text-center pt-8 mb-6">Комментарии</h3>
      </Col>
      <TitleCommentCreator />
      <Col xs={12}>
        <Row>
          {comments.map((item) => (
            <Col xs={12} key={item.id} className="mb-4">
              <Comment item={item} />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};

export default TitleComments;
