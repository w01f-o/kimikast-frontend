'use client';

import { Progress, ProgressApi, UpdateProgressDto } from '@/entities/user';
import { DefaultQueryKeys } from '@/shared/model';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface UseProgressReturn {
  isLoading: boolean;
  progress: Progress | undefined;
  fetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Progress, Error>>;
  update: (dto: UpdateProgressDto) => void;
}

type UseProgress = () => UseProgressReturn;

export const useProgress: UseProgress = () => {
  const { slug: anilibriaSlug } = useParams();

  const {
    data: progress,
    refetch: fetch,
    isLoading,
  } = useQuery({
    queryKey: [DefaultQueryKeys.PROGRESS, anilibriaSlug?.toString()],
    queryFn: () => ProgressApi.getBySlug(anilibriaSlug?.toString()),
    enabled: false,
  });

  const { mutate: update } = useMutation({
    mutationFn: (dto: UpdateProgressDto) =>
      ProgressApi.update(anilibriaSlug?.toString(), dto),
  });

  return {
    progress,
    update,
    fetch,
    isLoading,
  };
};
