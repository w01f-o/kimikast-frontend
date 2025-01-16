import { FC, memo } from 'react';
import { Comment as CommentType } from '@/types/entities/Comment.type';
import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import NextLink from 'next/link';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { useAuth } from '@/hooks/useAuth';

interface CommentProps {
  item: CommentType;
}

const Comment: FC<CommentProps> = ({ item: { createdAt, content, user } }) => {
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
};

export default memo(Comment);
