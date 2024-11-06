import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { searchTitles } from "@/services/api/anilibria";
import Col from "@/components/shared/layout/Col";
import Title from "@/components/entities/Title";
import { Skeleton } from "@nextui-org/skeleton";

interface TitleListProps {
  search: string | null;
}

const TitleList: FC<TitleListProps> = ({ search }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.SEARCH, search],
    queryFn: () => searchTitles({ search: search! }),
    enabled: !!search,
  });

  if (isLoading)
    return Array.from({ length: 12 }).map((_, i) => (
      <Col xs={2} key={i}>
        <Skeleton className="h-[350px] rounded-2xl mb-6" />
      </Col>
    ));

  if (isSuccess && data.list.length > 0)
    return data.list.map((title) => (
      <Col xs={2} key={title.id}>
        <Title title={title} />
      </Col>
    ));

  if (isSuccess && data.list.length === 0)
    return (
      <Col xs={12}>
        <div className="text-center text-4xl pt-8">Ничего не найдено</div>
      </Col>
    );
};

export default TitleList;
