import type { HersheyFont } from '../types';

// Import hersheytext for actual Hershey font vector data
// @ts-ignore - no types available for hersheytext
import * as hersheytext from 'hersheytext';

// Hershey fonts are vector fonts designed for pen plotters
// Each font has a descriptive name for UI purposes
export const HERSHEY_FONTS: Record<HersheyFont, { name: string; description: string }> = {
  futural: {
    name: 'Roman Simplex',
    description: 'Simple Roman font, clean and readable'
  },
  futuram: {
    name: 'Roman Duplex',
    description: 'Double-line Roman font'
  },
  scripts: {
    name: 'Script Simplex',
    description: 'Simple script/cursive font'
  },
  scriptc: {
    name: 'Script Complex',
    description: 'Complex script/cursive font'
  },
  gothiceng: {
    name: 'Gothic English',
    description: 'Old English Gothic style'
  },
  gothicger: {
    name: 'Gothic German',
    description: 'German Gothic style'
  },
  gothicita: {
    name: 'Gothic Italian',
    description: 'Italian Gothic style'
  },
  timesr: {
    name: 'Times Roman',
    description: 'Times-style serif font'
  },
  timesg: {
    name: 'Times Greek',
    description: 'Times-style with Greek characters'
  },
  cyrillic: {
    name: 'Cyrillic',
    description: 'Cyrillic character set'
  }
};

/**
 * Renders text using actual Hershey font vector data
 * Uses the hersheytext library directly without unnecessary wrappers
 * @param text - The text to render
 * @param font - The Hershey font family to use
 * @param fontSize - Font size in pixels
 * @param x - X position
 * @param y - Y position
 * @param rotation - Rotation in degrees
 * @param textAnchor - SVG text anchor (start, middle, end)
 * @returns SVG path element string
 */
export const renderHersheyText = (
  text: string,
  font: HersheyFont,
  fontSize: number,
  x: number,
  y: number,
  rotation: number = 0,
  textAnchor: 'start' | 'middle' | 'end' = 'middle'
): string => {
  try {
    // Calculate scale based on desired font size
    // The library's default scale is 1, and nominal height is about 21 units
    // Scale directly to match the desired fontSize
    const scale = fontSize / 21;
    
    // Use the library directly to render text
    const svgContent = hersheytext.renderTextSVG(text, {
      font: font,
      scale: scale,
      pos: { x: 0, y: 0 }
    });
    
    if (!svgContent || svgContent === false) {
      console.warn(`Failed to render Hershey text: ${text}`);
      return '';
    }
    
    // Parse the SVG to extract paths and calculate width
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const group = doc.querySelector('g');
    
    if (!group) {
      console.warn(`No group found in Hershey SVG for: ${text}`);
      return '';
    }
    
    // Get all paths
    const paths = Array.from(group.querySelectorAll('path'));
    if (paths.length === 0) {
      console.warn(`No paths found in Hershey SVG for: ${text}`);
      return '';
    }
    
    // Calculate bounding box to determine width for centering
    let maxX = 0;
    paths.forEach(path => {
      const transform = path.getAttribute('transform');
      if (transform) {
        const match = transform.match(/translate\(([\d.]+),/);
        if (match) {
          const pathX = parseFloat(match[1]);
          const width = parseFloat(path.getAttribute('letter-width') || '10');
          maxX = Math.max(maxX, pathX + width);
        }
      }
    });
    
    // Calculate anchor offset
    let anchorOffsetX = 0;
    if (textAnchor === 'middle') {
      anchorOffsetX = -maxX / 2;
    } else if (textAnchor === 'end') {
      anchorOffsetX = -maxX;
    }
    
    // Build the final transform
    const transforms: string[] = [];
    transforms.push(`translate(${x + anchorOffsetX}, ${y})`);
    if (rotation !== 0) {
      transforms.push(`rotate(${rotation}, ${-anchorOffsetX}, 0)`);
    }
    
    // Combine all paths into a single group with our transform
    const pathElements = paths.map(path => {
      const d = path.getAttribute('d');
      const pathTransform = path.getAttribute('transform') || '';
      return `<path d="${d}" transform="${pathTransform}" />`;
    }).join('');
    
    return `<g transform="${transforms.join(' ')}" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">${pathElements}</g>`;
  } catch (error) {
    console.error('Error rendering Hershey text:', error);
    // Fallback to regular SVG text
    return `<text x="${x}" y="${y}" font-size="${fontSize}" text-anchor="${textAnchor}" transform="${rotation !== 0 ? `rotate(${rotation} ${x} ${y})` : ''}">${text}</text>`;
  }
};

/**
 * Gets the approximate width of text rendered in a Hershey font
 * @param text - The text to measure
 * @param font - The Hershey font family
 * @param fontSize - Font size in pixels
 * @returns Approximate width in pixels
 */
export const getHersheyTextWidth = (
  text: string,
  font: HersheyFont,
  fontSize: number
): number => {
  try {
    const scale = fontSize / 21;
    const svgContent = hersheytext.renderTextSVG(text, {
      font: font,
      scale: scale,
      pos: { x: 0, y: 0 }
    });
    
    if (!svgContent || svgContent === false) {
      return text.length * fontSize * 0.6;
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = Array.from(doc.querySelectorAll('path'));
    
    let maxX = 0;
    paths.forEach(path => {
      const transform = path.getAttribute('transform');
      if (transform) {
        const match = transform.match(/translate\(([\d.]+),/);
        if (match) {
          const pathX = parseFloat(match[1]);
          maxX = Math.max(maxX, pathX + 10);
        }
      }
    });
    
    return maxX;
  } catch (error) {
    // Fallback to rough estimation
    return text.length * fontSize * 0.6;
  }
};

