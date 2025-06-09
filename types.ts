
export interface Pattern {
  name: string;
  characters: string[];
  frequencies: number[];
  baseColor: string; // Tailwind text color class, e.g., 'text-yellow-300'
  backgroundColor: string; // Tailwind background color class for the app, e.g., 'bg-indigo-900'
}

// For this version, the grid will store characters directly (string[][])
// If we needed more per-cell data, it would be:
// export interface CellData {
//   char: string;
//   patternName?: string; // To know which pattern it originated from
// }
    