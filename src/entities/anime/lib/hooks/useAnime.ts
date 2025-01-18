import {
  Anime,
  GetAnimeParams,
  getAnimeQueryHookParams,
} from '@/entities/anime';
import { useSuspenseQuery } from '@tanstack/react-query';

interface UseAnimeReturn {
  anime: Anime;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

type UseAnime = (params: GetAnimeParams) => UseAnimeReturn;

export const useAnime: UseAnime = params => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: anime,
  } = useSuspenseQuery({
    ...getAnimeQueryHookParams(params),
  });

  return {
    anime,
    isError,
    isLoading,
    isSuccess,
  };
};
