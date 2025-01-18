import { useAnime, useAnimeList } from '@/entities/anime';
import { Col, Row } from '@/shared/ui';
import { AnimeList } from '@/widgets/anime';
import { FC } from 'react';

interface TitleFranchiseProps {
  slug: string;
}

export const AnimeFranchise: FC<TitleFranchiseProps> = ({ slug }) => {
  const { anime } = useAnime({ code: slug });

  const franchiseSlugList = anime.franchises
    .map(({ releases }) =>
      releases.map(release => release.code).filter(slug => slug !== anime.code)
    )
    .flat();

  const { isSuccess, animes } = useAnimeList({
    apiParams: { codeList: franchiseSlugList },
    hookParams: {
      enabled: !!franchiseSlugList.length,
    },
  });

  return (
    isSuccess && (
      <Col xs={12}>
        <h2 className="mb-6 pt-8 text-center text-3xl">Связанное</h2>
        <Row className="mb-12">
          <AnimeList list={animes!} />
        </Row>
      </Col>
    )
  );
};
