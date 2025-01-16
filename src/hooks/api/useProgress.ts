import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { Progress } from '@/types/entities/Progress';
import { useParams } from 'next/navigation';
import { UpdateProgressDto } from '@/types/dto/UpdateProgress.dto';
import { ProgressApi } from '@/services/api/default/Progress.api';

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
