export type Unit = 'inches' | 'cm' | 'mm';

export type LineStyle = 'solid' | 'dashed' | 'dotted';

export type HersheyFont = 
  | 'futural' // Roman Simplex
  | 'futuram' // Roman Duplex
  | 'scripts' // Script Simplex
  | 'scriptc' // Script Complex
  | 'gothiceng' // Gothic English
  | 'gothicger' // Gothic German
  | 'gothicita' // Gothic Italian
  | 'timesr' // Times Roman
  | 'timesg' // Times Greek
  | 'cyrillic'; // Cyrillic

export type LabelAnchor = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type TextAnchor = 'start' | 'middle' | 'end';

export interface LabelFontConfig {
  family: HersheyFont;
  size: number;
  rotation: number; // in degrees
}

export interface AxisFontConfig {
  family: HersheyFont;
  size: number;
  topRotation: number; // rotation for top axis labels (in degrees)
  leftRotation: number; // rotation for left axis labels (in degrees)
  topAlignment: TextAnchor; // text alignment for top axis
  leftAlignment: TextAnchor; // text alignment for left axis
  labelDistance: number; // distance from axis measurement labels to the edge (in pixels)
}

export interface FontConfig {
  label: LabelFontConfig; // Paper size labels
  axis: AxisFontConfig; // Axis measurement labels
}

export interface GridConfig {
  interval: number;
  lineWeight: number;
  lineStyle: LineStyle;
  color: string;
  enabled: boolean;
}

export interface CanvasConfig {
  width: number;
  height: number;
  unit: Unit;
  margin: number;
  backgroundColor: string;
}

export interface PaperSize {
  name: string;
  width: number;
  height: number;
  unit: Unit;
}

export interface PaperSizeConfig {
  enabled: boolean;
  portrait: boolean;
  landscape: boolean;
  color: string;
  labelAnchor: LabelAnchor;
  customLabel?: string;
}

export interface MeasurementConfig {
  enabled: boolean;
  showLabels: boolean;
  color: string;
}

export interface AppConfig {
  canvas: CanvasConfig;
  primaryGrid: GridConfig;
  secondaryGrid: GridConfig;
  tertiaryGrid: GridConfig;
  measurements: MeasurementConfig;
  font: FontConfig; // Unified font configuration
  paperSizes: {
    [key: string]: PaperSizeConfig;
  };
  // Legacy support - will be migrated
  labelFont?: LabelFontConfig;
  axisFont?: AxisFontConfig;
}
