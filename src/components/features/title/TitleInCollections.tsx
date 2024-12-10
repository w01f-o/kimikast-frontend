import { FC } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Dropdown, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { DropdownTrigger } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FolderHeart } from "lucide-react";
import { defaultCollectionNames } from "@/components/entities/Collection";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { listsApi } from "@/services/api/main/Lists.api";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";
import { useParams } from "next/navigation";

const TitleInCollections: FC = ({}) => {
  const slug = useParams().slug as string;

  const { data: title } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  const {
    data: lists,
    isSuccess: listsIsSuccess,
    isLoading: listsIsLoading,
    refetch: refetchLists,
  } = useQuery({
    queryKey: [KimikastQueryKeys.LISTS],
    queryFn: listsApi.findAll,
  });

  const { mutate } = useMutation({
    mutationKey: [KimikastQueryKeys.LISTS],
    mutationFn: ({
      listId,
      type,
    }: {
      listId: string;
      type: "add" | "remove";
    }) => {
      switch (type) {
        case "add":
          return listsApi.addAnime(listId, { anilibriaSlug: title.code });
        case "remove":
          return listsApi.removeAnime(listId, { anilibriaSlug: title.code });
      }
    },
    onSuccess: async () => {
      await refetchLists();
    },
  });

  const addAnimeClickHandler = (listId: string) => () => {
    const isAnimeInList = lists!
      .find((list) => list.id === listId)
      ?.animes.some((anime) => anime.anilibriaSlug === title.code);

    mutate({
      listId,
      type: isAnimeInList ? "remove" : "add",
    });
  };

  return (
    <>
      {listsIsLoading && <Spinner />}
      {listsIsSuccess && (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly endContent={<FolderHeart />} />
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            selectionMode={"multiple"}
            selectedKeys={lists
              .filter((list) =>
                list.animes.find((a) => a.anilibriaSlug === title.code),
              )
              .map((list) => list.id)}
          >
            {lists.map((list) => (
              <DropdownItem
                key={list.id}
                onClick={addAnimeClickHandler(list.id)}
              >
                {
                  defaultCollectionNames[
                    list.name as keyof typeof defaultCollectionNames
                  ]
                }
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

export default TitleInCollections;
