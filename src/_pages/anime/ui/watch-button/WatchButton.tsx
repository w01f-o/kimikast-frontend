'use client';

import { useProgress } from '@/entities/user';
import { AnimeInUserList } from '@/features/anime';
import { useAuth } from '@/shared/lib';
import { RoutePaths } from '@/shared/router';
import { Button } from '@heroui/button';
import { TvMinimalPlay } from 'lucide-react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';

export const WatchButton: FC = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { progress, fetch } = useProgress();

  useEffect(() => {
    if (user) {
      fetch();
    }
  }, [fetch, user]);

  return (
    <div className="flex items-center gap-4">
      <Button
        as={NextLink}
        href={`${RoutePaths.WATCH}/${slug}`}
        endContent={<TvMinimalPlay />}
        color={'primary'}
        size={'lg'}
      >
        {progress
          ? `Продолжить смотреть (Эпизод ${progress.currentEpisode})`
          : 'Смотреть'}
      </Button>
      {user && <AnimeInUserList />}
    </div>
  );
};
