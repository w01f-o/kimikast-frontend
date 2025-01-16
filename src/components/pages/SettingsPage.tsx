'use client';

import { FC } from 'react';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { Tab, Tabs } from '@nextui-org/tabs';
import Link from 'next/link';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import PageHeading from '@/components/shared/ui/text/PageHeading';
import ToggleSnow from '@/components/features/apperance/ToggleSnow';
import AccountDeleter from '@/components/features/user/AccountDeleter';
import PasswordChanger from '@/components/features/user/PasswordChanger';
import AvatarChanger from '@/components/features/user/AvatarChanger';
import NameChanger from '@/components/features/user/NameChanger';

interface SettingsProps {
  tab?: string;
}

const SettingsPage: FC<SettingsProps> = ({ tab }) => {
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

export default SettingsPage;
