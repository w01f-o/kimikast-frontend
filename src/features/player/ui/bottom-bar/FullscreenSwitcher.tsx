import { playerStore } from '@/features/player';
import { Button } from '@heroui/button';
import { Fullscreen } from 'lucide-react';
import { FC } from 'react';

export const FullscreenSwitcher: FC = () => {
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
