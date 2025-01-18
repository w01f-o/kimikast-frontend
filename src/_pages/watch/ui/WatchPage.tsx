'use client';

import { useAnime } from '@/entities/anime';
import { useProgress } from '@/entities/user';
import { Player } from '@/widgets/player';
import { Spinner } from '@heroui/spinner';
import { FC, useEffect } from 'react';

interface WatchProps {
  slug: string;
  episode: string;
}

export const WatchPage: FC<WatchProps> = ({ slug, episode }) => {
  const {
    anime: {
      player: { host, list },
    },
  } = useAnime({ code: slug });

  const { progress, fetch, isLoading } = useProgress();

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner color={'white'} size={'lg'} />
      </div>
    );

  if (episode) {
    return (
      <Player
        sources={list[episode].hls}
        host={host}
        episode={Number(episode)}
        currentProgressTime={progress?.currentTime}
      />
    );
  }

  if (progress?.currentEpisode) {
    return (
      <Player
        sources={list[progress?.currentEpisode ?? episode].hls}
        host={host}
        episode={progress?.currentEpisode ?? Number(episode)}
        currentProgressTime={progress?.currentTime}
      />
    );
  }

  return (
    <Player
      sources={list['1'].hls}
      host={host}
      episode={1}
      currentProgressTime={progress?.currentTime}
    />
  );
};
