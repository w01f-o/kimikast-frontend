import { playerStore } from '@/features/player/lib/stores/player.store';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { useStore } from '@tanstack/react-store';
import { Pause, Play, Rewind } from 'lucide-react';
import { FC } from 'react';

export const PlayerPlayPause: FC = () => {
  const { isLoading, isPlaying } = useStore(playerStore);

  const playPause = () =>
    playerStore.setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));

  const rewindVideo = (type: 'minus' | 'plus') => () => {
    switch (type) {
      case 'minus':
        playerStore.setState(prev => ({
          ...prev,
          seek: prev.currentTime - 10,
        }));
        break;
      case 'plus':
        playerStore.setState(prev => ({
          ...prev,
          seek: prev.currentTime + 10,
        }));
        break;
    }
  };

  return (
    <div className="flex justify-center gap-4 self-center">
      {isLoading ? (
        <Spinner color={'white'} size={'lg'} className="" />
      ) : (
        <>
          <Button
            isIconOnly
            className="rounded-full"
            size={'lg'}
            onPress={rewindVideo('minus')}
          >
            <Rewind />
          </Button>
          <Button
            isIconOnly
            className="rounded-full"
            size={'lg'}
            onPress={playPause}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            isIconOnly
            className="rotate-180 rounded-full"
            size={'lg'}
            onPress={rewindVideo('plus')}
          >
            <Rewind />
          </Button>
        </>
      )}
    </div>
  );
};
