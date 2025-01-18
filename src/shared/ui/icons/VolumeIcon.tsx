import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { FC } from 'react';

interface VolumeIconProps {
  volume: number;
  isMuted: boolean;
}

export const VolumeIcon: FC<VolumeIconProps> = ({ isMuted, volume }) => {
  if (isMuted || volume === 0) {
    return <VolumeX className="size-2/3" />;
  } else if (volume < 50) {
    return <Volume1 className="size-2/3" />;
  } else {
    return <Volume2 className="size-2/3" />;
  }
};
