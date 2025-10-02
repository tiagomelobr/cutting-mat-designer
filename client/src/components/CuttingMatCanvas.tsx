import { useEffect, useRef, useState } from 'react';
import { CuttingMatConfig } from '@/types/cutting-mat';
import { generateCuttingMatSVG } from '@/lib/svg-generator';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CuttingMatCanvasProps {
  config: CuttingMatConfig;
}

export default function CuttingMatCanvas({ config }: CuttingMatCanvasProps) {
  const [zoom, setZoom] = useState(100);
  const [svgContent, setSvgContent] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = generateCuttingMatSVG(config);
    setSvgContent(content);
  }, [config]);

  const zoomLevels = [50, 75, 100, 150, 200];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground">
            {config.width} × {config.height} {config.unit}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            disabled={zoom <= 25}
            data-testid="button-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-mono min-w-[4rem] text-center">
            {zoom}%
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(Math.min(400, zoom + 25))}
            disabled={zoom >= 400}
            data-testid="button-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          {zoomLevels.map((level) => (
            <Button
              key={level}
              size="sm"
              variant={zoom === level ? 'default' : 'outline'}
              onClick={() => setZoom(level)}
              data-testid={`button-zoom-${level}`}
            >
              {level}%
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(100)}
            data-testid="button-zoom-fit"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-[repeating-linear-gradient(45deg,hsl(var(--muted)),hsl(var(--muted))_10px,hsl(var(--muted)/0.5)_10px,hsl(var(--muted)/0.5)_20px)]"
      >
        <div className="flex items-center justify-center min-h-full p-8">
          <div 
            className="bg-card border-2 border-border shadow-2xl"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            data-testid="svg-canvas"
          />
        </div>
      </div>
    </div>
  );
}
