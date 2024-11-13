import { RefObject, useEffect, useRef } from "react";
import Hls from "hls.js";
import { PlayerHls } from "@/types/entities/Title.type";

interface useHlsParams {
  sources: PlayerHls;
  host: string;
  ref: RefObject<HTMLVideoElement>;
  quality: keyof PlayerHls;
}

export const useHls = ({ sources, ref, quality, host }: useHlsParams) => {
  const hlsRef = useRef<Hls | null>(null);
  const href = `https://${host}/${sources[quality]}`;

  useEffect(() => {
    const videoEl = ref.current;

    if (!videoEl || !(videoEl instanceof HTMLVideoElement))
      throw new Error("Video element not found");

    if (Hls.isSupported()) {
      if (!hlsRef.current) {
        hlsRef.current = new Hls();
        hlsRef.current.attachMedia(videoEl);
      }

      const hls = hlsRef.current;

      console.log(href);

      const currentTime = videoEl.currentTime;

      hls.loadSource(href);

      videoEl.currentTime = currentTime;
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = href;
    }
  }, [sources, ref, href]);
};
