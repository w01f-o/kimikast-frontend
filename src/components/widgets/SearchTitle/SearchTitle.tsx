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

const SearchTitle: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams?.get("search");

  const changeHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;
      const params = new URLSearchParams();
      params.set("search", value);

      if (value === "") {
        params.delete("search");
      }

      router.push(`${RoutePaths.SEARCH}?${params.toString()}`);
    },
    200,
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
              <TitleList search={search} />
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
