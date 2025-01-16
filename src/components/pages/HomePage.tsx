'use client';

import { FC, useEffect } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { useIntersectionObserver } from 'usehooks-ts';
import AnimeListLoader from '@/components/shared/ui/loaders/AnimeListLoader';
import AnimeList from '@/components/widgets/anime/AnimeList';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import PageHeading from '@/components/shared/ui/text/PageHeading';

const HomePage: FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [AnilibriaQueryKeys.UPDATES],
      queryFn: ({ pageParam }) =>
        AnilibriaApi.getAnimeUpdates({ page: pageParam, itemsPerPage: 24 }),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage?.pagination?.currentPage + 1 || undefined,
      getPreviousPageParam: firstPage =>
        firstPage?.pagination?.currentPage - 1 || undefined,
    });

  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Свежее</PageHeading>
        </Col>
        {data?.pages.map(page => (
          <AnimeList key={page.pagination.currentPage} list={page.list} />
        ))}
        {isFetchingNextPage && <AnimeListLoader length={24} />}
        <div ref={ref} className="h-10 w-full"></div>
      </Row>
    </Container>
  );
};

export default HomePage;
