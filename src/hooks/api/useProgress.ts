import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { progressApi } from "@/services/api/main/Progress.api";
import { Progress } from "@/types/entities/Progress";
import { useParams } from "next/navigation";

interface UseProgressReturn {
  progress: Progress | undefined;
  fetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Progress, Error>>;
  update: (dto: Progress) => void;
}

type UseProgress = () => UseProgressReturn;

export const useProgress: UseProgress = () => {
  const { slug: anilibriaSlug } = useParams();

  const { data: progress, refetch: fetch } = useQuery({
    queryKey: [KimikastQueryKeys.PROGRESS],
    queryFn: () => progressApi.getProgress(anilibriaSlug?.toString()),
    enabled: false,
  });

  const { mutate: update } = useMutation({
    mutationFn: (dto: Progress) =>
      progressApi.updateProgress(anilibriaSlug?.toString(), dto),
  });

  return {
    progress,
    update,
    fetch,
  };
};
