"use client";

import { FC, useMemo } from "react";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import { FolderHeart, TvMinimalPlay } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import { StatusEnum } from "@/types/entities/Title.type";
import { getTitlesList } from "@/services/api/anilibria/getTitlesList";
import TitleList from "@/components/widgets/Title/TitleList";
import {
  ANILIBRIA_IMAGE_URL,
  anilibriaApi,
} from "@/services/api/anilibria/Anilibria.api";
import { Dropdown, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { DropdownTrigger } from "@nextui-org/react";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { listsApi } from "@/services/api/main/Lists.api";
import { defaultCollectionNames } from "@/components/entities/Collection";
import { Spinner } from "@nextui-org/spinner";

interface TitleProps {
  slug: string;
}

const TitlePage: FC<TitleProps> = ({ slug }) => {
  const { data } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  const franchiseSlugList = data.franchises
    .map(({ releases }) =>
      releases
        .map((release) => release.code)
        .filter((slug) => slug !== data.code),
    )
    .flat();

  const { data: franchise, isSuccess: franchiseIsSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.TITLE_LIST, franchiseSlugList],
    queryFn: () => getTitlesList({ code_list: franchiseSlugList }),
    enabled: franchiseSlugList.length > 0,
  });

  const {
    data: lists,
    isSuccess: listsIsSuccess,
    isLoading: listsIsLoading,
    refetch: refetchLists,
  } = useQuery({
    queryKey: [KimikastQueryKeys.LISTS],
    queryFn: listsApi.findAll,
  });

  const { mutate } = useMutation({
    mutationKey: [KimikastQueryKeys.LISTS],
    mutationFn: ({
      listId,
      type,
    }: {
      listId: string;
      type: "add" | "remove";
    }) => {
      switch (type) {
        case "add":
          return listsApi.addAnime(listId, { anilibriaSlug: data.code });
        case "remove":
          return listsApi.removeAnime(listId, { anilibriaSlug: data.code });
      }
    },
    onSuccess() {
      refetchLists();
    },
  });

  const addAnimeClickHandler = (listId: string) => () => {
    const isAnimeInList = lists!
      .find((list) => list.id === listId)
      ?.animes.some((anime) => anime.anilibriaSlug === data.code);

    mutate({
      listId,
      type: isAnimeInList ? "remove" : "add",
    });
  };

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
              {listsIsLoading && <Spinner />}
              {listsIsSuccess && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly endContent={<FolderHeart />} />
                  </DropdownTrigger>
                  <DropdownMenu
                    closeOnSelect={false}
                    selectionMode={"multiple"}
                    selectedKeys={lists
                      .filter((list) =>
                        list.animes.find((a) => a.anilibriaSlug === data.code),
                      )
                      .map((list) => list.id)}
                  >
                    {lists.map((list) => (
                      <DropdownItem
                        key={list.id}
                        onClick={addAnimeClickHandler(list.id)}
                      >
                        {
                          defaultCollectionNames[
                            list.name as keyof typeof defaultCollectionNames
                          ]
                        }
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
        </Col>
        {franchiseIsSuccess && (
          <Col xs={12}>
            <h2 className="text-3xl text-center pt-8 mb-3">Связанное</h2>
            <Row className="flex gap-4 mb-8">
              <TitleList list={franchise} />
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default TitlePage;
