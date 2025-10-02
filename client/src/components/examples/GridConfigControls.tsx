import { useState } from 'react';
import GridConfigControls from '../GridConfigControls';
import { GridConfig } from '@/types/cutting-mat';

export default function GridConfigControlsExample() {
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    primaryInterval: 1,
    secondaryInterval: 0.5,
    tertiaryInterval: 0.25,
    primaryWeight: 1.5,
    secondaryWeight: 0.75,
    tertiaryWeight: 0.5,
    primaryStyle: 'solid',
    secondaryStyle: 'dashed',
    tertiaryStyle: 'dotted',
    primaryColor: '#718096',
    secondaryColor: '#a0aec0',
    tertiaryColor: '#cbd5e0',
  });
  
  return (
    <div className="p-4 bg-sidebar max-w-md">
      <GridConfigControls
        gridConfig={gridConfig}
        onGridConfigChange={setGridConfig}
      />
    </div>
  );
}
