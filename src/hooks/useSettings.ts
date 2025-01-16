import { settingsStore } from '@/store/settings.store';
import { useStore } from '@tanstack/react-store';

export const useSettings = () => {
  const settings = useStore(settingsStore);

  const toggleSnow = () => {
    settingsStore.setState(prev => ({
      ...prev,
      isSnowEnabled: !prev.isSnowEnabled,
    }));
  };

  return {
    snow: {
      isEnabled: settings.isSnowEnabled,
      toggle: toggleSnow,
    },
  };
};
