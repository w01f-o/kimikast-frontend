import axios, { CreateAxiosDefaults } from "axios";
import { getAccessToken } from "@/services/auth/token.service";
import { ApiErrors } from "@/enums/ApiErrors.enum";
import { catchError } from "@/services/api/catchError";
import { authApi } from "@/services/api/kimikast/Auth.api";

const kimikastOptions: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_KIMIKAST_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const anilibriaOptions: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_ANILIBRIA_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosAnilibria = axios.create(anilibriaOptions);

export const axiosKimikast = axios.create(kimikastOptions);
export const axiosKimikastWithAuth = axios.create(kimikastOptions);

axiosKimikastWithAuth.interceptors.request.use(
  (request) => {
    const accessToken = getAccessToken();

    if (request?.headers && accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

axiosKimikastWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest } = error;

    const isTokensError =
      error.status === 401 &&
      (catchError(error) === ApiErrors.ACCESS_TOKEN_EXPIRED ||
        catchError(error) === ApiErrors.INVALID_ACCESS_TOKEN ||
        catchError(error) === ApiErrors.UNAUTHORIZED);
    console.log(isTokensError);
    if (isTokensError && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        await authApi.refresh();

        return axiosKimikastWithAuth.request(originalRequest);
      } catch (error) {
        if (
          catchError(error) === ApiErrors.REFRESH_TOKEN_EXPIRED ||
          catchError(error) === ApiErrors.INVALID_REFRESH_TOKEN
        ) {
          console.log("da");
          await authApi.logout();
        }
      }
    }

    throw error;
  },
);