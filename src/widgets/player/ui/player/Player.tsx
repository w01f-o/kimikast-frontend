'use client';

import { PlayerHls } from '@/entities/anime';
import { playerStore, useHls, useOverlay, usePlayer } from '@/features/player';
import { Ambilight, Overlay } from '@/widgets/player/ui';
import { useStore } from '@tanstack/react-store';
import { FC } from 'react';

interface PlayerProps {
  sources: PlayerHls;
  host: string;
  currentProgressTime?: number;
  episode: number;
}

export const Player: FC<PlayerProps> = ({
  sources,
  host,
  currentProgressTime,
  episode,
}) => {
  const { isVisible, overlayProps } = useOverlay({
    timeout: 5000,
    initialState: true,
  });

  const { handlers, videoRef } = usePlayer({ currentProgressTime, episode });

  const { quality } = useStore(playerStore);

  useHls({ ref: videoRef, sources, quality, host });

  return (
    <div className="relative">
      <div className="relative z-20 aspect-video max-h-screen w-full">
        <video
          ref={videoRef}
          autoPlay
          className="size-full cursor-none"
          {...handlers}
          {...overlayProps}
        />
        <Overlay overlayProps={overlayProps} isVisible={isVisible} />
      </div>
      <Ambilight videoRef={videoRef} />
    </div>
  );
};
