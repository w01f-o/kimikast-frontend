import { FC } from "react";
import Col from "@/components/shared/layout/Col";
import { Skeleton } from "@nextui-org/skeleton";

interface TitleListLoaderProps {
  length?: number;
}

const TitleListLoader: FC<TitleListLoaderProps> = ({ length }) => {
  return Array.from({ length: length ?? 12 }).map((_, i) => (
    <Col xs={2} key={i}>
      <Skeleton className="h-[350px] rounded-2xl mb-6" />
    </Col>
  ));
};

export default TitleListLoader;
