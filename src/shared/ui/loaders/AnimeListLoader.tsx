import { Col } from '@/shared/ui';
import { Skeleton } from '@heroui/skeleton';
import { FC } from 'react';

interface TitleListLoaderProps {
  length?: number;
}

export const AnimeListLoader: FC<TitleListLoaderProps> = ({ length }) => {
  return Array.from({ length: length ?? 12 }).map((_, i) => (
    <Col xs={2} key={i}>
      <Skeleton className="mb-6 h-[350px] rounded-2xl" />
    </Col>
  ));
};
