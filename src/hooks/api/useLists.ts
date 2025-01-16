import { useQuery, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { KimikastQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { List } from '@/types/entities/List.type';
import { ListsApi } from '@/services/api/default/Lists.api';

interface UseListsReturn {
  lists: List[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
}

type UseLists = () => UseListsReturn;

export const getListsQueryHookParams = (): UseSuspenseQueryOptions<
  List[],
  Error,
  List[],
  KimikastQueryKeys[]
> => ({
  queryKey: [KimikastQueryKeys.LISTS],
  queryFn: () => ListsApi.findAll(),
});

export const useLists: UseLists = () => {
  const {
    data: lists,
    isSuccess,
    isLoading,
  } = useQuery({
    ...getListsQueryHookParams(),
  });

  return {
    isLoading,
    isSuccess,
    lists,
  };
};
