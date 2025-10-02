import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MeasurementUnit } from '@/types/cutting-mat';

interface CanvasDimensionControlsProps {
  width: number;
  height: number;
  unit: MeasurementUnit;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onUnitChange: (unit: MeasurementUnit) => void;
}

export default function CanvasDimensionControls({
  width,
  height,
  unit,
  onWidthChange,
  onHeightChange,
  onUnitChange,
}: CanvasDimensionControlsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width" className="text-sm font-medium">Width</Label>
          <Input
            id="width"
            type="number"
            min="1"
            step="0.1"
            value={width}
            onChange={(e) => onWidthChange(parseFloat(e.target.value) || 0)}
            className="font-mono"
            data-testid="input-width"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium">Height</Label>
          <Input
            id="height"
            type="number"
            min="1"
            step="0.1"
            value={height}
            onChange={(e) => onHeightChange(parseFloat(e.target.value) || 0)}
            className="font-mono"
            data-testid="input-height"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-medium">Unit</Label>
        <div className="flex gap-2">
          {(['inches', 'cm', 'mm'] as MeasurementUnit[]).map((u) => (
            <button
              key={u}
              onClick={() => onUnitChange(u)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                unit === u
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover-elevate active-elevate-2'
              }`}
              data-testid={`button-unit-${u}`}
            >
              {u === 'inches' ? 'in' : u}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
