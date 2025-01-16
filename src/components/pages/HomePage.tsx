'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import AnimeListLoader from '@/components/shared/ui/loaders/AnimeListLoader';
import AnimeList from '@/components/widgets/anime/AnimeList';
import PageHeading from '@/components/shared/ui/text/PageHeading';
import { useInfiniteAnimeUpdates } from '@/hooks/api/anilibria/useInfiniteAnimeUpdates';

const HomePage: FC = () => {
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
        <div ref={ref} className="h-10 w-full"></div>
      </Row>
    </Container>
  );
};

export default HomePage;
