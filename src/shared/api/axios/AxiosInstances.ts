import { AuthApi } from '@/entities/user';
import { catchAxiosError, getAccessToken } from '@/shared/lib';
import { ApiErrors } from '@/shared/model';
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

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
          error?.response?.status === 401 ||
          catchAxiosError(error) === ApiErrors.ACCESS_TOKEN_EXPIRED ||
          catchAxiosError(error) === ApiErrors.INVALID_ACCESS_TOKEN ||
          catchAxiosError(error) === ApiErrors.UNAUTHORIZED;

        if (isTokensError && originalRequest && !originalRequest._isRetry) {
          originalRequest._isRetry = true;

          try {
            await AuthApi.refresh();

            return this.axiosWithAuth.request(originalRequest);
          } catch {
            await AuthApi.logout();
          }
        }

        throw error;
      }
    );

    return instance;
  }
}

export const { axiosDefault, axiosWithAuth } = new AxiosInstances();
