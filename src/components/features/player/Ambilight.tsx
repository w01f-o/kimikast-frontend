import { FC, RefObject, useEffect, useRef } from "react";
import { playerStore } from "@/store/player.store";
import { useStore } from "@tanstack/react-store";
import clsx from "clsx";

interface AmbilightProps {
  videoRef: RefObject<HTMLVideoElement>;
}

const Ambilight: FC<AmbilightProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isLoading } = useStore(playerStore);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const videoEl = videoRef.current;

    if (!canvasEl || !videoEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    canvasEl.width = videoEl.offsetWidth;
    canvasEl.height = videoEl.offsetHeight;

    const paintAmbilight = () => {
      ctx.drawImage(videoEl, 0, 0, videoEl.offsetWidth, videoEl.offsetHeight);
    };

    const repaintAmbilight = () => {
      intervalRef.current = setInterval(paintAmbilight, 1000 / 24);
    };

    const canPlayHandler = () => {
      repaintAmbilight();
    };

    videoEl.addEventListener("canplay", canPlayHandler);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "absolute inset-0 z-10 blur-[80px] saturate-200 pointer-events-none",
        {
          "opacity-0": isLoading,
          "opacity-50": !isLoading,
        },
      )}
    />
  );
};

export default Ambilight;
