import type { AppConfig, PaperSize } from '../types';

export const PAPER_SIZES: PaperSize[] = [
  { name: 'A1', width: 594, height: 841, unit: 'mm' },
  { name: 'A2', width: 420, height: 594, unit: 'mm' },
  { name: 'A3', width: 297, height: 420, unit: 'mm' },
  { name: 'A4', width: 210, height: 297, unit: 'mm' },
  { name: 'Letter', width: 8.5, height: 11, unit: 'inches' },
  { name: 'Legal', width: 8.5, height: 14, unit: 'inches' },
  { name: 'Tabloid', width: 11, height: 17, unit: 'inches' },
];

export const DEFAULT_CONFIG: AppConfig = {
  canvas: {
    width: 12,
    height: 18,
    unit: 'inches',
    margin: 0.5,
    backgroundColor: '#ffffff',
  },
  primaryGrid: {
    interval: 1,
    lineWeight: 2,
    lineStyle: 'solid',
    color: '#000000',
    enabled: true,
  },
  secondaryGrid: {
    interval: 0.5,
    lineWeight: 1,
    lineStyle: 'solid',
    color: '#666666',
    enabled: true,
  },
  tertiaryGrid: {
    interval: 0.25,
    lineWeight: 0.5,
    lineStyle: 'dotted',
    color: '#999999',
    enabled: false,
  },
  measurements: {
    enabled: true,
    showLabels: true,
    color: '#000000',
  },
  font: {
    label: {
      family: 'futural',
      size: 12,
      rotation: 0,
    },
    axis: {
      family: 'futural',
      size: 10,
      topRotation: 0,
      leftRotation: 0,
      topAlignment: 'middle' as const,
      leftAlignment: 'end' as const,
      labelDistance: 20,
    },
  },
  paperSizes: {
    A1: { enabled: false, portrait: true, landscape: false, color: '#ff0000', labelAnchor: 'bottom' },
    A2: { enabled: false, portrait: true, landscape: false, color: '#ff0000', labelAnchor: 'bottom' },
    A3: { enabled: false, portrait: true, landscape: false, color: '#ff0000', labelAnchor: 'bottom' },
    A4: { enabled: true, portrait: true, landscape: false, color: '#ff0000', labelAnchor: 'bottom' },
    Letter: { enabled: true, portrait: true, landscape: false, color: '#0000ff', labelAnchor: 'bottom' },
    Legal: { enabled: false, portrait: true, landscape: false, color: '#0000ff', labelAnchor: 'bottom' },
    Tabloid: { enabled: false, portrait: true, landscape: false, color: '#0000ff', labelAnchor: 'bottom' },
  },
};

export const STORAGE_KEY = 'cutting-mat-config';
