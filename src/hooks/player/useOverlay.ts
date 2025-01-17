import { MouseEvent, useRef, useState } from 'react';

export interface UseOverlayReturn {
  isVisible: boolean;
  overlayProps: {
    onMouseMove: (e: MouseEvent<HTMLVideoElement>) => void;
    onMouseLeave: (e: MouseEvent<HTMLVideoElement>) => void;
  };
}

interface UseOverlayParams {
  timeout: number;
  initialState?: boolean;
}

type UseOverlayType = (params: UseOverlayParams) => UseOverlayReturn;

export const useOverlay: UseOverlayType = ({
  timeout,
  initialState = false,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mouseMoveHandler = (e: MouseEvent<HTMLVideoElement>) => {
    e.stopPropagation();
    setIsVisible(true);

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(timeoutRef.current!);
        timeoutRef.current = null;
      }, timeout);
    }
  };

  const mouseLeaveHandler = (e: MouseEvent<HTMLVideoElement>) => {
    e.stopPropagation();
    setIsVisible(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return {
    isVisible: isVisible,
    overlayProps: {
      onMouseMove: mouseMoveHandler,
      onMouseLeave: mouseLeaveHandler,
    },
  };
};
