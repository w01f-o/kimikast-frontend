import { RefObject, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { PlayerHls } from '@/types/entities/Title.type';
import { playerStore } from '@/store/player.store';

interface UseHlsParams {
  sources: PlayerHls;
  host: string;
  ref: RefObject<HTMLVideoElement>;
  quality: keyof PlayerHls;
}

export const useHls = ({ sources, ref, quality, host }: UseHlsParams) => {
  const hlsRef = useRef<Hls | null>(null);
  const href = `https://${host}/${sources[quality]}`;

  useEffect(() => {
    const videoEl = ref.current;

    if (!videoEl || !(videoEl instanceof HTMLVideoElement))
      throw new Error('Video element not found');

    if (Hls.isSupported()) {
      if (!hlsRef.current) {
        hlsRef.current = new Hls();
        hlsRef.current.attachMedia(videoEl);
      }

      const hls = hlsRef.current;

      const { currentTime } = videoEl;

      hls.loadSource(href);

      const updateBufferHandler = () => {
        const buffered = videoEl.buffered;
        const currentTime = videoEl.currentTime;
        let bufferEnd = 0;

        for (let i = 0; i < buffered.length; i++) {
          if (
            buffered.start(i) <= currentTime &&
            buffered.end(i) >= currentTime
          ) {
            bufferEnd = buffered.end(i);
          }
        }

        const duration = videoEl.duration;
        if (duration > 0) {
          playerStore.setState(prev => ({
            ...prev,
            bufferProgress: (bufferEnd / duration) * 100,
          }));
        }
      };

      hls.on(Hls.Events.FRAG_BUFFERED, updateBufferHandler);

      videoEl.currentTime = currentTime;

      return () => {
        if (hls) {
          hls.off(Hls.Events.FRAG_BUFFERED, updateBufferHandler);
        }
      };
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = href;
    }
  }, [sources, ref, href]);

  useEffect(() => {
    const videoEl = ref.current;

    if (videoEl) videoEl.currentTime = 0;
  }, [ref, sources]);
};
