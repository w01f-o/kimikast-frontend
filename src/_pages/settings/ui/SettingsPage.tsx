'use client';

import { ToggleSnow } from '@/features/apperance';
import {
  AccountDeleter,
  AvatarChanger,
  NameChanger,
  PasswordChanger,
} from '@/features/user';
import { RoutePaths } from '@/shared/router';
import { Col, Container, PageHeading, Row } from '@/shared/ui';
import { Tab, Tabs } from '@heroui/tabs';
import Link from 'next/link';
import { FC } from 'react';

interface SettingsProps {
  tab?: string;
}

export const SettingsPage: FC<SettingsProps> = ({ tab }) => {
  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Настройки</PageHeading>
        </Col>
        <Col xs={12}>
          <Tabs selectedKey={tab ?? 'account'} size={'lg'} className="mb-4">
            <Tab
              key="account"
              title="Аккаунт"
              href={`${RoutePaths.SETTINGS}?${new URLSearchParams({ tab: 'account' })}`}
              as={Link}
            >
              <div className="flex flex-col gap-8">
                <AvatarChanger />
                <NameChanger />
                <PasswordChanger />
                <AccountDeleter />
              </div>
            </Tab>
            <Tab
              key="apperance"
              title="Внешний вид"
              href={`${RoutePaths.SETTINGS}?${new URLSearchParams({ tab: 'apperance' })}`}
              as={Link}
            >
              <ToggleSnow />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};
