'use client';

import { FC, useMemo } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { useQuery } from '@tanstack/react-query';
import { KimikastQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { Skeleton } from '@nextui-org/skeleton';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import TitleListLoader from '@/components/shared/UI/Loaders/TitleListLoader';
import TitleList from '@/components/widgets/Title/TitleList';
import { defaultCollectionNames } from '@/components/entities/Collection';
import PageHeading from '@/components/shared/UI/Text/PageHeading';
import { ListsApi } from '@/services/api/default/Lists.api';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';

interface ListPageProps {
  collectionId: string;
}

const CollectionPage: FC<ListPageProps> = ({ collectionId }) => {
  const {
    data: list,
    isLoading: listIsLoading,
    isSuccess: listIsSuccess,
  } = useQuery({
    queryKey: [KimikastQueryKeys.LIST, collectionId],
    queryFn: () => ListsApi.findById(collectionId),
  });

  const titleSlugs = useMemo(
    () => list?.animes.map(({ anilibriaSlug }) => anilibriaSlug),
    [list]
  );

  const {
    data: titles,
    isLoading: titlesIsLoading,
    isSuccess: titlesIsSuccess,
  } = useQuery({
    queryKey: [AnilibriaQueryKeys.TITLE_LIST, titleSlugs],
    queryFn: () => AnilibriaApi.getTitlesList({ codeList: titleSlugs }),
    enabled: !!titleSlugs?.length,
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
                  list.name as keyof typeof defaultCollectionNames
                ]
              }
            </PageHeading>
          )}
        </Col>
      </Row>
      <Row>
        {titlesIsLoading && <TitleListLoader />}
        {titlesIsSuccess && <TitleList list={titles} />}
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
