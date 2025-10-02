export type MeasurementUnit = 'inches' | 'cm' | 'mm';
export type LineStyle = 'solid' | 'dashed' | 'dotted';

export interface PaperSize {
  name: string;
  width: number;
  height: number;
  unit: 'mm';
}

export const PAPER_SIZES: PaperSize[] = [
  { name: 'A1', width: 594, height: 841, unit: 'mm' },
  { name: 'A2', width: 420, height: 594, unit: 'mm' },
  { name: 'A3', width: 297, height: 420, unit: 'mm' },
  { name: 'A4', width: 210, height: 297, unit: 'mm' },
  { name: 'Letter', width: 215.9, height: 279.4, unit: 'mm' },
  { name: 'Legal', width: 215.9, height: 355.6, unit: 'mm' },
  { name: 'Tabloid', width: 279.4, height: 431.8, unit: 'mm' },
];

export interface GridConfig {
  primaryInterval: number;
  secondaryInterval: number;
  tertiaryInterval: number;
  primaryWeight: number;
  secondaryWeight: number;
  tertiaryWeight: number;
  primaryStyle: LineStyle;
  secondaryStyle: LineStyle;
  tertiaryStyle: LineStyle;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export interface CuttingMatConfig {
  width: number;
  height: number;
  unit: MeasurementUnit;
  gridConfig: GridConfig;
  backgroundColor: string;
  paperSizeColor: string;
  measurementColor: string;
  enabledPaperSizes: string[];
  features: {
    primaryGrid: boolean;
    secondaryGrid: boolean;
    tertiaryGrid: boolean;
    measurements: boolean;
    paperSizeIndicators: boolean;
    axisLabels: boolean;
  };
}
