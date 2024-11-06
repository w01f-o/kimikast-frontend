"use client";

import { FC } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { ANILIBRIA_IMAGE_URL, getTitle } from "@/services/api/anilibria";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import { TvMinimalPlay } from "lucide-react";

interface TitleProps {
  slug: string;
}

const TitlePage: FC<TitleProps> = ({ slug }) => {
  const { data } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE],
    queryFn: () => getTitle({ slug }),
  });

  return (
    <Container>
      <Row className="pt-12">
        <Col xs={5}>
          <div className="flex justify-center">
            <Image
              as={NextImage}
              src={`${ANILIBRIA_IMAGE_URL}${data.posters.original.url}`}
              width={455}
              height={650}
              alt={data.code}
              priority
            />
          </div>
        </Col>
        <Col xs={7}>
          <div className="py-8 pr-32">
            <h1 className="text-6xl font-bold mb-6">{data.names.ru}</h1>
            <div className="leading-7 mb-4">{data.description}</div>
            <Button
              as={Link}
              href={`${RoutePaths.WATCH}/${slug}`}
              endContent={<TvMinimalPlay />}
            >
              Смотреть
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TitlePage;
