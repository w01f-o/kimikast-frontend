import { Store } from '@tanstack/store';
import { PlayerHls } from '@/types/anilibria/entities/Player.type';

interface PlayerState {
  duration: number;
  currentTime: number;
  seek: number;
  bufferProgress: number;
  isPlaying: boolean;
  isLoading: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  volume: number;
  quality: keyof PlayerHls;
}

const initialState: PlayerState = {
  duration: 0,
  currentTime: 0,
  seek: 0,
  bufferProgress: 0,
  isPlaying: false,
  isLoading: true,
  isMuted: false,
  isFullscreen: false,
  volume: 50,
  quality: 'fhd',
};

export const playerStore = new Store<PlayerState>(initialState);
