"use client";

import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { useSuspenseQuery } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { userApi } from "@/services/api/main/User.api";
import { Avatar } from "@nextui-org/avatar";

interface ProfileProps {
  name: string;
}

const Profile: FC<ProfileProps> = ({ name }) => {
  const { data } = useSuspenseQuery({
    queryKey: [KimikastQueryKeys.PUBLIC_USER, name],
    queryFn: () => userApi.getPublicUser(name),
  });

  return (
    <div className="relative pt-4">
      <Image
        as={NextImage}
        src={"/kimikast/banner.gif"}
        width={1920}
        height={500}
        alt={"banner"}
        className="object-cover rounded-none border-y-1 border-default blur-[1px]"
        draggable={false}
        unoptimized
      />
      <Container className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20">
        <Row className="items-end h-full">
          <Col xs={3}>
            <div className="pl-20 pb-8 flex gap-4 items-center">
              <Avatar
                src={`${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/avatar/${data.avatar}`}
                size="lg"
                isBordered
                color={"primary"}
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
