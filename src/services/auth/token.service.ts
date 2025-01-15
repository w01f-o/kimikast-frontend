import Cookies from "js-cookie";
import { JwtTokens } from "@/enums/JwtTokens.enum";
import { accessTokenStore } from "@/store/user.store";

export const getAccessToken = (): string | null => {
  const accessToken = Cookies.get(JwtTokens.ACCESS);

  return accessToken ?? null;
};

export const saveAccessToken = (accessToken: string): void => {
  accessTokenStore.setState(() => accessToken);
  console.log(process.env.NEXT_PUBLIC_BASE_CLIENT_DOMAIN);
  Cookies.set(JwtTokens.ACCESS, accessToken, {
    sameSite: "strict",
    domain: process.env.NEXT_PUBLIC_BASE_CLIENT_DOMAIN,
    expires: 7,
  });
};

export const removeAccessToken = (): void => {
  accessTokenStore.setState(() => null);

  Cookies.remove(JwtTokens.ACCESS);
};
