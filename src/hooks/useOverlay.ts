import { MouseEvent, useRef, useState } from "react";

export interface useOverlayReturn {
  isVisible: boolean;
  overlayProps: {
    onMouseMove: (e: MouseEvent<HTMLVideoElement>) => void;
    onMouseLeave: (e: MouseEvent<HTMLVideoElement>) => void;
  };
}

interface useOverlayParams {
  timeout: number;
  initialState?: boolean;
}

type useOverlayType = (params: useOverlayParams) => useOverlayReturn;

export const useOverlay: useOverlayType = ({ timeout, initialState }) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState ?? false);
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
