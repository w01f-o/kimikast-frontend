'use client';

import { useSettings } from '@/shared/lib';
import { Switch } from '@heroui/switch';
import { FC } from 'react';

export const ToggleSnow: FC = () => {
  const {
    snow: { isEnabled, toggle },
  } = useSettings();

  return (
    <Switch isSelected={isEnabled} onValueChange={toggle}>
      Снег на страницах
    </Switch>
  );
};
