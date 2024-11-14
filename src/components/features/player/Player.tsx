"use client";

import { FC, SyntheticEvent, useEffect, useRef } from "react";
import Overlay from "@/components/features/player/Overlay";
import { throttle } from "lodash";
import { playerStore } from "@/store/player.store";
import { useStore } from "@tanstack/react-store";
import { useHls } from "@/hooks/useHls";
import { PlayerHls } from "@/types/entities/Title.type";
import { useOverlay } from "@/hooks/useOverlay";

interface PlayerProps {
  sources: PlayerHls;
  host: string;
}

const Player: FC<PlayerProps> = ({ sources, host }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { isVisible, overlayProps } = useOverlay({
    timeout: 5000,
    initialState: true,
  });

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

  const playHandler = () => {
    if (!isPlaying) {
      playerStore.setState((prev) => ({ ...prev, isPlaying: true }));
    }
  };

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowLeft":
          playerStore.setState((prev) => ({
            ...prev,
            seek: prev.currentTime - 10,
          }));
          break;

        case "ArrowRight":
          playerStore.setState((prev) => ({
            ...prev,
            seek: prev.currentTime + 10,
          }));
          break;

        case "Space":
          playerStore.setState((prev) => ({
            ...prev,
            isPlaying: !prev.isPlaying,
          }));
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  // const [isDarkText, setIsDarkText] = useState<boolean>(false);
  //
  // const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  //
  // const analyzeBrightness = () => {
  //   if (!videoRef.current || !videoCanvasRef.current) return;
  //
  //   const video = videoRef.current;
  //   const canvas = videoCanvasRef.current;
  //   const ctx = canvas.getContext("2d", { willReadFrequently: true });
  //
  //   if (!ctx) return;
  //
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //
  //   try {
  //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //     const { data } = imageData;
  //
  //     let totalBrightness = 0;
  //     const step = 4 * 10;
  //
  //     for (let i = 0; i < data.length; i += step) {
  //       const r = data[i];
  //       const g = data[i + 1];
  //       const b = data[i + 2];
  //       const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  //       totalBrightness += brightness;
  //     }
  //
  //     const averageBrightness = totalBrightness / (data.length / step);
  //     console.log(averageBrightness);
  //     setIsDarkText(averageBrightness > 180);
  //   } catch {}
  // };
  //
  // useEffect(() => {
  //   const interval = setInterval(analyzeBrightness, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="aspect-video h-screen relative">
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
      ></video>
      {/*<canvas hidden ref={videoCanvasRef} />*/}
      <Overlay overlayProps={overlayProps} isVisible={isVisible} />
    </div>
  );
};

export default Player;
