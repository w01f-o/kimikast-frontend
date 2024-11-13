import { DOMAttributes, FC, MouseEvent, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FocusableElement } from "@react-types/shared";
import { useStore } from "@tanstack/react-store";
import { playerStore } from "@/store/player.store";
import BottomBar from "@/components/features/player/Controls/BottomBar";
import PlayerPlayPause from "@/components/features/player/Controls/PlayerPlayPause";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";

interface PlayerOverlayProps {
  isHovered: boolean;
  hoverProps: DOMAttributes<FocusableElement>;
}

const Overlay: FC<PlayerOverlayProps> = ({ hoverProps, isHovered }) => {
  const { isPlaying } = useStore(playerStore);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const overlayClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current === e.target) {
      playerStore.setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const slug = useParams().slug as string;
  const {
    data: { names },
  } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  return (
    <AnimatePresence>
      {(isHovered || !isPlaying) && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        <motion.div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden pt-14 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={overlayClickHandler}
          ref={overlayRef}
          {...hoverProps}
        >
          <h1 className="text-5xl text-center font-extrabold drop-shadow-2xl">
            {names.ru}
          </h1>
          <PlayerPlayPause />
          <BottomBar />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
