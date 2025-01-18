import { FC } from 'react';
import { UserList } from '@/entities/user-list/model/List.type';
import { Card, CardBody } from '@heroui/card';
import Link from 'next/link';
import { RoutePaths } from '@/shared/router/RoutePaths.enum';
import { Chip } from '@heroui/chip';
import { defaultCollectionNames } from '../../../entities/user-list/config';

interface UserListProps {
  item: UserList;
}

export const UserListItem: FC<UserListProps> = ({ item }) => {
  return (
    <Card
      as={Link}
      href={`${RoutePaths.LIBRARY}/${item.id}`}
      isHoverable
      className="h-[150px]"
    >
      <CardBody>
        <div className="flex h-full items-end px-2 py-4">
          <div className="flex items-center gap-2">
            <div>
              {defaultCollectionNames[
                item.name as keyof typeof defaultCollectionNames
              ] ?? item.name}
            </div>
            <Chip>{item.animes.length}</Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
