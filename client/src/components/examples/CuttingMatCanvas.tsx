import CuttingMatCanvas from '../CuttingMatCanvas';
import { CuttingMatConfig } from '@/types/cutting-mat';

export default function CuttingMatCanvasExample() {
  const config: CuttingMatConfig = {
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
  };
  
  return (
    <div className="h-screen">
      <CuttingMatCanvas config={config} />
    </div>
  );
}
