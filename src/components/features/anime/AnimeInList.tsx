import { FC } from 'react';
import { Spinner } from '@nextui-org/spinner';
import { Dropdown, DropdownItem, DropdownMenu } from '@nextui-org/dropdown';
import { DropdownTrigger } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { FolderHeart } from 'lucide-react';
import { defaultCollectionNames } from '@/components/entities/UserList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { useParams } from 'next/navigation';
import { useMutateLists } from '@/hooks/api/useMutateLists';
import { useLists } from '@/hooks/api/useLists';

const AnimeInList: FC = ({}) => {
  const slug = useParams().slug as string;

  const { data: title } = useSuspenseQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => AnilibriaApi.getAnime({ code: slug }),
  });

  const {
    lists,
    isLoading: listsIsLoading,
    isSuccess: listsIsSuccess,
  } = useLists();

  const { mutate } = useMutateLists({ anilibriaSlug: title.code });

  const addAnimeClickHandler = (listId: string) => () => {
    const isAnimeInList = lists!
      .find(list => list.id === listId)
      ?.animes.some(anime => anime.anilibriaSlug === title.code);

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
                list.animes.find(a => a.anilibriaSlug === title.code)
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
