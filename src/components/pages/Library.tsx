"use client";

import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { useQuery } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { listsApi } from "@/services/api/kimikast/Lists.api";
import UserListCollection from "@/components/widgets/UserListCollection";
import UserListCollectionLoader from "@/components/shared/UI/Loaders/UserListCollectionLoader";

const Library: FC = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [KimikastQueryKeys.LISTS],
    queryFn: listsApi.findAll,
  });

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <h1 className="text-4xl mb-4">Моя библиотека</h1>
        </Col>
        {isLoading && <UserListCollectionLoader />}
        {isSuccess && <UserListCollection lists={data} />}
      </Row>
    </Container>
  );
};

export default Library;
