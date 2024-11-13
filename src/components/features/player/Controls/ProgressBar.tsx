import { FC, useEffect, useState } from "react";
import Time from "@/components/shared/UI/Text/Time";
import { Slider } from "@nextui-org/slider";
import { useStore } from "@tanstack/react-store";
import { playerStore } from "@/store/player.store";
import { useDebounceCallback } from "usehooks-ts";

const ProgressBar: FC = () => {
  const { duration, currentTime } = useStore(playerStore);

  const [localCurrentTime, setLocalCurrentTime] = useState(currentTime);

  const debouncedSetCurrentTime = useDebounceCallback((time) => {
    playerStore.setState((prev) => ({ ...prev, seek: time }));
  }, 300);

  const changeCurrentTimeHandler = (value: number | number[]) => {
    const time = Math.round(value as number);
    setLocalCurrentTime(time);
  };

  useEffect(() => {
    debouncedSetCurrentTime(localCurrentTime);
  }, [localCurrentTime, debouncedSetCurrentTime]);

  return (
    <div className="flex gap-6 flex-grow items-center">
      <Time time={localCurrentTime} />
      <Slider
        aria-label={"Video progress"}
        classNames={{
          track: "bg-default-500/30 h-2.5",
          thumb: "w-3.5 h-3.5 after:w-3.5 after:h-3.5 after:bg-foreground",
        }}
        className="flex-grow"
        color="foreground"
        value={localCurrentTime}
        onChange={changeCurrentTimeHandler}
        step={0.01}
        maxValue={duration}
      />
      <Time time={duration} />
    </div>
  );
};

export default ProgressBar;
