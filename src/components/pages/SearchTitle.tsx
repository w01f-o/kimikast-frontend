"use client";

import { ChangeEvent, FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Input } from "@nextui-org/input";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import TitleList from "@/components/widgets/Title/TitleList";
import { useQuery } from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import TitleListLoader from "@/components/shared/UI/Loaders/TitleListLoader";
import SearchFilter from "@/components/widgets/SearchFilter";
import { Pagination } from "@nextui-org/pagination";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";

const SearchTitle: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams?.get("q");
  const years = searchParams?.get("years");
  const genres = searchParams?.get("genres");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.SEARCH, query, years, genres],
    queryFn: () =>
      anilibriaApi.searchTitles({
        search: query!,
        genres: genres!,
        year: years!,
        items_per_page: 18,
      }),
    enabled: !!query || !!genres || !!years,
  });

  const changeHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;
      const params = new URLSearchParams();
      params.set("q", value);

      if (value === "") {
        params.delete("q");
      }

      router.push(`${RoutePaths.SEARCH}?${params.toString()}`);
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
            onChange={changeHandler}
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
                    {data?.pagination.pages > 1 && (
                      <Col xs={12} className="flex justify-center mb-6">
                        <Pagination
                          total={data?.pagination.pages}
                          initialPage={1}
                          size={"lg"}
                          showControls
                        />
                      </Col>
                    )}
                  </>
                )}
                {isLoading && <TitleListLoader length={18} />}
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
