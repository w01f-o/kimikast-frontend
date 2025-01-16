import { FC, useEffect, useState } from 'react';
import Time from '@/components/shared/ui/text/Time';
import { Slider } from '@nextui-org/slider';
import { useStore } from '@tanstack/react-store';
import { playerStore } from '@/store/player.store';

const ProgressBar: FC = () => {
  const { duration, currentTime } = useStore(playerStore);
  const [localCurrentTime, setLocalCurrentTime] = useState<number>(currentTime);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const changeCurrentTimeHandler = (value: number | number[]) => {
    setIsChanging(true);
    const time = Math.round(value as number);
    setLocalCurrentTime(time);
  };

  const changeCurrentTimeEndHandler = (value: number | number[]) => {
    const time = Math.round(value as number);
    setLocalCurrentTime(time);
    playerStore.setState(prev => ({
      ...prev,
      seek: time,
      currentTime: time,
    }));
    setIsChanging(false);
  };

  useEffect(() => {
    if (!isChanging) setLocalCurrentTime(currentTime);
  }, [currentTime, isChanging]);

  return (
    <div className="flex flex-grow items-center gap-6">
      <Time time={localCurrentTime} />
      <Slider
        aria-label={'Video progress'}
        classNames={{
          track: 'bg-default-500/30 h-2.5',
          thumb: 'w-3.5 h-3.5 after:w-3.5 after:h-3.5 after:bg-foreground',
        }}
        color="foreground"
        className="relative flex-grow"
        value={localCurrentTime}
        onChange={changeCurrentTimeHandler}
        onChangeEnd={changeCurrentTimeEndHandler}
        step={0.01}
        maxValue={duration}
      />
      <Time time={duration} />
    </div>
  );
};

export default ProgressBar;
