import { FC } from 'react';
import Col from '@/components/shared/layout/Col';
import { Skeleton } from '@heroui/skeleton';

interface TitleListLoaderProps {
  length?: number;
}

const AnimeListLoader: FC<TitleListLoaderProps> = ({ length }) => {
  return Array.from({ length: length ?? 12 }).map((_, i) => (
    <Col xs={2} key={i}>
      <Skeleton className="mb-6 h-[350px] rounded-2xl" />
    </Col>
  ));
};

export default AnimeListLoader;
