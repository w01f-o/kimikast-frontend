import { FC } from "react";
import QualityChanger from "@/components/features/player/Controls/QualityChanger";
import VolumeChanger from "@/components/features/player/Controls/VolumeChanger";
import FullscreenSwitcher from "@/components/features/player/Controls/FullscreenSwitcher";
import ProgressBar from "@/components/features/player/Controls/ProgressBar";
import EpisodeChanger from "@/components/features/player/Controls/EpisodeChanger";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";

const BottomBar: FC = () => {
  const slug = useParams().slug as string;
  const {
    data: {
      player: { list },
    },
  } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  return (
    <div className="px-6">
      <div className="flex items-center gap-4">
        <ProgressBar />
        <div className="flex gap-2 items-center">
          <VolumeChanger />
          <QualityChanger />
          <FullscreenSwitcher />
        </div>
      </div>
      <EpisodeChanger episodes={list} />
    </div>
  );
};

export default BottomBar;
