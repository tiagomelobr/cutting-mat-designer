import type { AppConfig } from '../types';
import { DEFAULT_CONFIG, STORAGE_KEY } from '../config/constants';

export const saveConfig = (config: AppConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save configuration:', error);
  }
};

export const loadConfig = (): AppConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load configuration:', error);
  }
  return DEFAULT_CONFIG;
};

export const clearConfig = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const resetConfig = (): AppConfig => {
  clearConfig();
  return DEFAULT_CONFIG;
};
