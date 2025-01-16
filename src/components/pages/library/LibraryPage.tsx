'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import CollectionList from '@/components/widgets/CollectionList';
import CollectionListLoader from '@/components/shared/ui/loaders/CollectionListLoader';
import PageHeading from '@/components/shared/ui/text/PageHeading';
import { useLists } from '@/hooks/api/useLists';

const LibraryPage: FC = () => {
  const { lists, isSuccess, isLoading } = useLists();

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Моя библиотека</PageHeading>
        </Col>
        {isLoading && <CollectionListLoader />}
        {isSuccess && <CollectionList lists={lists!} />}
      </Row>
    </Container>
  );
};

export default LibraryPage;
