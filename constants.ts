
import { Pattern } from './types';

export const CANVAS_ROWS = 24;
export const CANVAS_COLS = 32;
export const CELL_SIZE_PX = 20; // Approximate, for calculation reference. Actual styling handles size.

// Note Frequencies (Hz)
const C4 = 261.63;
const Db4 = 277.18; // C#4
const D4 = 293.66;
const Eb4 = 311.13; // D#4
const E4 = 329.63;
const F4 = 349.23;
const Gb4 = 369.99; // F#4
const G4 = 392.00;
const Ab4 = 415.30; // G#4
const A4 = 440.00;
const Bb4 = 466.16; // A#4
// const B4 = 493.88; // Not used in current patterns to maintain pentatonic feel mostly
const C5 = 523.25;
const D5 = 587.33;


export const PATTERNS: Pattern[] = [
  {
    name: "Cosmic Echoes",
    characters: ['✦', '✧', '✷', '✸', '✹'],
    frequencies: [C4, E4, G4, A4, C5], // C Major Pentatonic variation
    baseColor: 'text-yellow-300',
    backgroundColor: 'bg-indigo-900',
  },
  {
    name: "Forest Whispers",
    characters: ['☘', '✿', '❀', '⚘', '⸙', '🍂'],
    frequencies: [A4, G4, E4, D4, C4, A4*0.5], // A Minor Pentatonic variation (descending), last note an octave lower
    baseColor: 'text-pink-300',
    backgroundColor: 'bg-emerald-800',
  },
  {
    name: "Cyber Glyphs",
    characters: ['▰', '▱', '▷', '◁', '╳', '※'],
    frequencies: [Db4, Eb4, Gb4, Ab4, Bb4, Db4*2], // Black keys pentatonic (Db Major Pentatonic), last note an octave higher
    baseColor: 'text-cyan-400',
    backgroundColor: 'bg-slate-900',
  },
  {
    name: "Ocean Dreams",
    characters: ['〰', '∽', '魚', '泡', '⚓'],
    frequencies: [F4, G4, A4, C5, D5], // F Lydian Pentatonic feel (F G A C D)
    baseColor: 'text-blue-300',
    backgroundColor: 'bg-sky-700',
  }
];
    