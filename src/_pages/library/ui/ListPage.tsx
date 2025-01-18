'use client';

import { useAnimeList } from '@/entities/anime';
import { defaultCollectionNames, useUserListById } from '@/entities/user-list';
import { AnimeListLoader, Col, Container, PageHeading, Row } from '@/shared/ui';
import { AnimeList } from '@/widgets/anime';
import { Skeleton } from '@heroui/skeleton';
import { FC } from 'react';

interface ListPageProps {
  id: string;
}

export const ListPage: FC<ListPageProps> = ({ id }) => {
  const {
    list,
    isLoading: listIsLoading,
    isSuccess: listIsSuccess,
  } = useUserListById({ id });

  const titleSlugs = list?.animes.map(({ anilibriaSlug }) => anilibriaSlug);

  const {
    animes,
    isLoading: animesIsLoading,
    isSuccess: animesIsSuccess,
  } = useAnimeList({
    apiParams: { codeList: titleSlugs },
    hookParams: {
      enabled: !!titleSlugs?.length,
    },
  });

  return (
    <Container>
      <Row className="pb-6 pt-8">
        <Col xs={4}>
          {listIsLoading && <Skeleton className="h-10 rounded-xl" />}
          {listIsSuccess && (
            <PageHeading>
              {
                defaultCollectionNames[
                  list!.name as keyof typeof defaultCollectionNames
                ]
              }
            </PageHeading>
          )}
        </Col>
      </Row>
      <Row>
        {animesIsLoading && <AnimeListLoader />}
        {animesIsSuccess && <AnimeList list={animes!} />}
        {listIsSuccess && !titleSlugs?.length && (
          <Col xs={12}>
            <div className="pt-6 text-center text-2xl">Список пуст</div>
          </Col>
        )}
      </Row>
    </Container>
  );
};
