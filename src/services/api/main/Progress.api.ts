import { axiosMainWithAuth } from "@/services/api/interceptors";
import { UpdateProgressDto } from "@/types/dto/UpdateProgress.dto";
import { Progress } from "@/types/entities/Progress";

const ENDPOINT = "progress";

export const getProgress = async (anilibriaSlug: string | undefined) => {
  if (anilibriaSlug === undefined) {
    throw new Error("Anilibria slug is undefined");
  }

  const { data } = await axiosMainWithAuth.get<Progress>(
    `/${ENDPOINT}/${anilibriaSlug}`,
  );

  return data;
};

export const updateProgress = async (
  anilibriaSlug: string | undefined,
  dto: UpdateProgressDto,
) => {
  if (anilibriaSlug === undefined) {
    throw new Error("Anilibria slug is undefined");
  }

  const { data } = await axiosMainWithAuth.patch<Progress>(
    `/${ENDPOINT}/${anilibriaSlug}`,
    dto,
  );

  return data;
};

export const progressApi = {
  getProgress,
  updateProgress,
};
