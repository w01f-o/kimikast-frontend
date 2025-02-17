import { AnilibriaApi, Anime as TitleType } from '@/entities/anime';
import { RoutePaths } from '@/shared/router';
import { Card } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Image } from '@heroui/image';
import { useHover } from '@react-aria/interactions';
import { AnimatePresence, motion } from 'framer-motion';
import NextImage from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

interface TitleProps {
  title: TitleType;
}

export const Anime: FC<TitleProps> = ({ title }) => {
  const { isHovered, hoverProps } = useHover({});
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  const imageLoadHandler = () => setImageIsLoaded(true);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Card
      {...hoverProps}
      as={Link}
      href={`${RoutePaths.ANIME}/${title.code}`}
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
            className="pointer-events-none absolute bottom-1 left-1.5 right-1.5 z-20 max-h-[350px] rounded-[inherit] backdrop-brightness-[0.1]"
          >
            <div className="flex h-full flex-col px-4 py-6">
              <div className="mb-1 line-clamp-4 text-xl font-bold">
                {title.names.ru}
              </div>
              <div className="mb-2">{title.type.fullString}</div>
              <div className="flex flex-grow flex-col justify-end gap-2">
                {title.genres.slice(0, 3).map(genre => (
                  <Chip key={genre}>{genre}</Chip>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        as={NextImage}
        src={`${AnilibriaApi.IMAGE_URL}${title.posters.medium.url}`}
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
