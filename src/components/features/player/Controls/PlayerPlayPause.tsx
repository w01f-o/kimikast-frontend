import { FC, useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { Pause, Play, Rewind } from "lucide-react";
import { useStore } from "@tanstack/react-store";
import { playerStore } from "@/store/player.store";

const PlayerPlayPause: FC = () => {
  const { isLoading, isPlaying } = useStore(playerStore);

  const playPause = () =>
    playerStore.setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));

  const rewindVideo = (type: "minus" | "plus") => () => {
    switch (type) {
      case "minus":
        playerStore.setState((prev) => ({
          ...prev,
          seek: prev.currentTime - 10,
        }));
        break;
      case "plus":
        playerStore.setState((prev) => ({
          ...prev,
          seek: prev.currentTime + 10,
        }));
        break;
    }
  };

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowLeft":
          rewindVideo("minus")();
          break;

        case "ArrowRight":
          rewindVideo("plus")();
          break;

        case "Space":
          playPause();
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return (
    <div className="flex gap-4 justify-center self-center">
      {isLoading ? (
        <Spinner color={"white"} size={"lg"} className="" />
      ) : (
        <>
          <Button
            isIconOnly
            className="rounded-full"
            size={"lg"}
            onClick={rewindVideo("minus")}
          >
            <Rewind />
          </Button>
          <Button
            isIconOnly
            className="rounded-full"
            size={"lg"}
            onClick={playPause}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            isIconOnly
            className="rounded-full rotate-180"
            size={"lg"}
            onClick={rewindVideo("plus")}
          >
            <Rewind />
          </Button>
        </>
      )}
    </div>
  );
};

export default PlayerPlayPause;
