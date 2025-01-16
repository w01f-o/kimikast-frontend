import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { KimikastQueryKeys } from '@/enums/KimikastQueryKeys.enum';
import { progressApi } from '@/services/api/main/Progress.api';
import { Progress } from '@/types/entities/Progress';
import { useParams } from 'next/navigation';
import { UpdateProgressDto } from '@/types/dto/UpdateProgress.dto';

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
    queryKey: [KimikastQueryKeys.PROGRESS],
    queryFn: () => progressApi.getProgress(anilibriaSlug?.toString()),
    enabled: false,
  });

  const { mutate: update } = useMutation({
    mutationFn: (dto: UpdateProgressDto) =>
      progressApi.updateProgress(anilibriaSlug?.toString(), dto),
  });

  return {
    progress,
    update,
    fetch,
    isLoading,
  };
};
