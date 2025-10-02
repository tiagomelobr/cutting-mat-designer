import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PAPER_SIZES } from '@/types/cutting-mat';

interface PaperSizeControlsProps {
  enabledPaperSizes: string[];
  onEnabledPaperSizesChange: (sizes: string[]) => void;
}

export default function PaperSizeControls({
  enabledPaperSizes,
  onEnabledPaperSizesChange,
}: PaperSizeControlsProps) {
  const togglePaperSize = (sizeName: string) => {
    if (enabledPaperSizes.includes(sizeName)) {
      onEnabledPaperSizesChange(enabledPaperSizes.filter(s => s !== sizeName));
    } else {
      onEnabledPaperSizesChange([...enabledPaperSizes, sizeName]);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Paper Size Indicators</Label>
      <div className="space-y-2">
        {PAPER_SIZES.map((size) => (
          <div key={size.name} className="flex items-center gap-2">
            <Checkbox
              id={`paper-${size.name}`}
              checked={enabledPaperSizes.includes(size.name)}
              onCheckedChange={() => togglePaperSize(size.name)}
              data-testid={`checkbox-paper-${size.name.toLowerCase()}`}
            />
            <Label
              htmlFor={`paper-${size.name}`}
              className="text-sm cursor-pointer flex-1"
            >
              {size.name}
              <span className="text-xs text-muted-foreground ml-2">
                ({size.width} × {size.height} mm)
              </span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
