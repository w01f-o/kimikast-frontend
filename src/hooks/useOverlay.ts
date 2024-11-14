import { MouseEvent, useRef, useState } from "react";

export interface useOverlayReturn {
  isVisible: boolean;
  overlayProps: {
    onMouseMove: (e: MouseEvent<HTMLVideoElement>) => void;
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

  return {
    isVisible: isVisible,
    overlayProps: {
      onMouseMove: mouseMoveHandler,
    },
  };
};
