"use client";

import { ChangeEvent, FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Input } from "@nextui-org/input";
import { useDebounceCallback } from "usehooks-ts";
import TitleList from "@/components/widgets/Title/TitleList";
import { useQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import TitleListLoader from "@/components/shared/UI/Loaders/TitleListLoader";
import SearchFilter from "@/components/widgets/SearchFilter";
import { Pagination } from "@nextui-org/pagination";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";
import { useSearchFilters } from "@/hooks/useSearchFilters";

interface SearchTitleProps {
  query?: string;
  years?: string;
  genres?: string;
  page?: string;
}

const SearchTitle: FC<SearchTitleProps> = ({ query, years, genres, page }) => {
  const { data: paginationData, isLoading: paginationIsLoading } = useQuery({
    queryKey: [AnilibriaQueryKeys.PAGINATION, query, years, genres],
    queryFn: () =>
      anilibriaApi.searchTitles({
        search: query!,
        genres: genres!,
        year: years!,
        items_per_page: 18,
        filter: ["code"],
      }),
    enabled: !!query || !!genres || !!years,
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.SEARCH, query, years, genres, page],
    queryFn: () =>
      anilibriaApi.searchTitles({
        search: query!,
        genres: genres!,
        year: years!,
        items_per_page: 18,
        ...(page && { page: Number(page) }),
      }),
    enabled: (!!query || !!genres || !!years) && !!paginationData,
  });

  const setFilters = useSearchFilters();

  const changePageHandler = (page: number) => {
    setFilters({ page: String(page) });
  };

  const changeQueryHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;

      setFilters({ query: value });
    },
    300,
  );

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <h1 className="text-4xl mb-5">Поиск</h1>
        </Col>
        <Col xs={6} className="flex gap-4">
          <Input
            size="lg"
            placeholder="Название"
            defaultValue={query ?? ""}
            onChange={changeQueryHandler}
          />
          <SearchFilter />
        </Col>
        <Col xs={12}>
          <Row className="pt-6">
            {query || genres || years ? (
              <>
                {isSuccess && (
                  <>
                    <TitleList list={data.list} />
                    {paginationData!.pagination.pages > 1 && (
                      <Col xs={12} className="flex justify-center mb-6">
                        <Pagination
                          total={paginationData!.pagination.pages}
                          initialPage={1}
                          size={"lg"}
                          showControls
                          page={page ? Number(page) : 1}
                          onChange={changePageHandler}
                        />
                      </Col>
                    )}
                  </>
                )}
                {(isLoading || paginationIsLoading) && (
                  <TitleListLoader length={18} />
                )}
              </>
            ) : (
              <Col xs={12}>
                <div className="text-xl pt-2">Введите запрос</div>
              </Col>
            )}
            {isSuccess && data?.list.length === 0 && (
              <Col xs={12}>
                <div className="text-xl pt-2">Ничего не найдено</div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchTitle;
