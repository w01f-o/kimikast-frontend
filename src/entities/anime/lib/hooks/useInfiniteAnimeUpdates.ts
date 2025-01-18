'use client';

import {
  getInfiniteAnimeUpdatesQueryHookParams,
  SearchResult,
} from '@/entities/anime';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface UseInfiniteAnimeReturn {
  isFetchingNextPage: boolean;
  ref: (node?: Element | null | undefined) => void;
  animes: InfiniteData<SearchResult, number> | undefined;
}

type UseInfiniteAnimeUpdates = () => UseInfiniteAnimeReturn;

export const useInfiniteAnimeUpdates: UseInfiniteAnimeUpdates = () => {
  const {
    data: animes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...getInfiniteAnimeUpdatesQueryHookParams(),
  });

  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    ref,
    isFetchingNextPage,
    animes,
  };
};
