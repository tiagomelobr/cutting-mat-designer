import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PAPER_SIZES } from '@/types/cutting-mat';
import { RotateCw } from 'lucide-react';

interface PaperSizeControlsProps {
  enabledPaperSizes: string[];
  rotatedPaperSizes: string[];
  onEnabledPaperSizesChange: (sizes: string[]) => void;
  onRotatedPaperSizesChange: (sizes: string[]) => void;
}

export default function PaperSizeControls({
  enabledPaperSizes,
  rotatedPaperSizes,
  onEnabledPaperSizesChange,
  onRotatedPaperSizesChange,
}: PaperSizeControlsProps) {
  const togglePaperSize = (sizeName: string) => {
    if (enabledPaperSizes.includes(sizeName)) {
      onEnabledPaperSizesChange(enabledPaperSizes.filter(s => s !== sizeName));
    } else {
      onEnabledPaperSizesChange([...enabledPaperSizes, sizeName]);
    }
  };

  const toggleRotation = (sizeName: string) => {
    if (rotatedPaperSizes.includes(sizeName)) {
      onRotatedPaperSizesChange(rotatedPaperSizes.filter(s => s !== sizeName));
    } else {
      onRotatedPaperSizesChange([...rotatedPaperSizes, sizeName]);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Paper Size Indicators</Label>
      <div className="space-y-2">
        {PAPER_SIZES.map((size) => {
          const isEnabled = enabledPaperSizes.includes(size.name);
          const isRotated = rotatedPaperSizes.includes(size.name);
          return (
            <div key={size.name} className="flex items-center gap-2">
              <Checkbox
                id={`paper-${size.name}`}
                checked={isEnabled}
                onCheckedChange={() => togglePaperSize(size.name)}
                data-testid={`checkbox-paper-${size.name.toLowerCase()}`}
              />
              <Label
                htmlFor={`paper-${size.name}`}
                className="text-sm cursor-pointer flex-1"
              >
                {size.name}
                <span className="text-xs text-muted-foreground ml-2">
                  ({isRotated ? `${size.height} × ${size.width}` : `${size.width} × ${size.height}`} mm)
                </span>
              </Label>
              {isEnabled && (
                <Button
                  size="icon"
                  variant={isRotated ? 'default' : 'outline'}
                  onClick={() => toggleRotation(size.name)}
                  className="h-7 w-7"
                  data-testid={`button-rotate-${size.name.toLowerCase()}`}
                >
                  <RotateCw className="w-3 h-3" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
