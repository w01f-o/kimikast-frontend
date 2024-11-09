"use client";

import { FC } from "react";
import Container from "@/components/shared/layout/Container";
import Row from "@/components/shared/layout/Row";
import Col from "@/components/shared/layout/Col";
import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Switch } from "@nextui-org/switch";
import { useSettings } from "@/hooks/useSettings";

const Settings: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedTab = searchParams.get("tab");
  const { snow } = useSettings();

  return (
    <Container>
      <Row className="pt-8">
        <Col xs={12}>
          <h1 className="text-4xl mb-4">Настройки</h1>
        </Col>
        <Col xs={12}>
          <Tabs
            selectedKey={selectedTab ?? "account"}
            size={"lg"}
            className="mb-4"
          >
            <Tab
              key="account"
              title="Аккаунт"
              href={`${pathname}?${new URLSearchParams({ tab: "account" })}`}
              as={Link}
            >
              <div>Аккаунт</div>
            </Tab>
            <Tab
              key="apperance"
              title="Внешний вид"
              href={`${pathname}?${new URLSearchParams({ tab: "apperance" })}`}
              as={Link}
            >
              <Switch isSelected={snow.isEnabled} onValueChange={snow.toggle}>
                Снег на странице
              </Switch>
            </Tab>
          </Tabs>
        </Col>
        {/*<Col xs={8}></Col>*/}
      </Row>
    </Container>
  );
};

export default Settings;
