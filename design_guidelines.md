# Cutting Mat Layout Generator - Design Guidelines

## Design Approach

**Selected Approach**: Design System (Productivity Tool Pattern)

**Justification**: This is a utility-focused precision tool requiring efficiency, clarity, and technical accuracy. Drawing inspiration from professional design software like Adobe Illustrator, Figma, and technical drafting tools that prioritize function and usability.

**Core Principles**:
- Precision-first interface with clear visual hierarchy
- Professional workspace aesthetic with minimal distractions
- Real-time visual feedback for all adjustments
- Efficient control layout for frequent adjustments

---

## Color Palette

**Dark Mode (Primary)**:
- Background: 220 15% 12% (deep charcoal)
- Surface: 220 14% 16% (elevated panels)
- Surface Elevated: 220 13% 20% (controls panel)
- Border: 220 12% 28% (subtle separation)
- Text Primary: 220 10% 95% (high contrast)
- Text Secondary: 220 8% 70% (labels, descriptions)
- Primary Accent: 205 100% 55% (professional blue for active elements)
- Grid Lines: 220 8% 45% (neutral gray for primary grid)
- Paper Size Indicators: 35 85% 55% (amber/orange for overlays)
- Measurement Labels: 205 90% 70% (light blue for readability)
- Success: 142 72% 50% (for export/confirmation)

**Light Mode**:
- Background: 0 0% 98% (clean white)
- Surface: 0 0% 100% (pure white panels)
- Border: 220 12% 85%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%

---

## Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - UI controls, labels, measurements
- Monospace: 'JetBrains Mono' (Google Fonts) - Numerical inputs, coordinates

**Scale**:
- Display (Headings): 600 weight, 24px
- Body (Labels): 400 weight, 14px
- Controls: 500 weight, 13px
- Measurements: 400 weight, 11px (monospace)
- Small (Hints): 400 weight, 12px

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, and 8** (e.g., p-4, gap-6, m-8)

**Application Structure**:
- **Two-Panel Layout**: Controls sidebar (left, 320px fixed) + Canvas area (right, flexible)
- Controls Panel: Sticky positioning, scrollable content with organized sections
- Canvas Area: Centered SVG preview with zoom controls
- Bottom Action Bar: Export button, canvas info (dimensions, zoom level)

**Responsive Behavior**:
- Desktop: Side-by-side panels
- Tablet/Mobile: Collapsible controls panel with toggle button, full-width canvas

---

## Component Library

### Navigation/Header
- **Top Bar**: Dark background (220 15% 12%) with app title (left), quick actions (right)
- Height: 56px with px-6 horizontal padding
- Include: Save/Load buttons, theme toggle, help icon

### Controls Panel (Sidebar)
- **Organized Sections** with collapsible accordions:
  1. Canvas Dimensions (width/height numeric inputs)
  2. Grid Configuration (primary/secondary/tertiary line settings)
  3. Paper Size Overlays (checkboxes for A1-A4, Letter, Legal, Tabloid)
  4. Measurement Units (radio buttons: inches, cm, mm)
  5. Visual Styling (line weights, colors, dash patterns)
  6. Feature Toggles (checkboxes for each drawable element)

- **Input Components**:
  - Number inputs with step controls (spinner buttons)
  - Color pickers with visual swatch preview
  - Sliders for continuous values (line weight: 0.5-3px)
  - Checkboxes with clear labels and icons
  - Segmented controls for line styles (solid/dashed/dotted)

- Section spacing: py-4, gap-4 between controls
- Visual separation: 1px border-bottom between sections

### SVG Canvas Preview
- **Centered Display**: max-w-full with responsive scaling
- Background: Subtle checkerboard pattern (220 10% 18% and 220 10% 16%)
- Border: 2px solid border (220 12% 28%)
- Drop shadow: Large soft shadow for depth
- Zoom controls: Bottom-right overlay (Fit, 50%, 100%, 200%)

### Form Elements
- **Text Inputs**: Dark background (220 14% 18%), 1px border, rounded corners (4px)
- **Checkboxes**: Custom styled with primary accent color when checked
- **Color Pickers**: Compact swatch trigger opening full picker modal
- **Sliders**: Track (gray), thumb (primary accent), value display on hover
- Focus states: 2px primary accent ring

### Buttons
- **Primary** (Export): Solid primary accent background, white text, px-6 py-2, rounded
- **Secondary** (Reset, Clear): Outline style with border
- **Icon Buttons**: Square (32px), minimal hover states
- All buttons: 500 weight text, smooth transitions

### Export Modal
- **Centered Overlay**: Dark backdrop (opacity 50%)
- **Modal Card**: 480px width, elevated surface color
- Content: Filename input, format selector (SVG only for now), preview thumbnail
- Actions: Cancel (secondary) + Export (primary) buttons

---

## SVG Rendering Specifications

**Grid Line Hierarchy**:
- Primary Grid: 1.5px weight, solid, grid lines color
- Secondary Grid: 0.75px weight, dashed (4-2 pattern)
- Tertiary Grid: 0.5px weight, dotted (1-2 pattern)

**Paper Size Indicators**:
- Outline rectangles positioned on grid
- 2px stroke weight, paper size indicator color
- Dashed pattern (8-4) for distinction
- Label positioned at top-left corner with size name

**Measurement Labels**:
- Positioned on primary axes (top, left edges)
- Small text (10-11px), measurement labels color
- Tick marks: 4px perpendicular lines at intervals
- Unit abbreviation displayed once per axis

**Visual Clarity**:
- Maintain 1:1 pixel accuracy for grid calculations
- Anti-aliased rendering for smooth lines
- Crisp text rendering for measurements

---

## Interaction Patterns

**Real-time Updates**: Canvas regenerates on any control change (debounced 150ms)
**Drag to Pan**: Canvas draggable when zoomed in
**Scroll to Zoom**: Mouse wheel zooms canvas (+ modifier key)
**Checkbox Toggles**: Immediate show/hide of corresponding elements
**Color Picker**: Click swatch → inline color picker appears
**Hover States**: Subtle brightness increase on interactive elements
**Input Validation**: Real-time feedback for invalid dimensions

---

## Accessibility

- All controls keyboard navigable (Tab order logical)
- ARIA labels on icon buttons and checkboxes
- Focus indicators visible (2px accent ring)
- Color contrast ratios meet WCAG AA standards
- Screen reader announcements for canvas updates
- Zoom controls accessible via keyboard shortcuts

---

## No Hero Image

This is a utility application - no marketing hero section required. Launch directly into the functional workspace.