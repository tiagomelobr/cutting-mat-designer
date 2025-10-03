# Cutting Mat Layout Generator

A precision web application for designing and exporting professional cutting mat layouts with configurable grids, measurements, and paper size overlays.

## Features

- 🎨 **Customizable Canvas** - Set exact dimensions in inches, centimeters, or millimeters
- 📐 **Multi-Tier Grid System** - Three independent grid levels with customizable intervals and styles
- 📏 **Measurement Tools** - Tick marks and numerical labels for precise reference
- 📄 **Paper Size Indicators** - Visual overlays for A-series, Letter, Legal, and Tabloid sizes
- 🎨 **Full Color Control** - Customize all visual elements
- 💾 **Auto-Save** - All settings automatically persist in browser storage
- 📤 **Export** - Download as SVG or PDF with smart naming

## Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **DaisyUI v5** - Beautiful UI components
- **jsPDF** - Client-side PDF generation

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Cutting-Mat-Designer.git
cd Cutting-Mat-Designer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/Cutting-Mat-Designer/`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## Deploying to GitHub Pages

### First-Time Setup

1. **Update vite.config.ts** - Change the `base` value to match your repository name:
   ```typescript
   base: '/your-repo-name/',
   ```

2. **Enable GitHub Pages** in your repository:
   - Go to Settings > Pages
   - Source: GitHub Actions

3. **Push to main branch** - The GitHub Actions workflow will automatically build and deploy

## Usage

1. **Configure Canvas** - Set your cutting mat dimensions and units
2. **Enable Features** - Toggle grids, measurements, and paper sizes
3. **Customize Appearance** - Adjust colors, line styles, and weights
4. **Preview in Real-Time** - See changes instantly in the canvas
5. **Export** - Download as SVG or PDF

## Project Structure

```
src/
├── components/        # React components
│   ├── CanvasRenderer.tsx
│   └── ControlPanel.tsx
├── config/           # Configuration and constants
│   └── constants.ts
├── hooks/            # Custom React hooks
│   └── useConfig.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   ├── export.ts
│   ├── storage.ts
│   └── units.ts
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- Built with [Vite](https://vite.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/)
- PDF export powered by [jsPDF](https://github.com/parallax/jsPDF)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
