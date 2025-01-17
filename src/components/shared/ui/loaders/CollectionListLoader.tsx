import { FC } from 'react';
import { Skeleton } from '@heroui/skeleton';
import Col from '@/components/shared/layout/Col';

const CollectionListLoader: FC = () => {
  return Array.from({ length: 12 }).map((_, i) => (
    <Col xs={2} key={i}>
      <Skeleton className="mb-6 h-[150px] rounded-2xl" />
    </Col>
  ));
};

export default CollectionListLoader;
