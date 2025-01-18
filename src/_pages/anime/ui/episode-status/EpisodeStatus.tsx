'use client';

import { StatusEnum, useAnime } from '@/entities/anime';
import { Chip } from '@heroui/chip';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';

export const EpisodeStatus: FC = () => {
  const { slug } = useParams();
  const {
    anime: {
      status: { string, code },
    },
  } = useAnime({ code: String(slug) });

  const colorByStatus = useMemo(() => {
    switch (code) {
      case StatusEnum.FINISHED:
        return 'success';
      case StatusEnum.ONGOING:
        return 'primary';
      default:
        return 'default';
    }
  }, [code]);

  return (
    <div className="mb-4 flex items-center gap-2">
      Статус: <Chip color={colorByStatus}>{string}</Chip>
    </div>
  );
};
