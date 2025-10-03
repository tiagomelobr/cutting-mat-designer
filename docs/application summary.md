# Cutting Mat Layout Generator - Application Summary

## Overview

**Cutting Mat Layout Generator** is a precision web application that enables users to design, customize, and export professional cutting mat layouts with configurable grids, measurements, and paper size overlays. The tool is designed for crafters, designers, and makers who need accurate reference grids for cutting, measuring, and layout work.

---

## Core User-Facing Features

### 1. Canvas Dimension Controls

Users can define the exact size of their cutting mat layout:

- **Width & Height Configuration**: Set precise dimensions for the cutting mat
- **Multiple Unit Systems**: Choose between inches, centimeters, or millimeters
- **Adjustable Margins**: Add customizable margins around the working area
- **Real-time Preview**: See changes instantly in the canvas

**Use Case**: Create a cutting mat that matches your physical workspace or printing capabilities, with measurements in your preferred unit system.

---

### 2. Multi-Tier Grid System

A sophisticated three-level grid system provides flexibility for different levels of precision:

#### Primary Grid
- **Configurable Interval**: Set the spacing between major grid lines
- **Line Weight**: Adjust thickness of primary grid lines
- **Line Style**: Choose between solid, dashed, or dotted lines
- **Custom Color**: Select any color for primary grid lines

#### Secondary Grid
- **Intermediate Spacing**: Create mid-level subdivisions for enhanced precision
- **Independent Styling**: Separate line weight, style, and color settings
- **Optional Display**: Toggle on/off independently from other grid levels

#### Tertiary Grid
- **Fine Detail Grid**: Add the finest level of subdivision for maximum precision
- **Full Customization**: Complete control over appearance
- **Selective Visibility**: Show or hide without affecting other grid levels

**Use Case**: Create a cutting mat with major 1-inch lines, secondary 1/2-inch lines, and tertiary 1/4-inch lines, each with distinct visual styling for easy differentiation.

---

### 3. Paper Size Indicators

Visual overlays that show how common paper sizes fit within the cutting mat:

- **Standard Sizes Included**:
  - ISO A-series: A1, A2, A3, A4
  - US Letter, Legal, and Tabloid
- **Toggle Individual Sizes**: Enable/disable specific paper size indicators
- **Rotation Support**: View paper sizes in both portrait and landscape orientation
- **Visual Boundaries**: Clear outlines show exact paper dimensions
- **Custom Color**: Choose the color for paper size indicators

**Use Case**: Quickly visualize whether an A3 or Letter-sized document will fit on your mat, and see both orientations at once.

---

### 4. Measurement Features

Precise measurement tools for accurate reference:

#### Axis Measurements
- **Tick Marks**: Regular interval markers along the edges
- **Numerical Labels**: Clear value labels in your chosen unit system
- **Dual Axes**: Measurements on both horizontal and vertical edges
- **Customizable Color**: Set the color for measurement elements

#### Toggle Controls
- **Show/Hide Measurements**: Turn measurement marks on or off
- **Show/Hide Axis Labels**: Control visibility of numerical labels independently

**Use Case**: Print a cutting mat with 1cm tick marks and numerical labels every 5cm for precise measuring during cutting projects.

---

### 5. Feature Toggles

Comprehensive control over what elements appear on the cutting mat:

- ✓ Primary Grid
- ✓ Secondary Grid
- ✓ Tertiary Grid
- ✓ Measurements (tick marks)
- ✓ Axis Labels (numerical values)
- ✓ Paper Size Indicators

---

### 6. Color Customization

- **Background Color**: Set the base color of the cutting mat
- **Grid Line Colors**: Independent colors for primary, secondary, and tertiary grids
- **Paper Size Indicator Color**: Customize the color of paper size outlines
- **Measurement Color**: Set the color for tick marks and axis labels


---

### 7. SVG and PDF Export

- Hability to export the work in SVG and in PDF.
- **Smart Naming**: Auto-generated filenames with dimensions and unit (e.g., `cutting-mat-12x18-inches.svg`)
- **Print-Ready**: Precise dimensions suitable for professional printing

**Export Workflow**:
1. Configure your cutting mat exactly as desired
2. Click "Export SVG" button
3. File is automatically downloaded with descriptive name
4. Toast notification confirms successful export


---

### 8. Configuration Persistence

Automatic saving and restoration of all settings. 

- **Browser Storage**: All settings automatically saved to browser's local storage
- **Instant Restoration**: Settings persist across browser sessions
- **No Account Required**: Works offline with no server dependencies


---

## User Interface Design

### Layout

- **Split-Panel Design**: Controls on the left, live preview on the right
- **Collapsible Sections**: Organized accordion panels keep controls tidy
- **Scrollable Controls**: All settings accessible without page scrolling
- **Responsive Preview**: Canvas updates in real-time as you adjust settings

### Panel Organization

1. **Canvas Dimensions** - Size, unit, and margin controls
2. **Feature Toggles** - Quick enable/disable for all features
3. **Grid Configuration** - Detailed grid customization
4. **Paper Sizes** - Paper size selection and rotation
5. **Colors** - Color pickers for all visual elements

### Interaction Patterns

- **Direct Manipulation**: Numeric inputs for precise values
- **Visual Feedback**: Immediate preview of all changes
- **Checkboxes**: Clear on/off states for features
- **Color Pickers**: Visual color selection with preview
- **Export Button**: Prominent action button at the bottom of controls

---

## Technical Capabilities

### Performance

- **Instant Updates**: Real-time preview without lag
- **Efficient Rendering**: Optimized SVG generation
- **Smooth Interactions**: Responsive UI controls

---


## Future Feature Possibilities

- We need to use Hersheys Fonts. They're a type of font specially used for pen plotters or other vector work. Add the hability to choose between some font options.
- Diagonal grid lines
- PDF export option

---
