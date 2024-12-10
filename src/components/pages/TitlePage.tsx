"use client";

import { FC, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import { TvMinimalPlay } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import { StatusEnum } from "@/types/entities/Title.type";
import {
  ANILIBRIA_IMAGE_URL,
  anilibriaApi,
} from "@/services/api/anilibria/Anilibria.api";
import TitleComments from "@/components/widgets/Title/Comments/TitleComments";
import TitleFranchise from "@/components/widgets/Title/TitleFranchise";
import TitleInCollections from "@/components/features/title/TitleInCollections";

interface TitleProps {
  slug: string;
}

const TitlePage: FC<TitleProps> = ({ slug }) => {
  const { data: title } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  const colorByStatus = useMemo(() => {
    switch (title.status.code) {
      case StatusEnum.FINISHED:
        return "success";
      case StatusEnum.ONGOING:
        return "primary";
      default:
        return "default";
    }
  }, [title.status.code]);

  return (
    <Container>
      <Row className="pt-12">
        <Col xs={5} className="flex justify-center items-center">
          <Image
            as={NextImage}
            src={`${ANILIBRIA_IMAGE_URL}${title.posters.original.url}`}
            width={455}
            height={650}
            alt={title.code}
            priority
          />
        </Col>
        <Col xs={7} className="flex items-center">
          <div className="pr-32">
            <h1 className="text-6xl font-bold mb-6">{title.names.ru}</h1>
            <div className="leading-7 mb-4">{title.description}</div>
            <div className="mb-4 flex gap-2 items-center">
              Количество эпизодов:
              <Chip>{title.type.episodes ?? title.player.list.length}</Chip>
            </div>
            <div className="mb-4 flex gap-2 items-center">
              Статус: <Chip color={colorByStatus}>{title.status.string}</Chip>
            </div>
            <div className="mb-8 flex gap-2 items-center">
              <div>Жанры:</div>
              <div className="flex flex-wrap gap-3">
                {title.genres.map((genre) => (
                  <Chip key={genre}>{genre}</Chip>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                as={NextLink}
                href={`${RoutePaths.WATCH}/${slug}`}
                endContent={<TvMinimalPlay />}
                color={"primary"}
                size={"lg"}
              >
                Смотреть
              </Button>
              <TitleInCollections />
            </div>
          </div>
        </Col>
        <TitleFranchise slug={slug} />
        <TitleComments slug={slug} />
      </Row>
    </Container>
  );
};

export default TitlePage;
