import { UpdateProgressDto, useProgress } from '@/entities/user';
import { playerStore } from '@/features/player';
import { useAuth } from '@/shared/lib';
import { useStore } from '@tanstack/react-store';
import { throttle } from 'lodash';
import { RefObject, SyntheticEvent, useEffect, useRef } from 'react';

interface UsePlayerReturn {
  videoRef: RefObject<HTMLVideoElement>;
  handlers: {
    onTimeUpdate: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
    onLoadedData: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
    onWaiting: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
    onCanPlay: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
    onPlay: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  };
}

interface UsePlayerParams {
  currentProgressTime?: number;
  episode: number;
}

type UsePlayer = (params: UsePlayerParams) => UsePlayerReturn;

export const usePlayer: UsePlayer = ({ currentProgressTime, episode }) => {
  const ref = useRef<HTMLVideoElement>(null);

  const { isPlaying, seek, volume, isMuted, isFullscreen, currentTime } =
    useStore(playerStore);

  useEffect(() => {
    const videoEl = ref.current;

    if (!videoEl) return;

    if (isPlaying) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const videoEl = ref.current;

    if (!videoEl) return;

    videoEl.currentTime = seek as number;
  }, [seek]);

  useEffect(() => {
    const videoEl = ref.current;

    if (!videoEl || !currentProgressTime) return;

    playerStore.setState(prev => ({ ...prev, seek: currentProgressTime }));
  }, [currentProgressTime]);

  useEffect(() => {
    const videoEl = ref.current;

    if (!videoEl) return;

    videoEl.volume = volume / 100;
  }, [volume, isMuted]);

  useEffect(() => {
    const videoEl = ref.current;

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

  const { update } = useProgress();
  const { user } = useAuth();

  useEffect(() => {
    const videoEl = ref.current;

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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime, episode, isPlaying, update, user]);

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

  return {
    videoRef: ref,
    handlers: {
      onCanPlay: canPlayHandler,
      onTimeUpdate: timeUpdateHandler,
      onLoadedData: loadedDataHandler,
      onWaiting: waitingHandler,
      onPlay: playHandler,
    },
  };
};
