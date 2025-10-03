import { useState, useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { CanvasRenderer } from './components/CanvasRenderer';
import { useConfig } from './hooks/useConfig';
import { exportAsSVG, exportAsPDF } from './utils/export';

function App() {
  const { config, setConfig } = useConfig();
  const [svgContent, setSvgContent] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage or default to 'acid'
    return localStorage.getItem('theme') || 'acid';
  });

  // Apply theme to html element and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleExportSVG = () => {
    exportAsSVG({ config, svgContent });
    setToastMessage('SVG exported successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExportPDF = async () => {
    await exportAsPDF({ config, svgContent });
    setToastMessage('PDF exported successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel - Controls */}
      <div className="w-96 border-r border-base-300 flex flex-col">
        {/* Header with Theme Selector */}
        <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
          <h2 className="text-lg font-bold">Cutting Mat Designer</h2>
          
          {/* Theme Selector - matches daisyUI.com */}
          <div title="Change Theme" className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost gap-1.5 px-1.5" aria-label="Change Theme">
              <div className="grid shrink-0 grid-cols-2 gap-0.5 rounded-md border border-base-content/10 hover:border-base-content/20 p-1 bg-base-100 transition-colors">
                <div className="bg-base-content size-1 rounded-full"></div>
                <div className="bg-primary size-1 rounded-full"></div>
                <div className="bg-secondary size-1 rounded-full"></div>
                <div className="bg-accent size-1 rounded-full"></div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="hidden sm:inline-block size-2 fill-current opacity-60" viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <div className="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 h-[30.5rem] max-h-[calc(100vh-8.6rem)] overflow-y-auto border-[length:var(--border)] border-white/5 shadow-2xl outline-[length:var(--border)] outline-black/5">
              <ul className="menu w-56">
                <li className="menu-title text-xs">Change Theme</li>
                {['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk'].map((themeName) => (
                  <li key={themeName}>
                    <button
                      className="gap-3 px-2"
                      onClick={() => setTheme(themeName)}
                    >
                      <div data-theme={themeName} className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
                        <div className="bg-base-content size-1 rounded-full"></div>
                        <div className="bg-primary size-1 rounded-full"></div>
                        <div className="bg-secondary size-1 rounded-full"></div>
                        <div className="bg-accent size-1 rounded-full"></div>
                      </div>
                      <div className="w-32 truncate">{themeName}</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`invisible h-3 w-3 shrink-0 ${theme === themeName ? '!visible' : ''}`}
                      >
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </button>
                  </li>
                ))}
                <li></li>
                <li>
                  <a href="https://daisyui.com/theme-generator/" target="_blank" rel="noopener noreferrer">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 512 512">
                      <path d="M96,208H48a16,16,0,0,1,0-32H96a16,16,0,0,1,0,32Z"></path>
                      <line x1="90.25" y1="90.25" x2="124.19" y2="124.19"></line>
                      <path d="M124.19,140.19a15.91,15.91,0,0,1-11.31-4.69L78.93,101.56a16,16,0,0,1,22.63-22.63l33.94,33.95a16,16,0,0,1-11.31,27.31Z"></path>
                      <line x1="192" y1="48" x2="192" y2="96"></line>
                      <path d="M192,112a16,16,0,0,1-16-16V48a16,16,0,0,1,32,0V96A16,16,0,0,1,192,112Z"></path>
                      <line x1="293.89" y1="90.25" x2="259.94" y2="124.19"></line>
                      <path d="M259.94,140.19a16,16,0,0,1-11.31-27.31l33.94-33.95a16,16,0,0,1,22.63,22.63L271.25,135.5A15.91,15.91,0,0,1,259.94,140.19Z"></path>
                      <line x1="124.19" y1="259.94" x2="90.25" y2="293.89"></line>
                      <path d="M90.25,309.89a15.91,15.91,0,0,1-11.32-4.69,16,16,0,0,1,0-22.63l33.95-33.94a16,16,0,0,1,22.62,22.62l-33.94,33.95A15.91,15.91,0,0,1,90.25,309.89Z"></path>
                      <path d="M219.06,450.54c-4.82,0-9.25-1.28-12.92-3.76C199.07,442,179.47,426,169,405.72c-18.07-34.85-16.47-68.78,4.84-104.25a16,16,0,0,1,28.72,13.63c-17,29.41-16.76,51.18-2.51,74.7,8.59,14.14,25.29,26.67,33.69,30.87a16,16,0,0,1-14.68,28.37Z"></path>
                      <path d="M362.13,421.52c-7.12,0-14.07-.86-20.62-2.52C321.57,414.14,304,403.6,292.87,385c-14.12-23.66-18.53-55.37-12.85-92.07A16,16,0,1,1,311.5,298c-4.77,30.82-1.14,54.67,10.53,71,10.07,13.77,27.19,22.49,48.21,24.54,27.34,2.66,56.64-9.87,84.95-36.28,30.72-28.65,47.24-63.45,50.37-98a16,16,0,0,1,31.67,4.66c-3.73,41.22-23.12,82.15-57.66,115.08C449.14,407.48,407.18,421.52,362.13,421.52Z"></path>
                      <path d="M369.44,307.28c-1.39,0-2.78-.13-4.16-.41-24.28-4.89-44.6-18.94-58.65-40.83-26.78-41.77-29.47-87.26-7.77-127.67,19.43-36.24,55.19-61.36,100.59-70.61,40-8.17,82.18-1.34,118.56,19.23,35.86,20.28,62.96,52.7,76.29,91.27,11.94,34.59,13.33,72.88,3.92,107.8a16,16,0,0,1-31.34-6.26c7.88-29.24,6.8-61.4-3-90.41-11-33-32.87-60.27-61.55-76.76-29.95-17.22-65.11-22.85-99-15.81-38.36,8-68.15,28.12-83.81,56.61-17.57,32.69-15.71,70.39,5.37,105.6,10.88,18.2,26.85,29.1,46.19,31.53a16,16,0,0,1-3.64,31.72Z"></path>
                    </svg>
                    <div className="grow text-sm font-bold">Make your theme!</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ControlPanel config={config} onConfigChange={setConfig} />
        </div>
        
        {/* Export Buttons */}
        <div className="p-4 border-t border-base-300 bg-base-100">
          <button 
            onClick={handleExportSVG} 
            className="btn btn-primary w-full mb-2"
          >
            Export as SVG
          </button>
          <button 
            onClick={handleExportPDF} 
            className="btn btn-secondary w-full"
          >
            Export as PDF
          </button>
        </div>
      </div>

      {/* Right Panel - Canvas Preview */}
      <div className="flex-1 overflow-hidden">
        <CanvasRenderer config={config} onSVGGenerated={setSvgContent} />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Buy Me a Coffee */}
      <div className="fixed bottom-4 right-4 z-50">
        <a 
          href="https://www.buymeacoffee.com/tiagomelo" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
            alt="Buy Me A Coffee" 
            className="h-12 hover:opacity-80 transition-opacity"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
