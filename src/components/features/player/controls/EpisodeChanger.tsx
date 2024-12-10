import { FC, memo, useEffect, useState } from "react";
import { PlayerItem } from "@/types/entities/Title.type";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useIntersectionObserver } from "usehooks-ts";
import { SharedSelection } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { playerStore } from "@/store/player.store";

interface EpisodeChangerProps {
  episodes: Record<string, PlayerItem>;
}

const EpisodeChanger: FC<EpisodeChangerProps> = ({ episodes }) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loadedCount, setLoadedCount] = useState(25);
  const [localEpisodes, setLocalEpisodes] = useState<PlayerItem[]>([]);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  const episodeFromSearchParams = searchParams.get("episode");
  const episodeList = Object.values(episodes);

  const findEpisodeByUuid = (uuid: string) =>
    episodeList.find((ep) => ep.uuid === uuid);

  const initialEpisode = findEpisodeByUuid(
    episodeList.find((ep) => String(ep.episode) === episodeFromSearchParams)
      ?.uuid ?? episodeList[0].uuid,
  );

  const [selectedEpisode, setSelectedEpisode] = useState(
    new Set([initialEpisode!.uuid]),
  );

  useEffect(() => {
    setSelectedEpisode(new Set([initialEpisode!.uuid]));
  }, [initialEpisode]);

  useEffect(() => {
    if (isIntersecting) setLoadedCount((prev) => prev + 20);
  }, [isIntersecting]);

  useEffect(() => {
    setLocalEpisodes(episodeList.slice(0, loadedCount));
  }, [loadedCount]);

  const episodeChangeHandler = (value: SharedSelection) => {
    const selectedUuid = Array.from(value).join("");
    const selectedEp = findEpisodeByUuid(selectedUuid);

    if (!selectedEp) return;

    setSelectedEpisode(new Set([selectedUuid]));
    const searchParams = new URLSearchParams({
      episode: String(selectedEp.episode),
    });

    playerStore.setState((prev) => ({ ...prev, isLoading: true }));
    router.push(`${pathname}?${searchParams}`);
    onClose();
  };

  return (
    <div className="pt-1">
      <Button onClick={onOpen}>
        Эпизод{" "}
        {findEpisodeByUuid(Array.from(selectedEpisode).join(""))?.episode}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          <ModalHeader>Выбора эпизода</ModalHeader>
          <ModalBody>
            <Listbox
              items={localEpisodes}
              disallowEmptySelection
              selectionMode={"single"}
              aria-label="Episode selection"
              selectedKeys={selectedEpisode}
              onSelectionChange={episodeChangeHandler}
            >
              {(item) => (
                <ListboxItem
                  key={item.uuid}
                  textValue={`Эпизод ${item.episode}`}
                >
                  Эпизод {item.episode}
                </ListboxItem>
              )}
            </Listbox>
            <div ref={ref} className="w-full h-12" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(EpisodeChanger);
