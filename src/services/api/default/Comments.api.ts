import { Comment } from '@/types/entities/Comment.type';
import { CreateCommentDto } from '@/types/dto/CreateComment.dto';
import {
  axiosDefault,
  axiosWithAuth,
} from '@/services/api/default/AxiosInstances';

export class CommentsApi {
  private static readonly ENDPOINT: string = 'comment';

  public static async findAll(anilibriaSlug: string): Promise<Comment[]> {
    const { data } = await axiosDefault.get<Comment[]>(
      `/${this.ENDPOINT}/${anilibriaSlug}`
    );

    return data;
  }

  public static async create(dto: CreateCommentDto): Promise<Comment> {
    const { data } = await axiosWithAuth.post<Comment>(
      `/${this.ENDPOINT}`,
      dto
    );

    return data;
  }
}
