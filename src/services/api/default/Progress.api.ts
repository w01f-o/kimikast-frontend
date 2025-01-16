import { UpdateProgressDto } from '@/types/dto/UpdateProgress.dto';
import { Progress } from '@/types/entities/Progress';
import { axiosWithAuth } from '@/services/api/default/AxiosInstances';

export class ProgressApi {
  private static readonly ENDPOINT: string = 'progress';

  public static async getBySlug(
    anilibriaSlug: string | undefined
  ): Promise<Progress> {
    if (anilibriaSlug === undefined) return Promise.reject();

    const { data } = await axiosWithAuth.get<Progress>(
      `/${this.ENDPOINT}/${anilibriaSlug}`
    );

    return data;
  }

  public static async update(
    anilibriaSlug: string | undefined,
    dto: UpdateProgressDto
  ): Promise<Progress> {
    if (anilibriaSlug === undefined) return Promise.reject();

    const { data } = await axiosWithAuth.patch<Progress>(
      `/${this.ENDPOINT}/${anilibriaSlug}`,
      dto
    );

    return data;
  }
}
