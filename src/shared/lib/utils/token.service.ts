import { JwtTokens } from '@/shared/model';
import Cookies from 'js-cookie';

export const getAccessToken = (): string | null => {
  const accessToken = Cookies.get(JwtTokens.ACCESS);

  return accessToken ?? null;
};

export const saveAccessToken = (accessToken: string): void => {
  Cookies.set(JwtTokens.ACCESS, accessToken, {
    sameSite: 'strict',
    domain: process.env.NEXT_PUBLIC_BASE_CLIENT_DOMAIN,
    expires: 7,
  });
};

export const removeAccessToken = (): void => {
  Cookies.remove(JwtTokens.ACCESS);
};
