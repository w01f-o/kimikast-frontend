import {
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { List } from '@/types/entities/List.type';
import { ListsApi } from '@/services/api/default/Lists.api';

interface UseListReturn {
  list: List | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface UseListParams {
  id: string;
}

type UseList = (params: UseListParams) => UseListReturn;

export const getListQueryHookParams = (
  id: string
): UndefinedInitialDataOptions<List, Error, List, QueryKey> => ({
  queryKey: [DefaultQueryKeys.LIST, id],
  queryFn: ({ signal }) => ListsApi.findById(id, signal),
});

export const useList: UseList = ({ id }) => {
  const {
    data: list,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    ...getListQueryHookParams(id),
  });

  return {
    isLoading,
    isSuccess,
    list,
    isError,
  };
};
