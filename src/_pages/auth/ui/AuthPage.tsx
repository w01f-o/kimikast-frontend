'use client';

import { AuthForm, ToggleAuth } from '@/_pages/auth/ui';
import { Col, Container, Row } from '@/shared/ui';
import { FC } from 'react';

interface AuthProps {
  type: 'login' | 'register';
}

export const AuthPage: FC<AuthProps> = ({ type }) => {
  return (
    <Container>
      <Row className="justify-center pt-56">
        <Col xs={4}>
          <AuthForm type={type} />
          <ToggleAuth type={type} />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
