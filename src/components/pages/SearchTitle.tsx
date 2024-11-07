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
import { searchTitles } from "@/services/api/anilibria";
import TitleListLoader from "@/components/shared/UI/Loaders/TitleListLoader";

const SearchTitle: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams?.get("q");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [AnilibriaQueryKeys.SEARCH, search],
    queryFn: () => searchTitles({ search: search! }),
    enabled: !!search,
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
        <Col xs={6}>
          <Input
            size="lg"
            placeholder="Название"
            defaultValue={search ?? ""}
            onChange={changeHandler}
          />
        </Col>
        <Col xs={12}>
          <Row className="pt-6">
            {search ? (
              <>
                {isSuccess && <TitleList list={data.list} />}
                {isLoading && <TitleListLoader />}
              </>
            ) : (
              <Col xs={12}>
                <div className="text-xl pt-2">Введите запрос</div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchTitle;
