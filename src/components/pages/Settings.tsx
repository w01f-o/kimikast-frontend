import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";

const Settings: FC = () => {
  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <h1 className="text-4xl">Настройки</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
