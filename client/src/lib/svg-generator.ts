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

function formatNumber(value: number, decimals: number): string {
  const rounded = parseFloat(value.toFixed(decimals));
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(decimals);
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
  const marginMM = convertToMM(config.margin, config.unit);
  
  const primaryIntervalMM = convertToMM(config.gridConfig.primaryInterval, config.unit);
  const secondaryIntervalMM = convertToMM(config.gridConfig.secondaryInterval, config.unit);
  const tertiaryIntervalMM = convertToMM(config.gridConfig.tertiaryInterval, config.unit);

  const totalWidth = widthMM + (marginMM * 2);
  const totalHeight = heightMM + (marginMM * 2);

  let svgContent = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;
  
  svgContent += `<rect width="100%" height="100%" fill="${config.backgroundColor}"/>`;

  // Tertiary grid
  if (config.features.tertiaryGrid && tertiaryIntervalMM > 0) {
    for (let x = tertiaryIntervalMM; x < widthMM; x += tertiaryIntervalMM) {
      svgContent += `<line x1="${x + marginMM}" y1="${marginMM}" x2="${x + marginMM}" y2="${heightMM + marginMM}" 
        stroke="${config.gridConfig.tertiaryColor}" 
        stroke-width="${config.gridConfig.tertiaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.tertiaryStyle, config.gridConfig.tertiaryWeight)}"/>`;
    }
    for (let y = tertiaryIntervalMM; y < heightMM; y += tertiaryIntervalMM) {
      svgContent += `<line x1="${marginMM}" y1="${y + marginMM}" x2="${widthMM + marginMM}" y2="${y + marginMM}" 
        stroke="${config.gridConfig.tertiaryColor}" 
        stroke-width="${config.gridConfig.tertiaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.tertiaryStyle, config.gridConfig.tertiaryWeight)}"/>`;
    }
  }

  // Secondary grid
  if (config.features.secondaryGrid && secondaryIntervalMM > 0) {
    for (let x = secondaryIntervalMM; x < widthMM; x += secondaryIntervalMM) {
      svgContent += `<line x1="${x + marginMM}" y1="${marginMM}" x2="${x + marginMM}" y2="${heightMM + marginMM}" 
        stroke="${config.gridConfig.secondaryColor}" 
        stroke-width="${config.gridConfig.secondaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.secondaryStyle, config.gridConfig.secondaryWeight)}"/>`;
    }
    for (let y = secondaryIntervalMM; y < heightMM; y += secondaryIntervalMM) {
      svgContent += `<line x1="${marginMM}" y1="${y + marginMM}" x2="${widthMM + marginMM}" y2="${y + marginMM}" 
        stroke="${config.gridConfig.secondaryColor}" 
        stroke-width="${config.gridConfig.secondaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.secondaryStyle, config.gridConfig.secondaryWeight)}"/>`;
    }
  }

  // Primary grid
  if (config.features.primaryGrid && primaryIntervalMM > 0) {
    for (let x = primaryIntervalMM; x < widthMM; x += primaryIntervalMM) {
      svgContent += `<line x1="${x + marginMM}" y1="${marginMM}" x2="${x + marginMM}" y2="${heightMM + marginMM}" 
        stroke="${config.gridConfig.primaryColor}" 
        stroke-width="${config.gridConfig.primaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.primaryStyle, config.gridConfig.primaryWeight)}"/>`;
    }
    for (let y = primaryIntervalMM; y < heightMM; y += primaryIntervalMM) {
      svgContent += `<line x1="${marginMM}" y1="${y + marginMM}" x2="${widthMM + marginMM}" y2="${y + marginMM}" 
        stroke="${config.gridConfig.primaryColor}" 
        stroke-width="${config.gridConfig.primaryWeight}"
        stroke-dasharray="${getStrokeDashArray(config.gridConfig.primaryStyle, config.gridConfig.primaryWeight)}"/>`;
    }
  }

  // Paper size indicators
  if (config.features.paperSizeIndicators) {
    config.enabledPaperSizes.forEach(sizeName => {
      const paperSize = PAPER_SIZES.find(p => p.name === sizeName);
      if (!paperSize) return;
      
      const isRotated = config.rotatedPaperSizes?.includes(sizeName) || false;
      const paperWidth = isRotated ? paperSize.height : paperSize.width;
      const paperHeight = isRotated ? paperSize.width : paperSize.height;
      
      if (paperWidth <= widthMM && paperHeight <= heightMM) {
        svgContent += `<rect x="${marginMM}" y="${marginMM}" width="${paperWidth}" height="${paperHeight}" 
          fill="none" stroke="${config.paperSizeColor}" stroke-width="2" 
          stroke-dasharray="8 4"/>`;
        
        const textX = marginMM + 6;
        const textY = marginMM + 16;
        const textContent = paperSize.name;
        
        svgContent += `<rect x="${textX - 2}" y="${textY - 11}" width="${textContent.length * 6.5 + 4}" height="14" 
          fill="${config.backgroundColor}" opacity="0.9"/>`;
        svgContent += `<text x="${textX}" y="${textY}" font-family="sans-serif" font-size="11" 
          fill="none" stroke="${config.paperSizeColor}" stroke-width="0.3">${textContent}</text>`;
      }
    });
  }

  // Measurement labels
  if (config.features.measurements && config.features.axisLabels && primaryIntervalMM > 0) {
    const decimals = config.unit === 'mm' ? 0 : 1;
    
    for (let x = 0; x <= widthMM; x += primaryIntervalMM) {
      const value = convertFromMM(x, config.unit);
      const label = formatNumber(value, decimals);
      svgContent += `<line x1="${x + marginMM}" y1="${marginMM}" x2="${x + marginMM}" y2="${marginMM - 4}" 
        stroke="${config.measurementColor}" stroke-width="1"/>`;
      svgContent += `<text x="${x + marginMM}" y="${marginMM - 6}" font-family="sans-serif" font-size="10" 
        fill="none" stroke="${config.measurementColor}" stroke-width="0.25" text-anchor="middle">${label}</text>`;
    }
    
    for (let y = 0; y <= heightMM; y += primaryIntervalMM) {
      const value = convertFromMM(y, config.unit);
      const label = formatNumber(value, decimals);
      svgContent += `<line x1="${marginMM}" y1="${y + marginMM}" x2="${marginMM - 4}" y2="${y + marginMM}" 
        stroke="${config.measurementColor}" stroke-width="1"/>`;
      svgContent += `<text x="${marginMM - 6}" y="${y + marginMM}" font-family="sans-serif" font-size="10" 
        fill="none" stroke="${config.measurementColor}" stroke-width="0.25" text-anchor="middle" 
        transform="rotate(-90 ${marginMM - 6} ${y + marginMM})">${label}</text>`;
    }
  }

  svgContent += `</svg>`;
  return svgContent;
}
