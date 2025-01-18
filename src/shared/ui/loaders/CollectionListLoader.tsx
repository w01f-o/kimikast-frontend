import { Col } from '@/shared/ui';
import { Skeleton } from '@heroui/skeleton';
import { FC } from 'react';

export const CollectionListLoader: FC = () => {
  return Array.from({ length: 12 }).map((_, i) => (
    <Col xs={2} key={i}>
      <Skeleton className="mb-6 h-[150px] rounded-2xl" />
    </Col>
  ));
};
