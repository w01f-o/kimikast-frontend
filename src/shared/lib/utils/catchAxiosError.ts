import { isAxiosError } from 'axios';

export const catchAxiosError = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    return error.response.data.message;
  }

  throw error;
};
