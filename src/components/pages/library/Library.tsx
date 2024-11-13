"use client";

import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { useQuery } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { listsApi } from "@/services/api/main/Lists.api";
import CollectionList from "@/components/widgets/CollectionList";
import CollectionListLoader from "@/components/shared/UI/Loaders/CollectionListLoader";
import PageHeading from "@/components/shared/UI/Text/PageHeading";

const Library: FC = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [KimikastQueryKeys.LISTS],
    queryFn: listsApi.findAll,
  });

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Моя библиотека</PageHeading>
        </Col>
        {isLoading && <CollectionListLoader />}
        {isSuccess && <CollectionList lists={data} />}
      </Row>
    </Container>
  );
};

export default Library;
