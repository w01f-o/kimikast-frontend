import { Store } from "@tanstack/store";

export const settingsStore = new Store({
  isSnowEnabled: true,
});

export const enableSnow = () => {
  settingsStore.setState((prev) => ({ ...prev, isSnowEnabled: true }));
};

export const disableSnow = () => {
  settingsStore.setState((prev) => ({ ...prev, isSnowEnabled: false }));
};
