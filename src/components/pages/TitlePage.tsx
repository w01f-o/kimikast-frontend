'use client';

import { FC, useMemo } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { Image } from '@nextui-org/image';
import NextImage from 'next/image';
import { Button } from '@nextui-org/button';
import NextLink from 'next/link';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { TvMinimalPlay } from 'lucide-react';
import { Chip } from '@nextui-org/chip';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import TitleComments from '@/components/widgets/Title/Comments/TitleComments';
import TitleFranchise from '@/components/widgets/Title/TitleFranchise';
import TitleInCollections from '@/components/features/title/TitleInCollections';
import { useAuth } from '@/hooks/useAuth';
import { StatusEnum } from '@/types/anilibria/entities/Title.type';
import { useAnime } from '@/hooks/api/anilibria/useAnime';

interface TitleProps {
  slug: string;
}

const TitlePage: FC<TitleProps> = ({ slug }) => {
  const { anime } = useAnime({ code: slug });

  const { user } = useAuth();

  const colorByStatus = useMemo(() => {
    switch (anime.status.code) {
      case StatusEnum.FINISHED:
        return 'success';
      case StatusEnum.ONGOING:
        return 'primary';
      default:
        return 'default';
    }
  }, [anime.status.code]);

  return (
    <Container>
      <Row className="pt-12">
        <Col xs={5} className="flex items-center justify-center">
          <Image
            as={NextImage}
            src={`${AnilibriaApi.IMAGE_URL}${anime.posters.original.url}`}
            width={455}
            height={650}
            alt={anime.code}
            priority
          />
        </Col>
        <Col xs={7} className="flex items-center">
          <div className="pr-32">
            <h1 className="mb-6 text-6xl font-bold">{anime.names.ru}</h1>
            <div className="mb-4 leading-7">{anime.description}</div>
            <div className="mb-4 flex items-center gap-2">
              Количество эпизодов:
              <Chip>{anime.type.episodes ?? anime.player.list.length}</Chip>
            </div>
            <div className="mb-4 flex items-center gap-2">
              Статус: <Chip color={colorByStatus}>{anime.status.string}</Chip>
            </div>
            <div className="mb-8 flex items-center gap-2">
              <div>Жанры:</div>
              <div className="flex flex-wrap gap-3">
                {anime.genres.map(genre => (
                  <Chip key={genre}>{genre}</Chip>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                as={NextLink}
                href={`${RoutePaths.WATCH}/${slug}`}
                endContent={<TvMinimalPlay />}
                color={'primary'}
                size={'lg'}
              >
                Смотреть
              </Button>
              {user && <TitleInCollections />}
            </div>
          </div>
        </Col>
        <TitleFranchise slug={slug} />
        <TitleComments slug={slug} />
      </Row>
    </Container>
  );
};

export default TitlePage;
