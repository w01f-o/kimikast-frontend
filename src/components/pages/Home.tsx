"use client";

import { FC, useEffect } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { useIntersectionObserver } from "usehooks-ts";
import TitleListLoader from "@/components/shared/UI/Loaders/TitleListLoader";
import TitleList from "@/components/widgets/Title/TitleList";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";
import PageHeading from "@/components/shared/UI/Text/PageHeading";

const Home: FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [AnilibriaQueryKeys.UPDATES],
      queryFn: ({ pageParam }) =>
        anilibriaApi.getTitleUpdates({ page: pageParam, items_per_page: 24 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage?.pagination?.current_page + 1 || undefined,
      getPreviousPageParam: (firstPage) =>
        firstPage?.pagination?.current_page - 1 || undefined,
    });

  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Свежее</PageHeading>
        </Col>
        {data?.pages.map((page) => (
          <TitleList key={page.pagination.current_page} list={page.list} />
        ))}
        {isFetchingNextPage && <TitleListLoader length={24} />}
        <div ref={ref} className="w-full h-10"></div>
      </Row>
    </Container>
  );
};

export default Home;
