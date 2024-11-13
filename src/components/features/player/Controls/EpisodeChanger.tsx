import { FC, useEffect, useState } from "react";
import { PlayerItem } from "@/types/entities/Title.type";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useIntersectionObserver } from "usehooks-ts";
import { SharedSelection } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

interface EpisodeChangerProps {
  episodes: Record<string, PlayerItem>;
}

const EpisodeChanger: FC<EpisodeChangerProps> = ({ episodes }) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState<number>(25);
  const [localEpisodes, setLocalEpisodes] = useState<PlayerItem[]>(
    Object.values(episodes).slice(0, page),
  );

  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting) {
      setPage((prev) => prev + 20);
    }
  }, [isIntersecting]);

  useEffect(() => {
    setLocalEpisodes(Object.values(episodes).slice(0, page));
  }, [episodes, page]);

  const [selectedEpisode, setSelectedEpisode] = useState(
    new Set([localEpisodes[0].uuid]),
  );

  const router = useRouter();
  const pathname = usePathname();

  const episodeChangeHandler = (value: SharedSelection) => {
    setSelectedEpisode(value as Set<string>);

    const episode = Object.values(episodes).find(
      (ep) => ep.uuid === Array.from(value).join(""),
    )!.episode;

    const searchParams = new URLSearchParams({ episode: String(episode) });

    router.push(`${pathname}?${searchParams}`);
    onClose();
  };

  return (
    <div className="pt-1">
      <Button onClick={onOpen}>Эпизод 1</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Выбора эпизода</ModalHeader>
              <ModalBody>
                <Listbox
                  items={localEpisodes}
                  disallowEmptySelection
                  selectionMode={"single"}
                  aria-label="Single selection example"
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
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EpisodeChanger;
