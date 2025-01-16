import { isAxiosError } from 'axios';

export const catchError = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    return error.response.data.message;
  }

  throw error;
};
