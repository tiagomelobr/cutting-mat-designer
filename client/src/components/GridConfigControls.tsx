import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { GridConfig, LineStyle, MeasurementUnit } from '@/types/cutting-mat';
import ColorPicker from './ColorPicker';

interface GridConfigControlsProps {
  gridConfig: GridConfig;
  onGridConfigChange: (config: GridConfig) => void;
  unit: MeasurementUnit;
}

export default function GridConfigControls({ gridConfig, onGridConfigChange, unit }: GridConfigControlsProps) {
  const updateConfig = (updates: Partial<GridConfig>) => {
    onGridConfigChange({ ...gridConfig, ...updates });
  };

  const getUnitLabel = () => {
    switch (unit) {
      case 'inches': return 'in';
      case 'cm': return 'cm';
      case 'mm': return 'mm';
    }
  };

  const renderGridSection = (
    level: 'primary' | 'secondary' | 'tertiary',
    label: string
  ) => {
    const intervalKey = `${level}Interval` as keyof GridConfig;
    const weightKey = `${level}Weight` as keyof GridConfig;
    const styleKey = `${level}Style` as keyof GridConfig;
    const colorKey = `${level}Color` as keyof GridConfig;

    return (
      <div className="space-y-3 p-4 rounded-md bg-accent/50 border border-border">
        <h4 className="font-medium text-sm">{label} Grid</h4>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Interval ({getUnitLabel()})</Label>
          <Input
            type="number"
            min="0.1"
            step="0.1"
            value={gridConfig[intervalKey] as number}
            onChange={(e) => updateConfig({ [intervalKey]: parseFloat(e.target.value) || 0 })}
            className="font-mono"
            data-testid={`input-${level}-interval`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Line Weight: {gridConfig[weightKey]}</Label>
          <Slider
            min={0.25}
            max={3}
            step={0.25}
            value={[gridConfig[weightKey] as number]}
            onValueChange={([value]) => updateConfig({ [weightKey]: value })}
            data-testid={`slider-${level}-weight`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Line Style</Label>
          <div className="flex gap-2">
            {(['solid', 'dashed', 'dotted'] as LineStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => updateConfig({ [styleKey]: style })}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                  gridConfig[styleKey] === style
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover-elevate active-elevate-2'
                }`}
                data-testid={`button-${level}-style-${style}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <ColorPicker
          value={gridConfig[colorKey] as string}
          onChange={(color) => updateConfig({ [colorKey]: color })}
          label="Color"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderGridSection('primary', 'Primary')}
      {renderGridSection('secondary', 'Secondary')}
      {renderGridSection('tertiary', 'Tertiary')}
    </div>
  );
}
