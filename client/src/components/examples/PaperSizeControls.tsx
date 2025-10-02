import { useState } from 'react';
import PaperSizeControls from '../PaperSizeControls';

export default function PaperSizeControlsExample() {
  const [enabledSizes, setEnabledSizes] = useState(['A4', 'Letter']);
  
  return (
    <div className="p-4 bg-sidebar max-w-md">
      <PaperSizeControls
        enabledPaperSizes={enabledSizes}
        onEnabledPaperSizesChange={setEnabledSizes}
      />
    </div>
  );
}
