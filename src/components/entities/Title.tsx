import { FC, useState } from "react";
import type { Title as TitleType } from "@/types/entities/Title.type";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import NextImage from "next/image";
import { useHover } from "@react-aria/interactions";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { ANILIBRIA_IMAGE_URL } from "@/services/api/anilibria/Anilibria.api";

interface TitleProps {
  title: TitleType;
}

const Title: FC<TitleProps> = ({ title }) => {
  const { isHovered, hoverProps } = useHover({});
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  const imageLoadHandler = () => setImageIsLoaded(true);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Card
      {...hoverProps}
      as={Link}
      href={`${RoutePaths.TITLE}/${title.code}`}
      disableAnimation
      isPressable={true}
      aria-label={`Посмотреть информацию об "${title.names.ru}"`}
    >
      <AnimatePresence>
        {isHovered && imageIsLoaded && (
          <motion.div
            initial={{ y: 350, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 350, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.2, 1],
            }}
            className="absolute z-20 backdrop-brightness-[0.1] max-h-[350px] bottom-1 left-1.5 right-1.5 pointer-events-none rounded-[inherit]"
          >
            <div className="flex flex-col px-4 py-6 h-full">
              <div className="font-bold text-xl mb-1 line-clamp-4">
                {title.names.ru}
              </div>
              <div className="mb-2">{title.type.full_string}</div>
              <div className="flex-grow flex flex-col gap-2 justify-end">
                {title.genres.slice(0, 3).map((genre) => (
                  <Chip key={genre}>{genre}</Chip>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        as={NextImage}
        src={`${ANILIBRIA_IMAGE_URL}${title.posters.medium.url}`}
        width={400}
        height={350}
        alt={`Постер ${title.names.ru}`}
        priority
        isZoomed
        onLoad={imageLoadHandler}
      />
    </Card>
  );
};

export default Title;
