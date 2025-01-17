import { FC } from 'react';
import Col from '@/components/shared/layout/Col';
import Row from '@/components/shared/layout/Row';
import AnimeList from '@/components/widgets/anime/AnimeList';
import { useAnime } from '@/hooks/api/anilibria/useAnime';
import { useAnimeList } from '@/hooks/api/anilibria/useAnimeList';

interface TitleFranchiseProps {
  slug: string;
}

const AnimeFranchise: FC<TitleFranchiseProps> = ({ slug }) => {
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

export default AnimeFranchise;
