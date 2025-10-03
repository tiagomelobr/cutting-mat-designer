import { useState } from 'react';
import { CuttingMatConfig } from '@/types/cutting-mat';
import ControlsPanel from '@/components/ControlsPanel';
import CuttingMatCanvas from '@/components/CuttingMatCanvas';
import { generateCuttingMatSVG } from '@/lib/svg-generator';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();
  const [config, setConfig] = useState<CuttingMatConfig>({
    width: 12,
    height: 12,
    unit: 'inches',
    margin: 0.5,
    gridConfig: {
      primaryInterval: 1,
      secondaryInterval: 0.5,
      tertiaryInterval: 0.25,
      primaryWeight: 1.5,
      secondaryWeight: 0.75,
      tertiaryWeight: 0.5,
      primaryStyle: 'solid',
      secondaryStyle: 'dashed',
      tertiaryStyle: 'dotted',
      primaryColor: '#718096',
      secondaryColor: '#a0aec0',
      tertiaryColor: '#cbd5e0',
    },
    backgroundColor: '#ffffff',
    paperSizeColor: '#f59e0b',
    measurementColor: '#3b82f6',
    enabledPaperSizes: ['A4', 'Letter'],
    rotatedPaperSizes: [],
    features: {
      primaryGrid: true,
      secondaryGrid: true,
      tertiaryGrid: false,
      measurements: true,
      paperSizeIndicators: true,
      axisLabels: true,
    },
  });

  const handleExport = () => {
    const svgContent = generateCuttingMatSVG(config);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cutting-mat-${config.width}x${config.height}-${config.unit}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'SVG Exported',
      description: `Cutting mat layout saved as ${a.download}`,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-80 flex-shrink-0">
        <ControlsPanel
          config={config}
          onConfigChange={setConfig}
          onExport={handleExport}
        />
      </div>
      <div className="flex-1">
        <CuttingMatCanvas config={config} />
      </div>
    </div>
  );
}
