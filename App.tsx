
import React, { useState, useEffect, useCallback } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import { PATTERNS, CANVAS_ROWS, CANVAS_COLS } from './constants';
import { Pattern } from './types';
import * as SoundService from './services/SoundService';

const createEmptyGrid = (): (string | null)[][] => {
  return Array(CANVAS_ROWS).fill(null).map(() => Array(CANVAS_COLS).fill(null));
};

const App: React.FC = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid());
  const [isDrawingActive, setIsDrawingActive] = useState(false); // Manages if mouse/touch is currently down for drawing
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [currentCharCycleIndex, setCurrentCharCycleIndex] = useState(0);
  const [audioReadyState, setAudioReadyState] = useState(false); // UI state for audio readiness

  const currentPattern: Pattern = PATTERNS[currentPatternIndex];

  useEffect(() => {
    document.body.className = `${currentPattern.backgroundColor} transition-colors duration-500 ease-in-out overflow-hidden`;
    // Also update any other theme-dependent elements if necessary
  }, [currentPattern]);
  
  const handleInteractionStartGesture = useCallback(() => {
    if (!SoundService.isAudioReady()) { // Check internal state of SoundService
      const success = SoundService.initAudioContext();
      if (success) {
        // Delay setting UI state slightly to allow AudioContext to potentially resume
        setTimeout(() => setAudioReadyState(SoundService.isAudioReady()), 100);
      } else {
        setAudioReadyState(false);
      }
    }
  }, []); // No dependencies needed that would change this callback often

  const handleDraw = useCallback((row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => [...r]); // Create a new grid copy
      const charToDraw = currentPattern.characters[currentCharCycleIndex];
      newGrid[row][col] = charToDraw;
      return newGrid;
    });

    if (SoundService.isAudioReady()) { // Check internal state of SoundService before playing
      SoundService.playNote(currentPattern.frequencies[currentCharCycleIndex]);
    } else {
        // If audio isn't ready, try to initialize it. This can happen if first interaction was not on canvas.
        handleInteractionStartGesture(); 
        // Then attempt to play if it became ready.
        if(SoundService.isAudioReady()){
             SoundService.playNote(currentPattern.frequencies[currentCharCycleIndex]);
        }
    }

    setCurrentCharCycleIndex((prev) => (prev + 1) % currentPattern.characters.length);
  }, [currentPattern, currentCharCycleIndex, handleInteractionStartGesture]); // Added handleInteractionStartGesture

  const handleSwitchPattern = () => {
    setCurrentPatternIndex((prev) => (prev + 1) % PATTERNS.length);
    setCurrentCharCycleIndex(0); 
  };

  const handleClearCanvas = () => {
    setGrid(createEmptyGrid());
    setCurrentCharCycleIndex(0); 
  };

  const handleManualInitAudio = () => {
     handleInteractionStartGesture(); // Use the same logic for manual init
  };

  // Regularly check audio context state for UI button, as it can change (e.g. suspended by browser)
  useEffect(() => {
    const intervalId = setInterval(() => {
        const currentAudioState = SoundService.isAudioReady();
        if (currentAudioState !== audioReadyState) {
            setAudioReadyState(currentAudioState);
        }
    }, 1000); // Check every second
    return () => clearInterval(intervalId);
  }, [audioReadyState]);


  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 pt-6 pb-24 sm:pb-28 ${currentPattern.backgroundColor} transition-colors duration-500 ease-in-out`}>
      <header className="mb-3 text-center">
        <h1 className={`text-2xl sm:text-3xl font-bold ${currentPattern.baseColor} opacity-90`}>ASCII Harmony Draw</h1>
        <p className={`text-xs sm:text-sm ${currentPattern.baseColor} opacity-70 mt-1`}>Click and drag to weave art and music.</p>
      </header>
      
      <Canvas 
        grid={grid} 
        onDraw={handleDraw}
        onInteractionStartGesture={handleInteractionStartGesture}
        characterColor={currentPattern.baseColor}
        isDrawingActive={isDrawingActive}
        setIsDrawingActive={setIsDrawingActive}
      />
      
      <Controls 
        currentPatternName={currentPattern.name}
        onSwitchPattern={handleSwitchPattern}
        onClearCanvas={handleClearCanvas}
        isAudioReadyState={audioReadyState} // Pass the UI state
        onInitAudio={handleManualInitAudio}
        patternBaseColor={currentPattern.baseColor}
      />
    </div>
  );
};

export default App;
    