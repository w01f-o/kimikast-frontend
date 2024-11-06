import { FC, useState } from "react";
import type { Title } from "@/types/entities/Title.type";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import NextImage from "next/image";
import { ANILIBRIA_IMAGE_URL } from "@/services/api/anilibria";
import { useHover } from "@react-aria/interactions";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@nextui-org/image";

interface TitleProps {
  title: Title;
}

const Title: FC<TitleProps> = ({ title }) => {
  const { isHovered, hoverProps } = useHover({});
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  const imageLoadHandler = () => setImageIsLoaded(true);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Card
      as={Link}
      href={`${RoutePaths.TITLE}/${title.code}`}
      className="border-none dark:bg-default-100/60 mb-6"
      disableAnimation
      isPressable={true}
      {...hoverProps}
    >
      <AnimatePresence>
        {isHovered && imageIsLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 backdrop-brightness-[0.28] text-white px-5 py-8"
          >
            <div className="font-bold text-2xl">{title.names.ru}</div>
            <div className="text-sm line-clamp-4 mt-2 fon">
              {title.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        as={NextImage}
        src={`${ANILIBRIA_IMAGE_URL}${title.posters.medium.url}`}
        width={400}
        height={350}
        alt={title.code}
        priority
        onLoad={imageLoadHandler}
      />
    </Card>
  );
};

export default Title;
