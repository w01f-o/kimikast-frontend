import { FC } from 'react';
import { Spinner } from '@heroui/spinner';
import { Dropdown, DropdownItem, DropdownMenu } from '@heroui/dropdown';
import { DropdownTrigger } from '@heroui/react';
import { Button } from '@heroui/button';
import { FolderHeart } from 'lucide-react';
import { defaultCollectionNames } from '@/components/entities/UserList';
import { useParams } from 'next/navigation';
import { useMutateLists } from '@/hooks/api/useMutateLists';
import { useLists } from '@/hooks/api/useLists';
import { useAnime } from '@/hooks/api/anilibria/useAnime';

const AnimeInList: FC = ({}) => {
  const slug = useParams().slug as string;
  const { anime } = useAnime({ code: slug });
  const {
    lists,
    isLoading: listsIsLoading,
    isSuccess: listsIsSuccess,
  } = useLists();

  const { mutate } = useMutateLists({ anilibriaSlug: anime.code });

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

export default AnimeInList;
