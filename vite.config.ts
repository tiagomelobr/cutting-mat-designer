import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    nodePolyfills({
      // Enable polyfills for specific Node.js modules needed by hersheytext
      include: ['path', 'fs', 'events', 'buffer'],
      // Whether to polyfill `node:` protocol imports
      protocolImports: true,
      // Polyfill Node.js globals
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    })
  ],
  base: '/cutting-mat-designer/', // Replace with your GitHub repo name
  define: {
    // Define Node.js globals for browser compatibility
    '__dirname': '""',
    '__filename': '""',
  },
  optimizeDeps: {
    // Include hersheytext for proper CommonJS to ESM conversion
    include: ['hersheytext'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/jspdf')) {
            return 'jspdf-vendor';
          }
          if (id.includes('node_modules/html2canvas')) {
            return 'html2canvas-vendor';
          }
        }
      },
      // Suppress warnings for Node.js built-in modules
      onwarn(warning, warn) {
        // Ignore externalized module warnings for browser compatibility
        if (warning.code === 'UNRESOLVED_IMPORT' && 
            (warning.message?.includes('externalized for browser compatibility') ||
             warning.id?.includes('hersheytext') ||
             warning.id?.includes('htmlparser2') ||
             warning.id?.includes('safe-buffer'))) {
          return;
        }
        warn(warning);
      }
    }
  },
})
