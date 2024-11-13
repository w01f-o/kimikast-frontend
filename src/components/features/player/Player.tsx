"use client";

import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useHover } from "@react-aria/interactions";
import Overlay from "@/components/features/player/Overlay";
import { throttle } from "lodash";
import { playerStore } from "@/store/player.store";
import { useStore } from "@tanstack/react-store";
import { useHls } from "@/hooks/useHls";
import { PlayerHls } from "@/types/entities/Title.type";

interface PlayerProps {
  sources: PlayerHls;
  host: string;
}

const Player: FC<PlayerProps> = ({ sources, host }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { hoverProps, isHovered } = useHover({});
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    let overlayTimer: NodeJS.Timeout | null = null;

    if (isHovered) {
      setShowOverlay(true);
    } else {
      overlayTimer = setTimeout(() => {
        setShowOverlay(false);
      }, 1000);
    }

    return () => {
      if (overlayTimer) {
        clearTimeout(overlayTimer);
      }
    };
  }, [isHovered]);

  const { isPlaying, seek, volume, isMuted, isFullscreen, quality } =
    useStore(playerStore);

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

  const timeUpdateHandler = throttle((e) => {
    const currentTime = Math.round(e.target.currentTime);

    playerStore.setState((prev) => ({ ...prev, currentTime }));
  }, 1000);

  const loadedDataHandler = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const { duration } = e.target as HTMLVideoElement;
    const time = Math.round(duration);

    playerStore.setState((prev) => ({
      ...prev,
      duration: time,
    }));
  };

  const waitingHandler = () => {
    playerStore.setState((prev) => ({ ...prev, isLoading: true }));
  };

  const canPlayHandler = () => {
    playerStore.setState((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="aspect-video h-screen relative">
      <video
        ref={videoRef}
        autoPlay
        className="size-full"
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={loadedDataHandler}
        onWaiting={waitingHandler}
        onCanPlay={canPlayHandler}
        {...hoverProps}
      ></video>
      <Overlay hoverProps={hoverProps} isHovered={showOverlay} />
    </div>
  );
};

export default Player;
