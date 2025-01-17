import { FC, Suspense } from 'react';
import QualityChanger from '@/components/features/player/QualityChanger';
import VolumeChanger from '@/components/features/player/VolumeChanger';
import FullscreenSwitcher from '@/components/features/player/FullscreenSwitcher';
import ProgressBar from '@/components/features/player/ProgressBar';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAnime } from '@/hooks/api/anilibria/useAnime';

const DynamicEpisodeChanger = dynamic(
  () => import('@/components/features/player/EpisodeChanger')
);

const BottomBar: FC = () => {
  const slug = useParams().slug as string;
  const {
    anime: {
      player: { list },
    },
  } = useAnime({ code: slug });

  return (
    <div className="px-6">
      <div className="flex items-center gap-4">
        <ProgressBar />
        <div className="flex items-center gap-2">
          <VolumeChanger />
          <QualityChanger />
          <FullscreenSwitcher />
        </div>
      </div>
      <Suspense fallback={null}>
        <DynamicEpisodeChanger episodes={list} />
      </Suspense>
    </div>
  );
};

export default BottomBar;
