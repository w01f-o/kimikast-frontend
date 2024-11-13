"use client";

import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { Switch } from "@nextui-org/switch";
import { useSettings } from "@/hooks/useSettings";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import PageHeading from "@/components/shared/UI/Text/PageHeading";

interface SettingsProps {
  tab?: string;
}

const Settings: FC<SettingsProps> = ({ tab }) => {
  const { snow } = useSettings();

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <PageHeading>Настройки</PageHeading>
        </Col>
        <Col xs={12}>
          <Tabs selectedKey={tab ?? "account"} size={"lg"} className="mb-4">
            <Tab
              key="account"
              title="Аккаунт"
              href={`${RoutePaths.SETTINGS}?${new URLSearchParams({ tab: "account" })}`}
              as={Link}
            >
              <div>Аккаунт</div>
            </Tab>
            <Tab
              key="apperance"
              title="Внешний вид"
              href={`${RoutePaths.SETTINGS}?${new URLSearchParams({ tab: "apperance" })}`}
              as={Link}
            >
              <Switch isSelected={snow.isEnabled} onValueChange={snow.toggle}>
                Снег на странице
              </Switch>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
