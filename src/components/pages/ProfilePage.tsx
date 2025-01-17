'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import { Image } from '@nextui-org/image';
import NextImage from 'next/image';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { Avatar } from '@nextui-org/avatar';
import { usePublicUser } from '@/hooks/api/usePublicUser';

interface ProfileProps {
  name: string;
}

const ProfilePage: FC<ProfileProps> = ({ name }) => {
  const { user } = usePublicUser({ name });

  return (
    <div className="relative pt-4">
      <Image
        as={NextImage}
        src={'/kimikast/banner.gif'}
        priority
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
                src={`${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/avatar/${user.avatar}`}
                size="lg"
                isBordered
                color={'primary'}
              />
              <div className="text-2xl font-bold">{user.name}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
