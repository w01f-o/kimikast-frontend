import { useQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { listsApi } from "@/services/api/main/Lists.api";
import { List } from "@/types/entities/List.type";

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
> => ({ queryKey: [KimikastQueryKeys.LISTS], queryFn: listsApi.findAll });

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
