'use client';

import {
  EpisodeCounter,
  EpisodeStatus,
  Genres,
  WatchButton,
} from '@/_pages/anime/ui';
import { AnilibriaApi, useAnime } from '@/entities/anime';
import { Col, Container, Row } from '@/shared/ui';
import { AnimeFranchise } from '@/widgets/anime';
import { TitleComments } from '@/widgets/comments';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { FC } from 'react';

interface TitleProps {
  slug: string;
}

export const AnimePage: FC<TitleProps> = ({ slug }) => {
  const { anime } = useAnime({ code: slug });

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
            <EpisodeCounter />
            <EpisodeStatus />
            <Genres />
            <WatchButton />
          </div>
        </Col>
        <AnimeFranchise slug={slug} />
        <TitleComments slug={slug} />
      </Row>
    </Container>
  );
};
