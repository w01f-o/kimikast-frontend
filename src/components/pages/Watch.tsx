"use client";

import { FC, useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import Hls from "hls.js";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";

interface WatchProps {
  slug: string;
}

const Watch: FC<WatchProps> = ({ slug }) => {
  const { data } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoUrl = `https://${data.player.host}${data.player.list[0].hls.fhd}`;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center fixed inset-0 z-20">
      <video ref={videoRef} className="aspect-video" controls autoPlay></video>
    </div>
  );
};

export default Watch;
