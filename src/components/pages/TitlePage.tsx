"use client";

import { FC, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { ANILIBRIA_IMAGE_URL, getTitle } from "@/services/api/anilibria";
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
import { getTitlesList } from "@/services/api/anilibria/getTitlesList";
import TitleList from "@/components/widgets/Title/TitleList";

interface TitleProps {
  slug: string;
}

const TitlePage: FC<TitleProps> = ({ slug }) => {
  const { data } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => getTitle({ code: slug }),
  });

  const franchiseSlugList = data.franchises
    .map(({ releases }) =>
      releases
        .map((release) => release.code)
        .filter((slug) => slug !== data.code),
    )
    .flat();

  const { data: franchise } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE_LIST, franchiseSlugList],
    queryFn: () => getTitlesList({ code_list: franchiseSlugList }),
  });

  const colorByStatus = useMemo(() => {
    switch (data.status.code) {
      case StatusEnum.FINISHED:
        return "success";
      case StatusEnum.ONGOING:
        return "primary";
      default:
        return "default";
    }
  }, [data.status.code]);

  return (
    <Container>
      <Row className="pt-12">
        <Col xs={5} className="flex justify-center items-center">
          <Image
            as={NextImage}
            src={`${ANILIBRIA_IMAGE_URL}${data.posters.original.url}`}
            width={455}
            height={650}
            alt={data.code}
            priority
          />
        </Col>
        <Col xs={7} className="flex items-center">
          <div className="pr-32">
            <h1 className="text-6xl font-bold mb-6">{data.names.ru}</h1>
            <div className="leading-7 mb-4">{data.description}</div>
            <div className="mb-4 flex gap-2 items-center">
              Количество эпизодов:
              {/*TODO: Add types for player.list*/}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              <Chip>{data.type.episodes ?? data.player.list.length}</Chip>
            </div>
            <div className="mb-4 flex gap-2 items-center">
              Статус: <Chip color={colorByStatus}>{data.status.string}</Chip>
            </div>
            <div className="mb-8 flex gap-2 items-center">
              <div>Жанры:</div>
              <div className="flex flex-wrap gap-3">
                {data.genres.map((genre) => (
                  <Chip key={genre}>{genre}</Chip>
                ))}
              </div>
            </div>
            <Button
              as={NextLink}
              href={`${RoutePaths.WATCH}/${slug}`}
              endContent={<TvMinimalPlay />}
              color={"primary"}
              size={"lg"}
              className=""
            >
              Смотреть
            </Button>
          </div>
        </Col>
        <Col xs={12}>
          <h2 className="text-3xl text-center pt-8 mb-3">Связанное</h2>
          <div className="flex gap-4 mb-8">
            <TitleList list={franchise} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TitlePage;
