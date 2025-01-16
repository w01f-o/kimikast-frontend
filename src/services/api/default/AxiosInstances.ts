import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { getAccessToken } from '@/services/auth/token.service';
import { catchAxiosError } from '@/services/utils/catchAxiosError';
import { ApiErrors } from '@/enums/ApiErrors.enum';
import { AuthApi } from '@/services/api/default/Auth.api';

export class AxiosInstances {
  public axiosDefault: AxiosInstance;
  public axiosWithAuth: AxiosInstance;

  public constructor() {
    const OPTIONS: CreateAxiosDefaults = {
      baseURL: process.env.NEXT_PUBLIC_KIMIKAST_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    this.axiosDefault = axios.create(OPTIONS);
    this.axiosWithAuth = this.setTokensInterceptor(axios.create(OPTIONS));
  }

  private setTokensInterceptor(instance: AxiosInstance): AxiosInstance {
    instance.interceptors.request.use(
      request => {
        const accessToken = getAccessToken();
        if (request?.headers && accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }

        return request;
      },
      error => Promise.reject(error)
    );

    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error?.config;
        const isTokensError =
          error?.response?.status === 401 &&
          (catchAxiosError(error) === ApiErrors.ACCESS_TOKEN_EXPIRED ||
            catchAxiosError(error) === ApiErrors.INVALID_ACCESS_TOKEN ||
            catchAxiosError(error) === ApiErrors.UNAUTHORIZED);

        if (isTokensError && originalRequest && !originalRequest._isRetry) {
          originalRequest._isRetry = true;

          try {
            await AuthApi.refresh();

            return this.axiosWithAuth.request(originalRequest);
          } catch (refreshError) {
            if (
              catchAxiosError(refreshError) ===
                ApiErrors.REFRESH_TOKEN_EXPIRED ||
              catchAxiosError(refreshError) === ApiErrors.INVALID_REFRESH_TOKEN
            ) {
              await AuthApi.logout();
            }
          }
        }

        throw error;
      }
    );

    return instance;
  }
}

export const { axiosDefault, axiosWithAuth } = new AxiosInstances();
