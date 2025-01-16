'use client';

import { FC, SyntheticEvent, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { playerStore } from '@/store/player.store';
import { useStore } from '@tanstack/react-store';
import { useHls } from '@/hooks/useHls';
import { PlayerHls } from '@/types/entities/Title.type';
import { useOverlay } from '@/hooks/useOverlay';
import Overlay from '@/components/features/player/Overlay';
import Ambilight from '@/components/features/player/Ambilight';
import { useProgress } from '@/hooks/api/useProgress';
import { UpdateProgressDto } from '@/types/dto/UpdateProgress.dto';
import { useAuth } from '@/hooks/useAuth';

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl || !currentProgressTime) return;

    playerStore.setState(prev => ({ ...prev, seek: currentProgressTime }));
  }, [currentProgressTime]);

  const { isVisible, overlayProps } = useOverlay({
    timeout: 5000,
    initialState: true,
  });

  const {
    isPlaying,
    seek,
    volume,
    isMuted,
    isFullscreen,
    quality,
    currentTime,
  } = useStore(playerStore);

  useHls({ ref: videoRef, sources, quality, host });

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    if (isPlaying) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    videoEl.currentTime = seek as number;
  }, [seek]);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    videoEl.volume = volume / 100;
  }, [volume, isMuted]);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    videoEl.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  const timeUpdateHandler = throttle(e => {
    const currentTime = Math.round(e.target.currentTime);

    playerStore.setState(prev => ({ ...prev, currentTime }));
  }, 1000);

  const loadedDataHandler = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const { duration } = e.target as HTMLVideoElement;
    const time = Math.round(duration);

    playerStore.setState(prev => ({
      ...prev,
      duration: time,
    }));
  };

  const waitingHandler = () => {
    playerStore.setState(prev => ({ ...prev, isLoading: true }));
  };

  const canPlayHandler = () => {
    playerStore.setState(prev => ({ ...prev, isLoading: false }));
  };

  const playHandler = () => {
    if (!isPlaying) {
      playerStore.setState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const { update } = useProgress();
  const { user } = useAuth();

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    let interval: NodeJS.Timeout | null = null;

    const currentProgress: UpdateProgressDto = {
      currentEpisode: Number(episode),
      currentTime,
      isCompleted: videoEl.duration * 0.9 <= currentTime,
    };

    interval = setInterval(() => {
      if (isPlaying && !currentProgress.isCompleted && user) {
        update(currentProgress);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime, episode, isPlaying, update, user]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          playerStore.setState(prev => ({
            ...prev,
            seek: prev.currentTime - 10,
          }));
          break;

        case 'ArrowRight':
          playerStore.setState(prev => ({
            ...prev,
            seek: prev.currentTime + 10,
          }));
          break;

        case 'Space':
          playerStore.setState(prev => ({
            ...prev,
            isPlaying: !prev.isPlaying,
          }));
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative z-20 aspect-video max-h-screen w-full">
        <video
          ref={videoRef}
          autoPlay
          className="size-full cursor-none"
          onTimeUpdate={timeUpdateHandler}
          onLoadedData={loadedDataHandler}
          onWaiting={waitingHandler}
          onCanPlay={canPlayHandler}
          onPlay={playHandler}
          {...overlayProps}
        />
        <Overlay overlayProps={overlayProps} isVisible={isVisible} />
      </div>
      <Ambilight videoRef={videoRef} />
    </div>
  );
};

export default Player;
