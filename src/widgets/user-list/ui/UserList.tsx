import type { UserList as UserListType } from '@/entities/user-list';
import { Col } from '@/shared/ui';
import { UserListItem } from '@/widgets/user-list/ui';
import { FC } from 'react';

interface UserListCollectionProps {
  lists: UserListType[];
}

export const UserList: FC<UserListCollectionProps> = ({ lists }) => {
  return lists.map(list => (
    <Col xs={2} key={list.id}>
      <UserListItem item={list} />
    </Col>
  ));
};
