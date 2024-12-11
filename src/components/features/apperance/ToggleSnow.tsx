"use client";

import { FC } from "react";
import { useSettings } from "@/hooks/useSettings";
import { Switch } from "@nextui-org/switch";

const ToggleSnow: FC = () => {
  const { snow } = useSettings();

  return (
    <Switch isSelected={snow.isEnabled} onValueChange={snow.toggle}>
      Снег на странице
    </Switch>
  );
};

export default ToggleSnow;
