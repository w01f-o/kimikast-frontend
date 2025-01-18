'use client';

import { useInfiniteAnimeUpdates } from '@/entities/anime';
import { AnimeListLoader, Col, Container, PageHeading, Row } from '@/shared/ui';
import { AnimeList } from '@/widgets/anime';
import { FC } from 'react';

export const HomePage: FC = () => {
  const { animes, isFetchingNextPage, ref } = useInfiniteAnimeUpdates();

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Свежее</PageHeading>
        </Col>
        {animes?.pages.map(page => (
          <AnimeList key={page.pagination.currentPage} list={page.list} />
        ))}
        {isFetchingNextPage && <AnimeListLoader length={24} />}
        <div ref={ref} className="h-10 w-full" />
      </Row>
    </Container>
  );
};
