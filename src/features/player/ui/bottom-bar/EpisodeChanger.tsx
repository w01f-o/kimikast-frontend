import { PlayerItem } from '@/entities/anime';
import { useProgress } from '@/entities/user';
import { playerStore } from '@/features/player';
import { Button } from '@heroui/button';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';
import { SharedSelection } from '@heroui/react';
import { useDisclosure } from '@heroui/use-disclosure';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { FC, useEffect, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface EpisodeChangerProps {
  episodes: Record<string, PlayerItem>;
}

export const EpisodeChanger: FC<EpisodeChangerProps> = ({ episodes }) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loadedCount, setLoadedCount] = useState(25);
  const [localEpisodes, setLocalEpisodes] = useState<PlayerItem[]>([]);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  const { progress } = useProgress();

  const episodeFromSearchParams =
    searchParams.get('episode') ?? progress?.currentEpisode;
  const episodeList = Object.values(episodes);

  const findEpisodeByUuid = (uuid: string) =>
    episodeList.find(ep => ep.uuid === uuid);

  const initialEpisode = findEpisodeByUuid(
    episodeList.find(
      ep => String(ep.episode) === String(episodeFromSearchParams)
    )?.uuid ?? episodeList[0].uuid
  );

  const [selectedEpisode, setSelectedEpisode] = useState(
    new Set([initialEpisode!.uuid])
  );

  useEffect(() => {
    setSelectedEpisode(new Set([initialEpisode!.uuid]));
  }, [initialEpisode]);

  useEffect(() => {
    if (isIntersecting) setLoadedCount(prev => prev + 20);
  }, [isIntersecting]);

  useEffect(() => {
    setLocalEpisodes(episodeList.slice(0, loadedCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedCount]);

  const episodeChangeHandler = (value: SharedSelection) => {
    const selectedUuid = Array.from(value).join('');
    const selectedEp = findEpisodeByUuid(selectedUuid);

    if (!selectedEp) return;

    setSelectedEpisode(new Set([selectedUuid]));
    const searchParams = new URLSearchParams({
      episode: String(selectedEp.episode),
    });

    playerStore.setState(prev => ({ ...prev, isLoading: true }));
    router.push(`${pathname}?${searchParams}`);
    onClose();
  };

  return (
    <div className="pt-1">
      <Button onPress={onOpen}>
        Эпизод{' '}
        {findEpisodeByUuid(Array.from(selectedEpisode).join(''))?.episode}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
      >
        <ModalContent>
          <ModalHeader>Выбора эпизода</ModalHeader>
          <ModalBody>
            <Listbox
              items={localEpisodes}
              disallowEmptySelection
              selectionMode={'single'}
              aria-label="Episode selection"
              selectedKeys={selectedEpisode}
              onSelectionChange={episodeChangeHandler}
            >
              {item => (
                <ListboxItem
                  key={item.uuid}
                  textValue={`Эпизод ${item.episode}`}
                >
                  Эпизод {item.episode}
                </ListboxItem>
              )}
            </Listbox>
            <div ref={ref} className="h-12 w-full" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
