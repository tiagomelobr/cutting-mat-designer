import { useEffect, useState, useRef } from 'react';
import type { AppConfig, LineStyle, PaperSize } from '../types';
import { PAPER_SIZES } from '../config/constants';
import { convertUnits } from '../utils/units';
import { renderHersheyText, getHersheyTextWidth } from '../utils/hersheyFonts';

interface CanvasRendererProps {
  config: AppConfig;
  onSVGGenerated: (svg: string) => void;
}

interface LabelBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const CanvasRenderer = ({ config, onSVGGenerated }: CanvasRendererProps) => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { canvas, primaryGrid, secondaryGrid, tertiaryGrid, measurements, paperSizes, font } = config;
  
  // Helper to format numbers without unnecessary decimals
  const formatNumber = (num: number): string => {
    return num % 1 === 0 ? num.toString() : num.toFixed(1);
  };
  
  // Safeguard: ensure font config exists
  if (!font || !font.label || !font.axis) {
    console.error('Font config is missing in CanvasRenderer');
    return (
      <div className="flex items-center justify-center w-full h-full p-4 bg-base-200">
        <div className="text-error">Configuration error. Please refresh the page.</div>
      </div>
    );
  }
  
  // Calculate dimensions in pixels (96 DPI)
  const dpi = 96;
  let pixelWidth: number;
  let pixelHeight: number;
  
  switch (canvas.unit) {
    case 'inches':
      pixelWidth = canvas.width * dpi;
      pixelHeight = canvas.height * dpi;
      break;
    case 'cm':
      pixelWidth = (canvas.width / 2.54) * dpi;
      pixelHeight = (canvas.height / 2.54) * dpi;
      break;
    case 'mm':
      pixelWidth = (canvas.width / 25.4) * dpi;
      pixelHeight = (canvas.height / 25.4) * dpi;
      break;
  }
  
  const marginPixels = convertUnits(canvas.margin, canvas.unit, 'inches') * dpi;
  const workingWidth = pixelWidth - (marginPixels * 2);
  const workingHeight = pixelHeight - (marginPixels * 2);
  
  // Helper to get stroke-dasharray for line style
  const getStrokeDashArray = (style: LineStyle, weight: number): string => {
    switch (style) {
      case 'solid':
        return 'none';
      case 'dashed':
        return `${weight * 4} ${weight * 2}`;
      case 'dotted':
        return `${weight} ${weight * 2}`;
    }
  };
  
  // Generate grid lines
  const generateGridLines = () => {
    const lines: React.JSX.Element[] = [];
    const grids = [
      { config: tertiaryGrid, key: 'tertiary' },
      { config: secondaryGrid, key: 'secondary' },
      { config: primaryGrid, key: 'primary' },
    ];
    
    grids.forEach(({ config: grid, key }) => {
      if (!grid.enabled) return;
      
      const intervalPixels = convertUnits(grid.interval, canvas.unit, 'inches') * dpi;
      
      // Vertical lines
      for (let x = marginPixels; x <= pixelWidth - marginPixels; x += intervalPixels) {
        lines.push(
          <line
            key={`${key}-v-${x}`}
            x1={x}
            y1={marginPixels}
            x2={x}
            y2={pixelHeight - marginPixels}
            stroke={grid.color}
            strokeWidth={grid.lineWeight}
            strokeDasharray={getStrokeDashArray(grid.lineStyle, grid.lineWeight)}
          />
        );
      }
      
      // Horizontal lines
      for (let y = marginPixels; y <= pixelHeight - marginPixels; y += intervalPixels) {
        lines.push(
          <line
            key={`${key}-h-${y}`}
            x1={marginPixels}
            y1={y}
            x2={pixelWidth - marginPixels}
            y2={y}
            stroke={grid.color}
            strokeWidth={grid.lineWeight}
            strokeDasharray={getStrokeDashArray(grid.lineStyle, grid.lineWeight)}
          />
        );
      }
    });
    
    return lines;
  };
  
  // Generate axis measurements
  const generateMeasurements = () => {
    if (!measurements.enabled) return null;
    
    const elements: React.JSX.Element[] = [];
    const tickLength = 10;
    const labelOffset = font.axis.labelDistance;
    const intervalPixels = convertUnits(primaryGrid.interval, canvas.unit, 'inches') * dpi;
    
    // Top horizontal measurements
    for (let x = marginPixels, i = 0; x <= pixelWidth - marginPixels; x += intervalPixels, i++) {
      elements.push(
        <line
          key={`tick-top-${x}`}
          x1={x}
          y1={marginPixels}
          x2={x}
          y2={marginPixels - tickLength}
          stroke={measurements.color}
          strokeWidth={1}
        />
      );
      
      if (measurements.showLabels) {
        const value = formatNumber(i * primaryGrid.interval);
        const hersheyPath = renderHersheyText(
          value,
          font.axis.family,
          font.axis.size,
          x,
          marginPixels - labelOffset,
          font.axis.topRotation,
          font.axis.topAlignment
        );
        if (hersheyPath) {
          elements.push(
            <g
              key={`label-top-${x}`}
              dangerouslySetInnerHTML={{ __html: hersheyPath }}
              style={{ color: measurements.color }}
            />
          );
        }
      }
    }
    
    // Left vertical measurements
    for (let y = marginPixels, i = 0; y <= pixelHeight - marginPixels; y += intervalPixels, i++) {
      elements.push(
        <line
          key={`tick-left-${y}`}
          x1={marginPixels}
          y1={y}
          x2={marginPixels - tickLength}
          y2={y}
          stroke={measurements.color}
          strokeWidth={1}
        />
      );
      
      if (measurements.showLabels) {
        const value = formatNumber(i * primaryGrid.interval);
        const hersheyPath = renderHersheyText(
          value,
          font.axis.family,
          font.axis.size,
          marginPixels - labelOffset,
          y + 4,
          font.axis.leftRotation,
          font.axis.leftAlignment
        );
        if (hersheyPath) {
          elements.push(
            <g
              key={`label-left-${y}`}
              dangerouslySetInnerHTML={{ __html: hersheyPath }}
              style={{ color: measurements.color }}
            />
          );
        }
      }
    }
    
    return elements;
  };
  
  // Generate paper size indicators
  const generatePaperSizeIndicators = () => {
    const indicators: React.JSX.Element[] = [];
    const labelBounds: LabelBounds[] = [];
    
    PAPER_SIZES.forEach((paper: PaperSize) => {
      const sizeConfig = paperSizes[paper.name];
      if (!sizeConfig || (!sizeConfig.enabled)) return;
      
      const paperWidthInches = convertUnits(paper.width, paper.unit, 'inches');
      const paperHeightInches = convertUnits(paper.height, paper.unit, 'inches');
      
      // Helper function to calculate label position based on anchor
      const getLabelPosition = (rectX: number, rectY: number, rectWidth: number, rectHeight: number, anchor: string) => {
        const padding = 8;
        let x = rectX, y = rectY, textAnchor: 'start' | 'middle' | 'end' = 'middle';
        let dy = font.label.size / 3; // Approximate vertical centering
        
        switch (anchor) {
          case 'top':
            x = rectX + rectWidth / 2;
            y = rectY - padding;
            textAnchor = 'middle';
            break;
          case 'bottom':
            x = rectX + rectWidth / 2;
            y = rectY + rectHeight + padding + font.label.size;
            textAnchor = 'middle';
            break;
          case 'left':
            x = rectX - padding;
            y = rectY + rectHeight / 2 + dy;
            textAnchor = 'end';
            break;
          case 'right':
            x = rectX + rectWidth + padding;
            y = rectY + rectHeight / 2 + dy;
            textAnchor = 'start';
            break;
          case 'top-left':
            x = rectX;
            y = rectY - padding;
            textAnchor = 'start';
            break;
          case 'top-right':
            x = rectX + rectWidth;
            y = rectY - padding;
            textAnchor = 'end';
            break;
          case 'bottom-left':
            x = rectX;
            y = rectY + rectHeight + padding + font.label.size;
            textAnchor = 'start';
            break;
          case 'bottom-right':
            x = rectX + rectWidth;
            y = rectY + rectHeight + padding + font.label.size;
            textAnchor = 'end';
            break;
        }
        
        return { x, y, textAnchor };
      };
      
      // Portrait orientation
      if (sizeConfig.portrait) {
        const widthPx = paperWidthInches * dpi;
        const heightPx = paperHeightInches * dpi;
        
        if (widthPx <= workingWidth && heightPx <= workingHeight) {
          indicators.push(
            <rect
              key={`${paper.name}-portrait`}
              x={marginPixels}
              y={marginPixels}
              width={widthPx}
              height={heightPx}
              fill="none"
              stroke={sizeConfig.color}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          );
          
          // Only add label if not showing both orientations
          if (!sizeConfig.landscape) {
            const labelPos = getLabelPosition(marginPixels, marginPixels, widthPx, heightPx, sizeConfig.labelAnchor);
            const labelText = sizeConfig.customLabel || paper.name;
            const textWidth = getHersheyTextWidth(labelText, font.label.family, font.label.size);
            
            labelBounds.push({
              x: labelPos.x - textWidth / 2,
              y: labelPos.y - font.label.size,
              width: textWidth,
              height: font.label.size * 1.5
            });
            
            const hersheyPath = renderHersheyText(
              labelText,
              font.label.family,
              font.label.size,
              labelPos.x,
              labelPos.y,
              font.label.rotation,
              labelPos.textAnchor
            );
            
            if (hersheyPath) {
              indicators.push(
                <g
                  key={`${paper.name}-portrait-label`}
                  dangerouslySetInnerHTML={{ __html: hersheyPath }}
                  style={{ color: sizeConfig.color }}
                />
              );
            }
          }
        }
      }
      
      // Landscape orientation - overlay on top of portrait if both are enabled
      if (sizeConfig.landscape) {
        const widthPx = paperHeightInches * dpi;
        const heightPx = paperWidthInches * dpi;
        
        if (widthPx <= workingWidth && heightPx <= workingHeight) {
          indicators.push(
            <rect
              key={`${paper.name}-landscape`}
              x={marginPixels}
              y={marginPixels}
              width={widthPx}
              height={heightPx}
              fill="none"
              stroke={sizeConfig.color}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          );
          
          const labelPos = getLabelPosition(marginPixels, marginPixels, widthPx, heightPx, sizeConfig.labelAnchor);
          const labelText = sizeConfig.customLabel || paper.name;
          const textWidth = getHersheyTextWidth(labelText, font.label.family, font.label.size);
          
          labelBounds.push({
            x: labelPos.x - textWidth / 2,
            y: labelPos.y - font.label.size,
            width: textWidth,
            height: font.label.size * 1.5
          });
          
          const hersheyPath = renderHersheyText(
            labelText,
            font.label.family,
            font.label.size,
            labelPos.x,
            labelPos.y,
            font.label.rotation,
            labelPos.textAnchor
          );
          
          if (hersheyPath) {
            indicators.push(
              <g
                key={`${paper.name}-landscape-label`}
                dangerouslySetInnerHTML={{ __html: hersheyPath }}
                style={{ color: sizeConfig.color }}
              />
            );
          }
        }
      }
    });
    
    return { indicators, labelBounds };
  };
  
  // Generate the complete SVG
  const paperSizeData = generatePaperSizeIndicators();
  const svgContent = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${pixelWidth}" 
      height="${pixelHeight}"
      viewBox="0 0 ${pixelWidth} ${pixelHeight}"
    >
      <rect width="${pixelWidth}" height="${pixelHeight}" fill="${canvas.backgroundColor}" />
      <rect x="${marginPixels}" y="${marginPixels}" width="${workingWidth}" height="${workingHeight}" fill="none" stroke="${measurements.color}" stroke-width="2" />
      ${generateGridLines().map((line) => {
        const props = line.props;
        return `<line x1="${props.x1}" y1="${props.y1}" x2="${props.x2}" y2="${props.y2}" stroke="${props.stroke}" stroke-width="${props.strokeWidth}" ${props.strokeDasharray !== 'none' ? `stroke-dasharray="${props.strokeDasharray}"` : ''} />`;
      }).join('\n')}
      ${paperSizeData.indicators.map((elem) => {
        if (elem.type === 'rect') {
          const props = elem.props;
          return `<rect x="${props.x}" y="${props.y}" width="${props.width}" height="${props.height}" fill="${props.fill}" stroke="${props.stroke}" stroke-width="${props.strokeWidth}" ${props.strokeDasharray ? `stroke-dasharray="${props.strokeDasharray}"` : ''} />`;
        } else if (elem.type === 'g') {
          const props = elem.props;
          return `<g style="color: ${props.style.color}">${props.dangerouslySetInnerHTML.__html}</g>`;
        }
        return '';
      }).join('\n')}
      ${measurements.enabled ? generateMeasurements()?.map((elem) => {
        if (elem.type === 'line') {
          const props = elem.props;
          return `<line x1="${props.x1}" y1="${props.y1}" x2="${props.x2}" y2="${props.y2}" stroke="${props.stroke}" stroke-width="${props.strokeWidth}" />`;
        } else if (elem.type === 'g') {
          const props = elem.props;
          return `<g style="color: ${props.style.color}">${props.dangerouslySetInnerHTML.__html}</g>`;
        }
        return '';
      }).join('\n') : ''}
    </svg>
  `;
  
  // Pass the SVG content up to parent
  useEffect(() => {
    onSVGGenerated(svgContent);
  }, [svgContent, onSVGGenerated]);
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.1));
  const handleZoomReset = () => setZoom(1);
  
  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.1, Math.min(3, prev + delta)));
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-auto bg-base-200"
      onWheel={handleWheel}
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          ${canvas.backgroundColor === '#ffffff' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'} 10px,
          ${canvas.backgroundColor === '#ffffff' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'} 11px
        )`
      }}
    >
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 join">
        <button 
          onClick={handleZoomOut} 
          className="btn btn-sm join-item"
          title="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button 
          onClick={handleZoomReset} 
          className="btn btn-sm join-item"
          title="Reset Zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button 
          onClick={handleZoomIn} 
          className="btn btn-sm join-item"
          title="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center justify-center min-h-full p-4">
        <svg
          viewBox={`0 0 ${pixelWidth} ${pixelHeight}`}
          className="shadow-lg"
          style={{ 
            width: `${pixelWidth * zoom}px`,
            height: `${pixelHeight * zoom}px`,
            transition: 'all 0.2s ease'
          }}
        >
        <rect width={pixelWidth} height={pixelHeight} fill={canvas.backgroundColor} />
        {generateGridLines()}
        {paperSizeData.indicators}
        {generateMeasurements()}
      </svg>
      </div>
    </div>
  );
};
