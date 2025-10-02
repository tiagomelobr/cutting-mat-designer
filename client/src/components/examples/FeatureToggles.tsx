import { useState } from 'react';
import FeatureToggles from '../FeatureToggles';

export default function FeatureTogglesExample() {
  const [features, setFeatures] = useState({
    primaryGrid: true,
    secondaryGrid: true,
    tertiaryGrid: false,
    measurements: true,
    paperSizeIndicators: true,
    axisLabels: true,
  });
  
  return (
    <div className="p-4 bg-sidebar max-w-md">
      <FeatureToggles features={features} onFeaturesChange={setFeatures} />
    </div>
  );
}
