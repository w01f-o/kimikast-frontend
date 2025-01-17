import { FC } from 'react';
import { Spinner } from '@heroui/spinner';
import { Button } from '@heroui/button';
import { Pause, Play, Rewind } from 'lucide-react';
import { useStore } from '@tanstack/react-store';
import { playerStore } from '@/store/player.store';

const PlayerPlayPause: FC = () => {
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

export default PlayerPlayPause;
