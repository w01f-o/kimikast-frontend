import { useAnime } from '@/entities/anime';
import {
  EpisodeChanger,
  FullscreenSwitcher,
  ProgressBar,
  QualityChanger,
  VolumeChanger,
} from '@/features/player/ui';
import { useParams } from 'next/navigation';
import { FC, Suspense } from 'react';

export const BottomBar: FC = () => {
  const { slug } = useParams();
  const {
    anime: {
      player: { list },
    },
  } = useAnime({ code: String(slug) });

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
        <EpisodeChanger episodes={list} />
      </Suspense>
    </div>
  );
};
