import { FC } from 'react';
import Col from '@/components/shared/layout/Col';
import type { Anime as TitleType } from '@/types/anilibria/entities/Anime.type';
import Anime from '@/components/entities/Anime';

interface TitleListProps {
  list: TitleType[];
}

const AnimeList: FC<TitleListProps> = ({ list }) => {
  return list.map(title => (
    <Col xs={2} className="mb-6" key={title.id}>
      <Anime title={title} />
    </Col>
  ));
};

export default AnimeList;
