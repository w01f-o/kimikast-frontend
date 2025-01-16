'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { Skeleton } from '@nextui-org/skeleton';
import TitleListLoader from '@/components/shared/UI/Loaders/TitleListLoader';
import TitleList from '@/components/widgets/Title/TitleList';
import { defaultCollectionNames } from '@/components/entities/Collection';
import PageHeading from '@/components/shared/UI/Text/PageHeading';
import { useList } from '@/hooks/api/anilibria/useList';
import { useAnimeList } from '@/hooks/api/anilibria/useAnimeList';

interface ListPageProps {
  collectionId: string;
}

const CollectionPage: FC<ListPageProps> = ({ collectionId }) => {
  const {
    list,
    isLoading: listIsLoading,
    isSuccess: listIsSuccess,
  } = useList({ id: collectionId });

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
        {animesIsLoading && <TitleListLoader />}
        {animesIsSuccess && <TitleList list={animes!} />}
        {listIsSuccess && !titleSlugs?.length && (
          <Col xs={12}>
            <div className="pt-6 text-center text-2xl">Список пуст</div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CollectionPage;
