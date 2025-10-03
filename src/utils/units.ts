import type { Unit } from '../types';

// Convert any unit to inches for internal calculations
export const toInches = (value: number, unit: Unit): number => {
  switch (unit) {
    case 'inches':
      return value;
    case 'cm':
      return value / 2.54;
    case 'mm':
      return value / 25.4;
  }
};

// Convert inches to target unit
export const fromInches = (value: number, unit: Unit): number => {
  switch (unit) {
    case 'inches':
      return value;
    case 'cm':
      return value * 2.54;
    case 'mm':
      return value * 25.4;
  }
};

// Convert between any two units
export const convertUnits = (value: number, fromUnit: Unit, toUnit: Unit): number => {
  const inches = toInches(value, fromUnit);
  return fromInches(inches, toUnit);
};
