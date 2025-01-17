import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import Link from 'next/link';
import NavBar from '@/components/widgets/NavBar';
import Image from 'next/image';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { Button } from '@heroui/button';
import { Search } from 'lucide-react';
import CurrentUser from '@/components/widgets/CurrentUser';

const Header: FC = () => {
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

export default Header;
