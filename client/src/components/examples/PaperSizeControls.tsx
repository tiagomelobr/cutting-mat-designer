import { useState } from 'react';
import PaperSizeControls from '../PaperSizeControls';

export default function PaperSizeControlsExample() {
  const [enabledSizes, setEnabledSizes] = useState(['A4', 'Letter']);
  const [rotatedSizes, setRotatedSizes] = useState<string[]>([]);
  
  return (
    <div className="p-4 bg-sidebar max-w-md">
      <PaperSizeControls
        enabledPaperSizes={enabledSizes}
        rotatedPaperSizes={rotatedSizes}
        onEnabledPaperSizesChange={setEnabledSizes}
        onRotatedPaperSizesChange={setRotatedSizes}
      />
    </div>
  );
}
