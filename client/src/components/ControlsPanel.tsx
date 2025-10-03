import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CuttingMatConfig } from '@/types/cutting-mat';
import CanvasDimensionControls from './CanvasDimensionControls';
import GridConfigControls from './GridConfigControls';
import PaperSizeControls from './PaperSizeControls';
import FeatureToggles from './FeatureToggles';
import ColorPicker from './ColorPicker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';

interface ControlsPanelProps {
  config: CuttingMatConfig;
  onConfigChange: (config: CuttingMatConfig) => void;
  onExport: () => void;
}

export default function ControlsPanel({ config, onConfigChange, onExport }: ControlsPanelProps) {
  const updateConfig = (updates: Partial<CuttingMatConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const getUnitLabel = () => {
    switch (config.unit) {
      case 'inches': return 'in';
      case 'cm': return 'cm';
      case 'mm': return 'mm';
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Controls</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={['dimensions', 'features']} className="space-y-2">
            <AccordionItem value="dimensions" className="border border-sidebar-border rounded-md px-4 bg-sidebar-accent/30">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline" data-testid="accordion-dimensions">
                Canvas Dimensions
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <CanvasDimensionControls
                    width={config.width}
                    height={config.height}
                    unit={config.unit}
                    onWidthChange={(width) => updateConfig({ width })}
                    onHeightChange={(height) => updateConfig({ height })}
                    onUnitChange={(unit) => updateConfig({ unit })}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="margin" className="text-sm font-medium">Margin ({getUnitLabel()})</Label>
                    <Input
                      id="margin"
                      type="number"
                      min="0"
                      step="0.1"
                      value={config.margin}
                      onChange={(e) => updateConfig({ margin: parseFloat(e.target.value) || 0 })}
                      className="font-mono"
                      data-testid="input-margin"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features" className="border border-sidebar-border rounded-md px-4 bg-sidebar-accent/30">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline" data-testid="accordion-features">
                Feature Toggles
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <FeatureToggles
                  features={config.features}
                  onFeaturesChange={(features) => updateConfig({ features })}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="grid" className="border border-sidebar-border rounded-md px-4 bg-sidebar-accent/30">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline" data-testid="accordion-grid">
                Grid Configuration
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <GridConfigControls
                  gridConfig={config.gridConfig}
                  onGridConfigChange={(gridConfig) => updateConfig({ gridConfig })}
                  unit={config.unit}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="paper" className="border border-sidebar-border rounded-md px-4 bg-sidebar-accent/30">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline" data-testid="accordion-paper">
                Paper Sizes
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <PaperSizeControls
                  enabledPaperSizes={config.enabledPaperSizes}
                  rotatedPaperSizes={config.rotatedPaperSizes}
                  onEnabledPaperSizesChange={(sizes) => updateConfig({ enabledPaperSizes: sizes })}
                  onRotatedPaperSizesChange={(sizes) => updateConfig({ rotatedPaperSizes: sizes })}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="colors" className="border border-sidebar-border rounded-md px-4 bg-sidebar-accent/30">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline" data-testid="accordion-colors">
                Colors
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-3">
                  <ColorPicker
                    value={config.backgroundColor}
                    onChange={(color) => updateConfig({ backgroundColor: color })}
                    label="Background"
                  />
                  <ColorPicker
                    value={config.paperSizeColor}
                    onChange={(color) => updateConfig({ paperSizeColor: color })}
                    label="Paper Size Indicators"
                  />
                  <ColorPicker
                    value={config.measurementColor}
                    onChange={(color) => updateConfig({ measurementColor: color })}
                    label="Measurements"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          className="w-full"
          onClick={onExport}
          data-testid="button-export"
        >
          <Download className="w-4 h-4 mr-2" />
          Export SVG
        </Button>
      </div>
    </div>
  );
}
