import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { listsApi } from "@/services/api/main/Lists.api";
import { List } from "@/types/entities/List.type";

interface UseListsReturn {
  lists: List[];
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
  } = useSuspenseQuery({
    ...getListsQueryHookParams(),
  });

  return {
    isLoading,
    isSuccess,
    lists,
  };
};
