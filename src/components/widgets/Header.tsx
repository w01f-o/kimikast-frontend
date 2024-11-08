import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/link";
import NavBar from "@/components/widgets/NavBar";
import Image from "next/image";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import { Button } from "@nextui-org/button";
import { Search } from "lucide-react";
import CurrentUser from "@/components/widgets/CurrentUser";

const Header: FC = () => {
  return (
    <header>
      <Container>
        <Row className="pt-8 items-center">
          <Col xs={10} className="flex items-center gap-6">
            <Link href={RoutePaths.HOME}>
              <Image
                src={"/logo.svg"}
                alt={"Kimikast"}
                width={60}
                height={60}
              />
            </Link>
            <NavBar />
          </Col>
          <Col xs={2}>
            <Row>
              <Col xs={9} className="flex justify-end">
                <Button
                  endContent={<Search />}
                  as={NextUILink}
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
