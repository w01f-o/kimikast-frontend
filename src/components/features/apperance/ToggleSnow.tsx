'use client';

import { FC } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Switch } from '@heroui/switch';

const ToggleSnow: FC = () => {
  const {
    snow: { isEnabled, toggle },
  } = useSettings();

  return (
    <Switch isSelected={isEnabled} onValueChange={toggle}>
      Снег на страницах
    </Switch>
  );
};

export default ToggleSnow;
