import { useAnime } from '@/entities/anime';
import {
  defaultCollectionNames,
  useMutateUserLists,
  useUserLists,
} from '@/entities/user-list';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Spinner } from '@heroui/spinner';
import { FolderHeart } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const AnimeInUserList: FC = ({}) => {
  const slug = useParams().slug as string;
  const { anime } = useAnime({ code: slug });
  const {
    lists,
    isLoading: listsIsLoading,
    isSuccess: listsIsSuccess,
  } = useUserLists();

  const { mutate } = useMutateUserLists({ anilibriaSlug: anime.code });

  const addAnimeClickHandler = (listId: string) => () => {
    const isAnimeInList = lists!
      .find(list => list.id === listId)
      ?.animes.some(a => a.anilibriaSlug === anime.code);

    mutate({
      listId,
      type: isAnimeInList ? 'remove' : 'add',
    });
  };

  return (
    <>
      {listsIsLoading && <Spinner />}
      {listsIsSuccess && (
        <Dropdown shouldBlockScroll={false}>
          <DropdownTrigger>
            <Button isIconOnly endContent={<FolderHeart />} />
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            selectionMode={'multiple'}
            selectedKeys={lists!
              .filter(list =>
                list.animes.find(a => a.anilibriaSlug === anime.code)
              )
              .map(list => list.id)}
          >
            {lists!.map(list => (
              <DropdownItem
                key={list.id}
                onPress={addAnimeClickHandler(list.id)}
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
