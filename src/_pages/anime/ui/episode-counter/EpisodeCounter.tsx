'use client';

import { useAnime } from '@/entities/anime';
import { Chip } from '@heroui/chip';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const EpisodeCounter: FC = () => {
  const { slug } = useParams();
  const {
    anime: {
      type: { episodes },
      player: { list },
    },
  } = useAnime({ code: String(slug) });

  return (
    <div className="mb-4 flex items-center gap-2">
      Количество эпизодов:
      <Chip>{episodes ?? list.length}</Chip>
    </div>
  );
};
