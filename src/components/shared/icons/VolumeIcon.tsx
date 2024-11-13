import { FC } from "react";
import { useStore } from "@tanstack/react-store";
import { playerStore } from "@/store/player.store";
import { Volume1, Volume2, VolumeX } from "lucide-react";

const VolumeIcon: FC = () => {
  const { volume, isMuted } = useStore(playerStore);

  if (isMuted || volume === 0) {
    return <VolumeX className="size-2/3" />;
  } else if (volume < 50) {
    return <Volume1 className="size-2/3" />;
  } else {
    return <Volume2 className="size-2/3" />;
  }
};

export default VolumeIcon;
