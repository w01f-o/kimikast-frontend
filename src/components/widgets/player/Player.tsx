'use client';

import { FC } from 'react';
import { playerStore } from '@/store/player.store';
import { useStore } from '@tanstack/react-store';
import { useHls } from '@/hooks/player/useHls';
import { useOverlay } from '@/hooks/player/useOverlay';
import Overlay from '@/components/widgets/player/Overlay';
import Ambilight from '@/components/widgets/player/Ambilight';
import { PlayerHls } from '@/types/anilibria/entities/Player.type';
import { usePlayer } from '@/hooks/player/usePlayer';

interface PlayerProps {
  sources: PlayerHls;
  host: string;
  currentProgressTime?: number;
  episode: number;
}

const Player: FC<PlayerProps> = ({
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

export default Player;
