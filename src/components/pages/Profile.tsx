'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import { Image } from '@nextui-org/image';
import NextImage from 'next/image';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { UserApi } from '@/services/api/default/User.api';
import { Avatar } from '@nextui-org/avatar';

interface ProfileProps {
  name: string;
}

const Profile: FC<ProfileProps> = ({ name }) => {
  const { data } = useSuspenseQuery({
    queryKey: [DefaultQueryKeys.PUBLIC_USER, name],
    queryFn: () => UserApi.findPublic(name),
  });

  return (
    <div className="relative pt-4">
      <Image
        as={NextImage}
        src={'/kimikast/banner.gif'}
        width={1920}
        height={500}
        alt={'banner'}
        className="rounded-none border-y-1 border-default object-cover blur-[1px]"
        draggable={false}
        unoptimized
      />
      <Container className="absolute bottom-0 left-1/2 top-0 z-20 -translate-x-1/2">
        <Row className="h-full items-end">
          <Col xs={3}>
            <div className="flex items-center gap-4 pb-8 pl-20">
              <Avatar
                src={`${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/avatar/${data.avatar}`}
                size="lg"
                isBordered
                color={'primary'}
              />
              <div className="text-2xl font-bold">{data.name}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
