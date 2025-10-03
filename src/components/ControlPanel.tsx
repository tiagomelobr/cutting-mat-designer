import type { AppConfig, Unit, LineStyle, HersheyFont, LabelAnchor, TextAnchor } from '../types';
import { PAPER_SIZES } from '../config/constants';
import { HERSHEY_FONTS } from '../utils/hersheyFonts';

interface ControlPanelProps {
  config: AppConfig;
  onConfigChange: (config: AppConfig) => void;
}

const getUnitLabel = (unit: Unit): string => {
  switch (unit) {
    case 'inches': return 'in';
    case 'cm': return 'cm';
    case 'mm': return 'mm';
  }
};

export const ControlPanel = ({ config, onConfigChange }: ControlPanelProps) => {
  const updateConfig = (updates: Partial<AppConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  if (!config.font || !config.font.label || !config.font.axis) {
    console.error('Font config is missing');
    return <div className="p-4 text-error">Configuration error. Please refresh the page.</div>;
  }

  const unitLabel = getUnitLabel(config.canvas.unit);

  return (
    <div className="h-full overflow-y-auto bg-base-100 p-6">
      <div className="max-w-2xl">
        <p className="text-sm opacity-60 mb-8">Configure your custom cutting mat template</p>
        
        {/* Canvas Setup */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title font-semibold text-base">Canvas Setup</div>
          <div className="collapse-content space-y-5 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text text-xs opacity-70 block mb-2">Width ({unitLabel})</label>
                <input
                  type="number"
                  value={config.canvas.width}
                  onChange={(e) => updateConfig({
                    canvas: { ...config.canvas, width: parseFloat(e.target.value) || 0 }
                  })}
                  className="input input-bordered input-sm w-full"
                  step="0.1"
                  min="1"
                />
              </div>
              
              <div>
                <label className="label-text text-xs opacity-70 block mb-2">Height ({unitLabel})</label>
                <input
                  type="number"
                  value={config.canvas.height}
                  onChange={(e) => updateConfig({
                    canvas: { ...config.canvas, height: parseFloat(e.target.value) || 0 }
                  })}
                  className="input input-bordered input-sm w-full"
                  step="0.1"
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Measurement Unit</label>
              <select
                value={config.canvas.unit}
                onChange={(e) => updateConfig({
                  canvas: { ...config.canvas, unit: e.target.value as Unit }
                })}
                className="select select-bordered select-sm w-48"
              >
                <option value="inches">Inches</option>
                <option value="cm">Centimeters</option>
                <option value="mm">Millimeters</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Margin ({unitLabel})</label>
              <div className="flex items-center gap-2 w-64">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={config.canvas.margin}
                  onChange={(e) => updateConfig({
                    canvas: { ...config.canvas, margin: parseFloat(e.target.value) }
                  })}
                  className="range range-primary range-xs flex-1"
                />
                <input
                  type="number"
                  value={config.canvas.margin}
                  onChange={(e) => updateConfig({
                    canvas: { ...config.canvas, margin: parseFloat(e.target.value) || 0 }
                  })}
                  className="input input-bordered input-xs w-16 text-center"
                  step="0.01"
                  min="0"
                  max="2"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Background Color</label>
              <input
                type="color"
                value={config.canvas.backgroundColor}
                onChange={(e) => updateConfig({
                  canvas: { ...config.canvas, backgroundColor: e.target.value }
                })}
                className="w-20 h-8 rounded cursor-pointer border border-base-300"
              />
            </div>
          </div>
        </div>
        
        {/* Measurements & Axis */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title font-semibold text-base">Measurements & Axis Labels</div>
          <div className="collapse-content space-y-5 pt-4">
            <div className="flex items-center justify-between">
              <label className="label-text text-xs opacity-70">Enable Measurements</label>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={config.measurements.enabled}
                onChange={(e) => updateConfig({
                  measurements: { ...config.measurements, enabled: e.target.checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="label-text text-xs opacity-70">Show Axis Labels</label>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={config.measurements.showLabels}
                onChange={(e) => updateConfig({
                  measurements: { ...config.measurements, showLabels: e.target.checked }
                })}
                disabled={!config.measurements.enabled}
              />
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Measurement Color</label>
              <input
                type="color"
                value={config.measurements.color}
                onChange={(e) => updateConfig({
                  measurements: { ...config.measurements, color: e.target.value }
                })}
                className="w-20 h-8 rounded cursor-pointer border border-base-300"
              />
            </div>
            
            {config.measurements.showLabels && (
              <>
                <div className="divider text-xs">Label Settings</div>
                
                <div className="flex items-center justify-between gap-4">
                  <label className="label-text text-xs opacity-70">Font Style</label>
                  <select
                    value={config.font.axis.family}
                    onChange={(e) => updateConfig({
                      font: { ...config.font, axis: { ...config.font.axis, family: e.target.value as HersheyFont } }
                    })}
                    className="select select-bordered select-sm w-48"
                  >
                    {Object.entries(HERSHEY_FONTS).map(([key, value]) => (
                      <option key={key} value={key}>{value.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <label className="label-text text-xs opacity-70">Size (px)</label>
                  <div className="flex items-center gap-2 w-64">
                    <input
                      type="range"
                      min="6"
                      max="72"
                      value={config.font.axis.size}
                      onChange={(e) => updateConfig({
                        font: { ...config.font, axis: { ...config.font.axis, size: parseFloat(e.target.value) } }
                      })}
                      className="range range-primary range-xs flex-1"
                    />
                    <input
                      type="number"
                      value={config.font.axis.size}
                      onChange={(e) => updateConfig({
                        font: { ...config.font, axis: { ...config.font.axis, size: parseFloat(e.target.value) || 6 } }
                      })}
                      className="input input-bordered input-xs w-16 text-center"
                      step="1"
                      min="6"
                      max="72"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <label className="label-text text-xs opacity-70">Distance from Edge (px)</label>
                  <div className="flex items-center gap-2 w-64">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={config.font.axis.labelDistance}
                      onChange={(e) => updateConfig({
                        font: { ...config.font, axis: { ...config.font.axis, labelDistance: parseFloat(e.target.value) } }
                      })}
                      className="range range-primary range-xs flex-1"
                    />
                    <input
                      type="number"
                      value={config.font.axis.labelDistance}
                      onChange={(e) => updateConfig({
                        font: { ...config.font, axis: { ...config.font.axis, labelDistance: parseFloat(e.target.value) || 5 } }
                      })}
                      className="input input-bordered input-xs w-16 text-center"
                      step="1"
                      min="5"
                      max="100"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="label-text text-xs opacity-70">Top Rotation (°)</label>
                    <div className="flex items-center gap-2 w-64">
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={config.font.axis.topRotation}
                        onChange={(e) => updateConfig({
                          font: { ...config.font, axis: { ...config.font.axis, topRotation: parseFloat(e.target.value) } }
                        })}
                        className="range range-secondary range-xs flex-1"
                      />
                      <input
                        type="number"
                        value={config.font.axis.topRotation}
                        onChange={(e) => updateConfig({
                          font: { ...config.font, axis: { ...config.font.axis, topRotation: parseFloat(e.target.value) || 0 } }
                        })}
                        className="input input-bordered input-xs w-16 text-center"
                        step="1"
                        min="-180"
                        max="180"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <label className="label-text text-xs opacity-70">Left Rotation (°)</label>
                    <div className="flex items-center gap-2 w-64">
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={config.font.axis.leftRotation}
                        onChange={(e) => updateConfig({
                          font: { ...config.font, axis: { ...config.font.axis, leftRotation: parseFloat(e.target.value) } }
                        })}
                        className="range range-secondary range-xs flex-1"
                      />
                      <input
                        type="number"
                        value={config.font.axis.leftRotation}
                        onChange={(e) => updateConfig({
                          font: { ...config.font, axis: { ...config.font.axis, leftRotation: parseFloat(e.target.value) || 0 } }
                        })}
                        className="input input-bordered input-xs w-16 text-center"
                        step="1"
                        min="-180"
                        max="180"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text text-xs opacity-70 block mb-2">Top Alignment</label>
                    <select
                      value={config.font.axis.topAlignment}
                      onChange={(e) => updateConfig({
                        font: { ...config.font, axis: { ...config.font.axis, topAlignment: e.target.value as TextAnchor } }
                      })}
                      className="select select-bordered select-sm w-full"
                    >
                      <option value="start">Start</option>
                      <option value="middle">Middle</option>
                      <option value="end">End</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label-text text-xs opacity-70 block mb-2">Left Alignment</label>
                    <select
                      value={config.font.axis.leftAlignment}
                      onChange={(e) => updateConfig({
                        font: { ...config.font, axis: { ...config.font.axis, leftAlignment: e.target.value as TextAnchor } }
                      })}
                      className="select select-bordered select-sm w-full"
                    >
                      <option value="start">Start</option>
                      <option value="middle">Middle</option>
                      <option value="end">End</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Grid Settings */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
          <input type="checkbox" />
          <div className="collapse-title font-semibold text-base">Grid Settings</div>
          <div className="collapse-content space-y-5 pt-4">
            {/* Primary Grid */}
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="label-text text-base font-semibold">Primary Grid</label>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm toggle-primary"
                    checked={config.primaryGrid.enabled}
                    onChange={(e) => updateConfig({
                      primaryGrid: { ...config.primaryGrid, enabled: e.target.checked }
                    })}
                  />
                </div>
                
                {config.primaryGrid.enabled && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <label className="label-text text-xs opacity-70">Interval ({unitLabel})</label>
                      <div className="flex items-center gap-2 w-48">
                        <input
                          type="range"
                          min="0.1"
                          max="10"
                          step="0.1"
                          value={config.primaryGrid.interval}
                          onChange={(e) => updateConfig({
                            primaryGrid: { ...config.primaryGrid, interval: parseFloat(e.target.value) }
                          })}
                          className="range range-primary range-xs flex-1"
                        />
                        <input
                          type="number"
                          value={config.primaryGrid.interval}
                          onChange={(e) => updateConfig({
                            primaryGrid: { ...config.primaryGrid, interval: parseFloat(e.target.value) || 0.1 }
                          })}
                          className="input input-bordered input-xs w-16 text-center"
                          step="0.1"
                          min="0.1"
                          max="10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <label className="label-text text-xs opacity-70">Line Weight (px)</label>
                      <div className="flex items-center gap-2 w-48">
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={config.primaryGrid.lineWeight}
                          onChange={(e) => updateConfig({
                            primaryGrid: { ...config.primaryGrid, lineWeight: parseFloat(e.target.value) }
                          })}
                          className="range range-primary range-xs flex-1"
                        />
                        <input
                          type="number"
                          value={config.primaryGrid.lineWeight}
                          onChange={(e) => updateConfig({
                            primaryGrid: { ...config.primaryGrid, lineWeight: parseFloat(e.target.value) || 0.1 }
                          })}
                          className="input input-bordered input-xs w-16 text-center"
                          step="0.1"
                          min="0.1"
                          max="5"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-text text-xs opacity-70 block mb-2">Style</label>
                        <select
                          value={config.primaryGrid.lineStyle}
                          onChange={(e) => updateConfig({
                            primaryGrid: { ...config.primaryGrid, lineStyle: e.target.value as LineStyle }
                          })}
                          className="select select-bordered select-sm w-full"
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="label-text text-xs opacity-70 block mb-2">Color</label>
                        <input
                          type="color"
                          value={config.primaryGrid.color}
                          onChange={(e) => updateConfig({
                            primaryGrid: { ...config.primaryGrid, color: e.target.value }
                          })}
                          className="w-full h-9 rounded cursor-pointer border border-base-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Secondary Grid */}
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="label-text text-base font-semibold">Secondary Grid</label>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm toggle-secondary"
                    checked={config.secondaryGrid.enabled}
                    onChange={(e) => updateConfig({
                      secondaryGrid: { ...config.secondaryGrid, enabled: e.target.checked }
                    })}
                  />
                </div>
                
                {config.secondaryGrid.enabled && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <label className="label-text text-xs opacity-70">Interval ({unitLabel})</label>
                      <div className="flex items-center gap-2 w-48">
                        <input
                          type="range"
                          min="0.1"
                          max="10"
                          step="0.1"
                          value={config.secondaryGrid.interval}
                          onChange={(e) => updateConfig({
                            secondaryGrid: { ...config.secondaryGrid, interval: parseFloat(e.target.value) }
                          })}
                          className="range range-secondary range-xs flex-1"
                        />
                        <input
                          type="number"
                          value={config.secondaryGrid.interval}
                          onChange={(e) => updateConfig({
                            secondaryGrid: { ...config.secondaryGrid, interval: parseFloat(e.target.value) || 0.1 }
                          })}
                          className="input input-bordered input-xs w-16 text-center"
                          step="0.1"
                          min="0.1"
                          max="10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <label className="label-text text-xs opacity-70">Line Weight (px)</label>
                      <div className="flex items-center gap-2 w-48">
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={config.secondaryGrid.lineWeight}
                          onChange={(e) => updateConfig({
                            secondaryGrid: { ...config.secondaryGrid, lineWeight: parseFloat(e.target.value) }
                          })}
                          className="range range-secondary range-xs flex-1"
                        />
                        <input
                          type="number"
                          value={config.secondaryGrid.lineWeight}
                          onChange={(e) => updateConfig({
                            secondaryGrid: { ...config.secondaryGrid, lineWeight: parseFloat(e.target.value) || 0.1 }
                          })}
                          className="input input-bordered input-xs w-16 text-center"
                          step="0.1"
                          min="0.1"
                          max="5"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-text text-xs opacity-70 block mb-2">Style</label>
                        <select
                          value={config.secondaryGrid.lineStyle}
                          onChange={(e) => updateConfig({
                            secondaryGrid: { ...config.secondaryGrid, lineStyle: e.target.value as LineStyle }
                          })}
                          className="select select-bordered select-sm w-full"
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="label-text text-xs opacity-70 block mb-2">Color</label>
                        <input
                          type="color"
                          value={config.secondaryGrid.color}
                          onChange={(e) => updateConfig({
                            secondaryGrid: { ...config.secondaryGrid, color: e.target.value }
                          })}
                          className="w-full h-9 rounded cursor-pointer border border-base-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tertiary Grid */}
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="label-text text-base font-semibold">Tertiary Grid</label>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm toggle-accent"
                    checked={config.tertiaryGrid.enabled}
                    onChange={(e) => updateConfig({
                      tertiaryGrid: { ...config.tertiaryGrid, enabled: e.target.checked }
                    })}
                  />
                </div>
                
                {config.tertiaryGrid.enabled && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <label className="label-text text-xs opacity-70">Interval ({unitLabel})</label>
                      <div className="flex items-center gap-2 w-48">
                        <input
                          type="range"
                          min="0.1"
                          max="10"
                          step="0.1"
                          value={config.tertiaryGrid.interval}
                          onChange={(e) => updateConfig({
                            tertiaryGrid: { ...config.tertiaryGrid, interval: parseFloat(e.target.value) }
                          })}
                          className="range range-accent range-xs flex-1"
                        />
                        <input
                          type="number"
                          value={config.tertiaryGrid.interval}
                          onChange={(e) => updateConfig({
                            tertiaryGrid: { ...config.tertiaryGrid, interval: parseFloat(e.target.value) || 0.1 }
                          })}
                          className="input input-bordered input-xs w-16 text-center"
                          step="0.1"
                          min="0.1"
                          max="10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <label className="label-text text-xs opacity-70">Line Weight (px)</label>
                      <div className="flex items-center gap-2 w-48">
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={config.tertiaryGrid.lineWeight}
                          onChange={(e) => updateConfig({
                            tertiaryGrid: { ...config.tertiaryGrid, lineWeight: parseFloat(e.target.value) }
                          })}
                          className="range range-accent range-xs flex-1"
                        />
                        <input
                          type="number"
                          value={config.tertiaryGrid.lineWeight}
                          onChange={(e) => updateConfig({
                            tertiaryGrid: { ...config.tertiaryGrid, lineWeight: parseFloat(e.target.value) || 0.1 }
                          })}
                          className="input input-bordered input-xs w-16 text-center"
                          step="0.1"
                          min="0.1"
                          max="5"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-text text-xs opacity-70 block mb-2">Style</label>
                        <select
                          value={config.tertiaryGrid.lineStyle}
                          onChange={(e) => updateConfig({
                            tertiaryGrid: { ...config.tertiaryGrid, lineStyle: e.target.value as LineStyle }
                          })}
                          className="select select-bordered select-sm w-full"
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="label-text text-xs opacity-70 block mb-2">Color</label>
                        <input
                          type="color"
                          value={config.tertiaryGrid.color}
                          onChange={(e) => updateConfig({
                            tertiaryGrid: { ...config.tertiaryGrid, color: e.target.value }
                          })}
                          className="w-full h-9 rounded cursor-pointer border border-base-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Paper Size Indicators */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
          <input type="checkbox" />
          <div className="collapse-title font-semibold text-base">Paper Size Indicators</div>
          <div className="collapse-content space-y-6 pt-4">
            {PAPER_SIZES.map((paper, index) => {
              const sizeConfig = config.paperSizes[paper.name];
              return (
                <div key={paper.name}>
                  {index > 0 && <div className="divider my-0"></div>}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{paper.name}</h4>
                        <p className="text-xs opacity-60">
                          {paper.width} × {paper.height} {paper.unit}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm"
                        checked={sizeConfig?.enabled || false}
                        onChange={(e) => updateConfig({
                          paperSizes: {
                            ...config.paperSizes,
                            [paper.name]: { ...sizeConfig, enabled: e.target.checked }
                          }
                        })}
                      />
                    </div>
                    
                    {sizeConfig?.enabled && (
                      <div className="space-y-4 pl-4">
                        <div>
                          <label className="label-text text-xs opacity-70 block mb-2">Custom Label</label>
                          <input
                            type="text"
                            placeholder={paper.name}
                            value={sizeConfig.customLabel || ''}
                            onChange={(e) => updateConfig({
                              paperSizes: {
                                ...config.paperSizes,
                                [paper.name]: { ...sizeConfig, customLabel: e.target.value }
                              }
                            })}
                            className="input input-bordered input-xs w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="label-text text-xs opacity-70 block mb-2">Orientation</label>
                          <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2 py-1">
                              <input
                                type="radio"
                                name={`orientation-${paper.name}`}
                                className="radio radio-xs radio-primary"
                                checked={sizeConfig.portrait && !sizeConfig.landscape}
                                onChange={() => updateConfig({
                                  paperSizes: {
                                    ...config.paperSizes,
                                    [paper.name]: { ...sizeConfig, portrait: true, landscape: false }
                                  }
                                })}
                              />
                              <span className="label-text text-xs">Portrait</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-2 py-1">
                              <input
                                type="radio"
                                name={`orientation-${paper.name}`}
                                className="radio radio-xs radio-primary"
                                checked={!sizeConfig.portrait && sizeConfig.landscape}
                                onChange={() => updateConfig({
                                  paperSizes: {
                                    ...config.paperSizes,
                                    [paper.name]: { ...sizeConfig, portrait: false, landscape: true }
                                  }
                                })}
                              />
                              <span className="label-text text-xs">Landscape</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-2 py-1">
                              <input
                                type="radio"
                                name={`orientation-${paper.name}`}
                                className="radio radio-xs radio-primary"
                                checked={sizeConfig.portrait && sizeConfig.landscape}
                                onChange={() => updateConfig({
                                  paperSizes: {
                                    ...config.paperSizes,
                                    [paper.name]: { ...sizeConfig, portrait: true, landscape: true }
                                  }
                                })}
                              />
                              <span className="label-text text-xs">Both</span>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="label-text text-xs opacity-70 block mb-2">Label Position</label>
                          <select
                            value={sizeConfig.labelAnchor}
                            onChange={(e) => updateConfig({
                              paperSizes: {
                                ...config.paperSizes,
                                [paper.name]: { ...sizeConfig, labelAnchor: e.target.value as LabelAnchor }
                              }
                            })}
                            className="select select-bordered select-xs w-full"
                          >
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="top-left">Top Left</option>
                            <option value="top-right">Top Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="label-text text-xs opacity-70">Color</label>
                          <input
                            type="color"
                            value={sizeConfig.color}
                            onChange={(e) => updateConfig({
                              paperSizes: {
                                ...config.paperSizes,
                                [paper.name]: { ...sizeConfig, color: e.target.value }
                              }
                            })}
                            className="w-10 h-6 rounded cursor-pointer border border-base-300"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Paper Label Font */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-4">
          <input type="checkbox" />
          <div className="collapse-title font-semibold text-base">Paper Label Font</div>
          <div className="collapse-content space-y-5 pt-4">
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Font Style</label>
              <select
                value={config.font.label.family}
                onChange={(e) => updateConfig({
                  font: { ...config.font, label: { ...config.font.label, family: e.target.value as HersheyFont } }
                })}
                className="select select-bordered select-sm w-48"
              >
                {Object.entries(HERSHEY_FONTS).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Size (px)</label>
              <div className="flex items-center gap-2 w-64">
                <input
                  type="range"
                  min="6"
                  max="72"
                  value={config.font.label.size}
                  onChange={(e) => updateConfig({
                    font: { ...config.font, label: { ...config.font.label, size: parseFloat(e.target.value) } }
                  })}
                  className="range range-primary range-xs flex-1"
                />
                <input
                  type="number"
                  value={config.font.label.size}
                  onChange={(e) => updateConfig({
                    font: { ...config.font, label: { ...config.font.label, size: parseFloat(e.target.value) || 6 } }
                  })}
                  className="input input-bordered input-xs w-16 text-center"
                  min="6"
                  max="72"
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="label-text text-xs opacity-70">Rotation (°)</label>
              <div className="flex items-center gap-2 w-64">
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={config.font.label.rotation}
                  onChange={(e) => updateConfig({
                    font: { ...config.font, label: { ...config.font.label, rotation: parseFloat(e.target.value) } }
                  })}
                  className="range range-secondary range-xs flex-1"
                />
                <input
                  type="number"
                  value={config.font.label.rotation}
                  onChange={(e) => updateConfig({
                    font: { ...config.font, label: { ...config.font.label, rotation: parseFloat(e.target.value) || 0 } }
                  })}
                  className="input input-bordered input-xs w-16 text-center"
                  min="-180"
                  max="180"
                  step="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
