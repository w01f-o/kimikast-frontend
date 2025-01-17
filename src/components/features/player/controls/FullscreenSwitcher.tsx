import { FC } from 'react';
import { Button } from '@heroui/button';
import { Fullscreen } from 'lucide-react';
import { playerStore } from '@/store/player.store';

const FullscreenSwitcher: FC = () => {
  const fullscreenClickHandler = () => {
    playerStore.setState(prev => ({
      ...prev,
      isFullscreen: !prev.isFullscreen,
    }));
  };

  return (
    <Button
      isIconOnly
      size={'md'}
      variant={'light'}
      title={'Полноэкранный режим'}
      onPress={fullscreenClickHandler}
    >
      <Fullscreen className="size-2/3" />
    </Button>
  );
};

export default FullscreenSwitcher;
