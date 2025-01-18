import { RoutePaths } from '@/shared/router';
import { Col, Container, CurrentUser, Row } from '@/shared/ui';
import { NavBar } from '@/widgets/header/ui';
import { Button } from '@heroui/button';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header>
      <Container>
        <Row className="items-center pt-8">
          <Col xs={10} className="flex items-center gap-6">
            <Link href={RoutePaths.HOME}>
              <Image
                src={'/kimikast/logo.svg'}
                alt={'Kimikast'}
                width={60}
                height={60}
                priority
              />
            </Link>
            <NavBar />
          </Col>
          <Col xs={2}>
            <Row>
              <Col xs={9} className="flex justify-end">
                <Button
                  endContent={<Search />}
                  as={Link}
                  href={RoutePaths.SEARCH}
                  isIconOnly
                />
              </Col>
              <Col xs={3}>
                <CurrentUser />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
