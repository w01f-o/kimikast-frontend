import { FC } from "react";

interface TimeProps {
  time: number;
}

const Time: FC<TimeProps> = ({ time }) => {
  const hours = Math.round(time / 3600);
  const minutes = Math.round((time % 3600) / 60);
  const seconds = time % 60;

  if (hours === 0) {
    return (
      <div className="text-center text-lg">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    );
  }

  return (
    <div className="text-center text-lg">
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Time;
