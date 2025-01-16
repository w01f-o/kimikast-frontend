import { DOMAttributes, FC, MouseEvent, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FocusableElement } from '@react-types/shared';
import { playerStore } from '@/store/player.store';
import BottomBar from '@/components/features/player/controls/BottomBar';
import PlayerPlayPause from '@/components/features/player/controls/PlayerPlayPause';
import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import Link from 'next/link';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import Image from 'next/image';
import CurrentUser from '@/components/widgets/CurrentUser';
import clsx from 'clsx';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';

interface PlayerOverlayProps {
  isVisible: boolean;
  overlayProps: DOMAttributes<FocusableElement>;
}

const Overlay: FC<PlayerOverlayProps> = ({ overlayProps, isVisible }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const overlayClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current === e.target) {
      playerStore.setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const slug = useParams().slug as string;
  const {
    data: { names },
  } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => AnilibriaApi.getTitle({ code: slug }),
  });

  return (
    <AnimatePresence>
      {isVisible && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        <motion.div
          className={clsx(
            'absolute inset-0 flex flex-col justify-between overflow-hidden pb-6 pt-12 backdrop-brightness-50',
            {
              'cursor-none': !isVisible,
            }
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={overlayClickHandler}
          ref={overlayRef}
          {...overlayProps}
        >
          <div className="flex justify-between px-6">
            <Link href={RoutePaths.HOME}>
              <Image
                src={'/kimikast/logo.svg'}
                alt={'Kimikast'}
                width={60}
                height={60}
              />
            </Link>
            <h1 className="text-center text-4xl font-extrabold drop-shadow-2xl lg:text-5xl">
              {names.ru}
            </h1>
            <CurrentUser />
          </div>
          <PlayerPlayPause />
          <BottomBar />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
