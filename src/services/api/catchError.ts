import axios from "axios";

export const catchError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message;
  }

  throw error;
};
