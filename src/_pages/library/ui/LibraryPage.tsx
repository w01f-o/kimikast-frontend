'use client';

import { useUserLists } from '@/entities/user-list';
import {
  Col,
  CollectionListLoader,
  Container,
  PageHeading,
  Row,
} from '@/shared/ui';
import { UserList } from '@/widgets/user-list';
import { FC } from 'react';

export const LibraryPage: FC = () => {
  const { lists, isSuccess, isLoading } = useUserLists();

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Моя библиотека</PageHeading>
        </Col>
        {isLoading && <CollectionListLoader />}
        {isSuccess && <UserList lists={lists!} />}
      </Row>
    </Container>
  );
};
