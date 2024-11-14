import { FC, RefObject, useEffect, useRef } from "react";

interface AmbilightProps {
  videoRef: RefObject<HTMLVideoElement>;
}

const Ambilight: FC<AmbilightProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const videoEl = videoRef.current;
    if (!canvasEl || !videoEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    let interval: NodeJS.Timeout | null = null;

    canvasEl.width = videoEl.offsetWidth;
    canvasEl.height = window.innerHeight;

    const paintAmbilight = () => {
      ctx.drawImage(videoEl, 0, 0, videoEl.offsetWidth, videoEl.offsetHeight);
    };

    const repaintAmbilight = () => {
      interval = setInterval(paintAmbilight, 1000 / 24);
    };

    const canPlayHandler = () => {
      repaintAmbilight();
    };

    videoEl.addEventListener("canplay", canPlayHandler);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 blur-[80px] opacity-50 saturate-200 pointer-events-none"
    />
  );
};

export default Ambilight;
