import { useState, useEffect } from 'react';
import type { AppConfig } from '../types';
import { loadConfig, saveConfig } from '../utils/storage';

export const useConfig = () => {
  const [config, setConfig] = useState<AppConfig>(loadConfig);

  useEffect(() => {
    saveConfig(config);
  }, [config]);

  return { config, setConfig };
};
