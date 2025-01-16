import { axiosMain, axiosMainWithAuth } from '@/services/api/interceptors';
import { CreateCommentDto } from '@/types/dto/createComment.dto';
import { Comment } from '@/types/entities/Comment.type';

const ENDPOINT = 'comment';

const getComments = async (anilibriaSlug: string): Promise<Comment[]> => {
  const { data } = await axiosMain.get<Comment[]>(
    `/${ENDPOINT}/${anilibriaSlug}`
  );

  return data;
};

const createComment = async (dto: CreateCommentDto): Promise<Comment> => {
  const { data } = await axiosMainWithAuth.post<Comment>(`/${ENDPOINT}`, dto);

  return data;
};

export const commentsApi = { getComments, createComment };
