import { FC } from 'react';
import Col from '@/components/shared/layout/Col';
import type { Title as TitleType } from '@/types/anilibria/entities/Title.type';
import Title from '@/components/entities/Title';

interface TitleListProps {
  list: TitleType[];
}

const TitleList: FC<TitleListProps> = ({ list }) => {
  return list.map(title => (
    <Col xs={2} className="mb-6" key={title.id}>
      <Title title={title} />
    </Col>
  ));
};

export default TitleList;
