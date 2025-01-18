'use client';

import { useAnime } from '@/entities/anime';
import { Chip } from '@heroui/chip';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const Genres: FC = () => {
  const { slug } = useParams();
  const {
    anime: { genres },
  } = useAnime({ code: String(slug) });

  return (
    <div className="mb-8 flex items-center gap-2">
      <div>Жанры:</div>
      <div className="flex flex-wrap gap-3">
        {genres.map(genre => (
          <Chip key={genre}>{genre}</Chip>
        ))}
      </div>
    </div>
  );
};
