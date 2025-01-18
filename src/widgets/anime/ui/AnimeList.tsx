import type { Anime as TitleType } from '@/entities/anime';
import { Col } from '@/shared/ui';
import { Anime } from '@/widgets/anime/ui';
import { FC } from 'react';

interface TitleListProps {
  list: TitleType[];
}

export const AnimeList: FC<TitleListProps> = ({ list }) => {
  return list.map(title => (
    <Col xs={2} className="mb-6" key={title.id}>
      <Anime title={title} />
    </Col>
  ));
};
