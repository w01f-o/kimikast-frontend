import { playerStore } from '@/features/player/lib/stores/player.store';
import { VolumeIcon } from '@/shared/ui/icons';
import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Slider } from '@heroui/slider';
import { useHover } from '@react-aria/interactions';
import { useStore } from '@tanstack/react-store';
import { FC } from 'react';

export const VolumeChanger: FC = () => {
  const { volume, isMuted } = useStore(playerStore);

  const changeVolumeHandler = (value: number | number[]) => {
    const volume = value as number;

    if (isMuted && volume > 0) {
      playerStore.setState(prev => ({ ...prev, isMuted: false }));
    }

    playerStore.setState(prev => ({ ...prev, volume }));
  };

  const muteClickHandler = () => {
    playerStore.setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const { isHovered, hoverProps } = useHover({});

  return (
    <Popover isOpen={isHovered}>
      <PopoverTrigger>
        <div className="relative">
          <div {...hoverProps} className="absolute bottom-full w-full pt-2" />
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-expect-error*/}
          <Button
            size={'md'}
            isIconOnly
            variant={'light'}
            title={'Громкость'}
            onPress={muteClickHandler}
            {...hoverProps}
          >
            <VolumeIcon isMuted={isMuted} volume={volume} />
          </Button>
        </div>
      </PopoverTrigger>
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/*@ts-expect-error*/}
      <PopoverContent className="h-36 w-10" {...hoverProps}>
        <Slider
          aria-label="Music progress"
          classNames={{
            track: 'bg-default-500/30 my-2 w-2.5',
            thumb: 'w-5 h-5 after:w-5 after:h-5 after:bg-foreground',
          }}
          orientation={'vertical'}
          className="flex-grow"
          color="foreground"
          step={10}
          maxValue={100}
          value={volume}
          onChange={changeVolumeHandler}
        />
      </PopoverContent>
    </Popover>
  );
};
