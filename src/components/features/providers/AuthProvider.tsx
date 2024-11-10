"use client";

import { FC, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { userApi } from "@/services/api/main/User.api";
import { useAuth } from "@/hooks/useAuth";
import { getAccessToken } from "@/services/auth/token.service";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { accessToken, setAccessToken, login } = useAuth();

  const { data, isSuccess } = useQuery({
    queryKey: [KimikastQueryKeys.USER],
    queryFn: userApi.getUser,
    retry: false,
    enabled: !!accessToken,
  });

  useEffect(() => {
    const accessTokenFromCookie = getAccessToken();
    if (accessTokenFromCookie) {
      setAccessToken(accessTokenFromCookie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && isSuccess && accessToken) {
      login(data);
    }
  }, [accessToken, data, isSuccess, login]);

  return children;
};

export default AuthProvider;
