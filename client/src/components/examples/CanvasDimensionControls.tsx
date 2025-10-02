import { useState } from 'react';
import CanvasDimensionControls from '../CanvasDimensionControls';
import { MeasurementUnit } from '@/types/cutting-mat';

export default function CanvasDimensionControlsExample() {
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(12);
  const [unit, setUnit] = useState<MeasurementUnit>('inches');
  
  return (
    <div className="p-4 bg-sidebar">
      <CanvasDimensionControls
        width={width}
        height={height}
        unit={unit}
        onWidthChange={setWidth}
        onHeightChange={setHeight}
        onUnitChange={setUnit}
      />
    </div>
  );
}
