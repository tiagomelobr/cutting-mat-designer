import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FeatureTogglesProps {
  features: {
    primaryGrid: boolean;
    secondaryGrid: boolean;
    tertiaryGrid: boolean;
    measurements: boolean;
    paperSizeIndicators: boolean;
    axisLabels: boolean;
  };
  onFeaturesChange: (features: FeatureTogglesProps['features']) => void;
}

export default function FeatureToggles({ features, onFeaturesChange }: FeatureTogglesProps) {
  const toggleFeature = (key: keyof typeof features) => {
    onFeaturesChange({ ...features, [key]: !features[key] });
  };

  const featureList: { key: keyof typeof features; label: string; description: string }[] = [
    { key: 'primaryGrid', label: 'Primary Grid', description: 'Main grid lines' },
    { key: 'secondaryGrid', label: 'Secondary Grid', description: 'Intermediate grid lines' },
    { key: 'tertiaryGrid', label: 'Tertiary Grid', description: 'Fine grid lines' },
    { key: 'measurements', label: 'Measurements', description: 'Tick marks on axes' },
    { key: 'axisLabels', label: 'Axis Labels', description: 'Numerical labels on axes' },
    { key: 'paperSizeIndicators', label: 'Paper Size Indicators', description: 'Common paper size overlays' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Enabled Features</Label>
      <div className="space-y-2">
        {featureList.map((feature) => (
          <div key={feature.key} className="flex items-start gap-2">
            <Checkbox
              id={`feature-${feature.key}`}
              checked={features[feature.key]}
              onCheckedChange={() => toggleFeature(feature.key)}
              className="mt-0.5"
              data-testid={`checkbox-feature-${feature.key.toLowerCase()}`}
            />
            <div className="flex-1">
              <Label
                htmlFor={`feature-${feature.key}`}
                className="text-sm cursor-pointer font-medium"
              >
                {feature.label}
              </Label>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
