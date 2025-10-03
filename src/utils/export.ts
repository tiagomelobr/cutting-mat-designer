import type { AppConfig } from '../types';

interface ExportOptions {
  config: AppConfig;
  svgContent: string;
}

export const exportAsSVG = ({ config, svgContent }: ExportOptions): void => {
  const { width, height, unit } = config.canvas;
  const filename = `cutting-mat-${width}x${height}-${unit}.svg`;
  
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(url);
};

export const exportAsPDF = async ({ config, svgContent }: ExportOptions): Promise<void> => {
  const { jsPDF } = await import('jspdf');
  // @ts-ignore - svg2pdf is available but may not have types
  const { svg2pdf } = await import('svg2pdf.js');
  const { width, height, unit } = config.canvas;
  
  // Convert dimensions to points (PDF unit)
  let widthInPt: number;
  let heightInPt: number;
  
  switch (unit) {
    case 'inches':
      widthInPt = width * 72; // 72 points per inch
      heightInPt = height * 72;
      break;
    case 'cm':
      widthInPt = (width / 2.54) * 72;
      heightInPt = (height / 2.54) * 72;
      break;
    case 'mm':
      widthInPt = (width / 25.4) * 72;
      heightInPt = (height / 25.4) * 72;
      break;
  }
  
  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [widthInPt, heightInPt],
  });
  
  // Parse SVG string into DOM element
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = svgDoc.documentElement as unknown as SVGElement;
  
  // Convert SVG to PDF (maintains vector format)
  await svg2pdf(svgElement, pdf, {
    x: 0,
    y: 0,
    width: widthInPt,
    height: heightInPt,
  });
  
  const filename = `cutting-mat-${width}x${height}-${unit}.pdf`;
  pdf.save(filename);
};
