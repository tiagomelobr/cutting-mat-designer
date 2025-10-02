import { useState } from 'react';
import ColorPicker from '../ColorPicker';

export default function ColorPickerExample() {
  const [color, setColor] = useState('#3b82f6');
  
  return (
    <div className="p-4 bg-background">
      <ColorPicker value={color} onChange={setColor} label="Primary Color" />
    </div>
  );
}
