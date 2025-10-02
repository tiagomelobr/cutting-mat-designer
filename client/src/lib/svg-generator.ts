import { CuttingMatConfig, PAPER_SIZES, LineStyle } from '@/types/cutting-mat';

const mmToInches = (mm: number) => mm / 25.4;
const mmToCm = (mm: number) => mm / 10;

export function convertToMM(value: number, unit: string): number {
  switch (unit) {
    case 'inches':
      return value * 25.4;
    case 'cm':
      return value * 10;
    default:
      return value;
  }
}

export function convertFromMM(value: number, unit: string): number {
  switch (unit) {
    case 'inches':
      return mmToInches(value);
    case 'cm':
      return mmToCm(value);
    default:
      return value;
  }
}

function getStrokeDashArray(style: LineStyle, weight: number): string {
  switch (style) {
    case 'dashed':
      return `${weight * 4} ${weight * 2}`;
    case 'dotted':
      return `${weight} ${weight * 2}`;
    default:
      return '';
  }
}

export function generateCuttingMatSVG(config: CuttingMatConfig): string {
  const widthMM = convertToMM(config.width, config.unit);
  const heightMM = convertToMM(config.height, config.unit);
  
  const primaryIntervalMM = convertToMM(config.gridConfig.primaryInterval, config.unit);
  const secondaryIntervalMM = convertToMM(config.gridConfig.secondaryInterval, config.unit);
  const tertiaryIntervalMM = convertToMM(config.gridConfig.tertiaryInterval, config.unit);

  let svgContent = `<svg width="${widthMM}" height="${heightMM}" xmlns="http://www.w3.org/2000/svg">`;
  
  svgContent += `<rect width="100%" height="100%" fill="${config.backgroundColor}"/>`;

  // Tertiary grid
  if (config.features.tertiaryGrid && tertiaryIntervalMM > 0) {
    for (let x = tertiaryIntervalMM; x < widthMM; x += tertiaryIntervalMM) {
      svgContent += `<line x1="${x}" y1="0" x2="${x}" y2="${heightMM}" 
        stroke="${config.gridConfig.tertiaryColor}" 
        stroke-width="${config.gridConfig.tertiaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.tertiaryStyle, config.gridConfig.tertiaryWeight)}"/>`;
    }
    for (let y = tertiaryIntervalMM; y < heightMM; y += tertiaryIntervalMM) {
      svgContent += `<line x1="0" y1="${y}" x2="${widthMM}" y2="${y}" 
        stroke="${config.gridConfig.tertiaryColor}" 
        stroke-width="${config.gridConfig.tertiaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.tertiaryStyle, config.gridConfig.tertiaryWeight)}"/>`;
    }
  }

  // Secondary grid
  if (config.features.secondaryGrid && secondaryIntervalMM > 0) {
    for (let x = secondaryIntervalMM; x < widthMM; x += secondaryIntervalMM) {
      svgContent += `<line x1="${x}" y1="0" x2="${x}" y2="${heightMM}" 
        stroke="${config.gridConfig.secondaryColor}" 
        stroke-width="${config.gridConfig.secondaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.secondaryStyle, config.gridConfig.secondaryWeight)}"/>`;
    }
    for (let y = secondaryIntervalMM; y < heightMM; y += secondaryIntervalMM) {
      svgContent += `<line x1="0" y1="${y}" x2="${widthMM}" y2="${y}" 
        stroke="${config.gridConfig.secondaryColor}" 
        stroke-width="${config.gridConfig.secondaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.secondaryStyle, config.gridConfig.secondaryWeight)}"/>`;
    }
  }

  // Primary grid
  if (config.features.primaryGrid && primaryIntervalMM > 0) {
    for (let x = primaryIntervalMM; x < widthMM; x += primaryIntervalMM) {
      svgContent += `<line x1="${x}" y1="0" x2="${x}" y2="${heightMM}" 
        stroke="${config.gridConfig.primaryColor}" 
        stroke-width="${config.gridConfig.primaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.primaryStyle, config.gridConfig.primaryWeight)}"/>`;
    }
    for (let y = primaryIntervalMM; y < heightMM; y += primaryIntervalMM) {
      svgContent += `<line x1="0" y1="${y}" x2="${widthMM}" y2="${y}" 
        stroke="${config.gridConfig.primaryColor}" 
        stroke-width="${config.gridConfig.primaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.primaryStyle, config.gridConfig.primaryWeight)}"/>`;
    }
  }

  // Paper size indicators
  if (config.features.paperSizeIndicators) {
    config.enabledPaperSizes.forEach(sizeName => {
      const paperSize = PAPER_SIZES.find(p => p.name === sizeName);
      if (paperSize && paperSize.width <= widthMM && paperSize.height <= heightMM) {
        svgContent += `<rect x="0" y="0" width="${paperSize.width}" height="${paperSize.height}" 
          fill="none" stroke="${config.paperSizeColor}" stroke-width="2" 
          stroke-dasharray="8 4"/>`;
        svgContent += `<text x="6" y="16" font-family="Inter, sans-serif" font-size="11" 
          fill="${config.paperSizeColor}" font-weight="500">${paperSize.name}</text>`;
      }
    });
  }

  // Measurement labels
  if (config.features.measurements && config.features.axisLabels && primaryIntervalMM > 0) {
    let position = 0;
    for (let x = 0; x <= widthMM; x += primaryIntervalMM) {
      const label = convertFromMM(x, config.unit).toFixed(config.unit === 'mm' ? 0 : 1);
      svgContent += `<line x1="${x}" y1="0" x2="${x}" y2="4" 
        stroke="${config.measurementColor}" stroke-width="1"/>`;
      svgContent += `<text x="${x}" y="-2" font-family="JetBrains Mono, monospace" font-size="10" 
        fill="${config.measurementColor}" text-anchor="middle">${label}</text>`;
      position++;
    }
    
    position = 0;
    for (let y = 0; y <= heightMM; y += primaryIntervalMM) {
      const label = convertFromMM(y, config.unit).toFixed(config.unit === 'mm' ? 0 : 1);
      svgContent += `<line x1="0" y1="${y}" x2="4" y2="${y}" 
        stroke="${config.measurementColor}" stroke-width="1"/>`;
      svgContent += `<text x="-6" y="${y + 3}" font-family="JetBrains Mono, monospace" font-size="10" 
        fill="${config.measurementColor}" text-anchor="end">${label}</text>`;
      position++;
    }
  }

  svgContent += `</svg>`;
  return svgContent;
}
