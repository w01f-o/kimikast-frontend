import { FC } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import Col from "@/components/shared/layout/Col";

const CollectionListLoader: FC = () => {
  return Array.from({ length: 12 }).map((_, i) => (
    <Col xs={2} key={i}>
      <Skeleton className="h-[150px] rounded-2xl mb-6" />
    </Col>
  ));
};

export default CollectionListLoader;