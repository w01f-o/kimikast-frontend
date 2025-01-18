import { MiddlewareFactory } from '@/shared/model';
import { NextMiddleware, NextResponse } from 'next/server';

export const combineMiddlewares = (
  callbacks: MiddlewareFactory[] = []
): NextMiddleware => {
  const createMiddleware = (index: number): NextMiddleware => {
    const current = callbacks[index];
    if (current) {
      const next = createMiddleware(index + 1);

      return current(next);
    }

    return () => NextResponse.next();
  };

  return createMiddleware(0);
};
