import { FC } from 'react';
import { List } from '@/types/entities/List.type';
import Collection from '@/components/entities/Collection';
import Col from '@/components/shared/layout/Col';

interface UserListCollectionProps {
  lists: List[];
}

const CollectionList: FC<UserListCollectionProps> = ({ lists }) => {
  return lists.map(list => (
    <Col xs={2} key={list.id}>
      <Collection item={list} />
    </Col>
  ));
};

export default CollectionList;
