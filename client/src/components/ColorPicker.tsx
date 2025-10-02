import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

export default function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-9 p-1 cursor-pointer border-border"
          data-testid={`color-picker-${label.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
