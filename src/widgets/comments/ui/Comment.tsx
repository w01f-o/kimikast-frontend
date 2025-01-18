import { Comment as CommentType } from '@/entities/comment';
import { useAuth } from '@/shared/lib';
import { RoutePaths } from '@/shared/router';
import { Avatar } from '@heroui/avatar';
import { Card, CardBody } from '@heroui/card';
import NextLink from 'next/link';
import { FC, memo } from 'react';

interface CommentProps {
  item: CommentType;
}

export const Comment: FC<CommentProps> = memo(
  ({ item: { createdAt, content, user } }) => {
    const auth = useAuth();

    return (
      <Card>
        <CardBody className="relative flex flex-row items-center gap-6 px-4 py-4">
          <Avatar
            src={`${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/avatar/${user.avatar}`}
            as={NextLink}
            href={`${RoutePaths.PROFILE}/@${user.name}`}
            className=""
            title={user.name}
            isBordered={auth.user?.name === user.name}
            color={auth.user?.name === user.name ? 'primary' : 'default'}
          />
          <div className="max-w-[85%] flex-grow">{content}</div>
          <div className="absolute right-3 top-3 text-sm opacity-85">
            {new Intl.DateTimeFormat('ru-ru').format(new Date(createdAt))}
          </div>
        </CardBody>
      </Card>
    );
  }
);

Comment.displayName = 'Comment';
