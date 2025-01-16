'use client';

import { FC, useEffect } from 'react';
import Player from '@/components/features/player/Player';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { anilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { useProgress } from '@/hooks/api/useProgress';
import { Spinner } from '@nextui-org/spinner';

interface WatchProps {
  slug: string;
  episode: string;
}

const Watch: FC<WatchProps> = ({ slug, episode }) => {
  const {
    data: {
      player: { host, list },
    },
  } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

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

export default Watch;
