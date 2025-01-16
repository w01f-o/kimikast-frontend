'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { useAuth } from '@/hooks/useAuth';
import { getAccessToken } from '@/services/auth/token.service';
import { UserApi } from '@/services/api/default/User.api';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { accessToken, setAccessToken, login } = useAuth();

  const { data, isSuccess } = useQuery({
    queryKey: [DefaultQueryKeys.USER],
    queryFn: () => UserApi.find(),
    retry: false,
    enabled: !!accessToken,
  });

  useEffect(() => {
    const accessTokenFromCookie = getAccessToken();
    if (accessTokenFromCookie) {
      setAccessToken(accessTokenFromCookie);
    }
  }, [setAccessToken]);

  useEffect(() => {
    if (data && isSuccess && accessToken) {
      login(data);
    }
  }, [accessToken, data, isSuccess, login]);

  return children;
};

export default AuthProvider;
