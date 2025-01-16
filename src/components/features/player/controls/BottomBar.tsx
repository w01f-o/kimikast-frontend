import { FC, Suspense } from 'react';
import QualityChanger from '@/components/features/player/controls/QualityChanger';
import VolumeChanger from '@/components/features/player/controls/VolumeChanger';
import FullscreenSwitcher from '@/components/features/player/controls/FullscreenSwitcher';
import ProgressBar from '@/components/features/player/controls/ProgressBar';
import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { anilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import dynamic from 'next/dynamic';

const DynamicEpisodeChanger = dynamic(
  () => import('@/components/features/player/controls/EpisodeChanger')
);

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
