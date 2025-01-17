import { FC, RefObject, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface AmbilightProps {
  videoRef: RefObject<HTMLVideoElement>;
}

const Ambilight: FC<AmbilightProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanPlay, setIsCanPlay] = useState<boolean>(false);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    const canPlayHandler = () => {
      setIsCanPlay(true);
    };

    videoEl.addEventListener('canplay', canPlayHandler);

    return () => {
      videoEl.removeEventListener('canplay', canPlayHandler);
    };
  }, [videoRef]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const videoEl = videoRef.current;

    if (!canvasEl || !videoEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const paintAmbilight = () => {
      if (isCanPlay && !document.fullscreenElement) {
        ctx.drawImage(videoEl, 0, 0, videoEl.offsetWidth, videoEl.offsetHeight);
      }

      requestAnimationFrame(paintAmbilight);
    };

    requestAnimationFrame(paintAmbilight);
  }, [isCanPlay, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        'pointer-events-none absolute inset-0 z-10 size-full opacity-60 blur-[80px] saturate-200'
      )}
    />
  );
};

export default Ambilight;
