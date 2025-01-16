"use client";

import { FC } from "react";
import Player from "@/components/features/player/Player";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";

interface WatchProps {
  slug: string;
  episode: string;
}

const Watch: FC<WatchProps> = ({ slug, episode }) => {
  const {
    data: {
      player: { host, list },
    },
  } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  return <Player sources={list[episode].hls} host={host} />;
};

export default Watch;
