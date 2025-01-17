'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { Skeleton } from '@heroui/skeleton';
import AnimeListLoader from '@/components/shared/ui/loaders/AnimeListLoader';
import AnimeList from '@/components/widgets/anime/AnimeList';
import { defaultCollectionNames } from '@/components/entities/UserList';
import PageHeading from '@/components/shared/ui/text/PageHeading';
import { useList } from '@/hooks/api/anilibria/useList';
import { useAnimeList } from '@/hooks/api/anilibria/useAnimeList';

interface ListPageProps {
  id: string;
}

const ListPage: FC<ListPageProps> = ({ id }) => {
  const {
    list,
    isLoading: listIsLoading,
    isSuccess: listIsSuccess,
  } = useList({ id });

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

export default ListPage;
