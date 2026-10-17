import React from 'react';
import type { Difficulty, GameMode } from '../types';
import { sound } from '../services/sound';

interface GameControlsProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  onNewGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  mode,
  onModeChange,
  difficulty,
  onDifficultyChange,
  onNewGame,
}) => {
  return (
    <div className="game-controls-panel" role="region" aria-label="Game configuration controls">
      {/* Opponent Selection (Mode) */}
      <div className="control-group mode-selector">
        <label className="control-label" id="opponent-select-label">Opponent:</label>
        <div className="segmented-control" role="radiogroup" aria-labelledby="opponent-select-label">
          <button
            type="button"
            role="radio"
            aria-checked={mode === 'ai'}
            className={`segment-btn ${mode === 'ai' ? 'selected' : ''}`}
            onClick={() => {
              if (mode !== 'ai') {
                sound.playButtonClick();
                onModeChange('ai');
              }
            }}
          >
            1 Player
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={mode === 'local'}
            className={`segment-btn ${mode === 'local' ? 'selected' : ''}`}
            onClick={() => {
              if (mode !== 'local') {
                sound.playButtonClick();
                onModeChange('local');
              }
            }}
          >
            2 Players
          </button>
        </div>
      </div>

      {/* Difficulty Selection (Shown only in 1 Player mode) */}
      {mode === 'ai' && (
        <div className="control-group difficulty-selector">
          <label className="control-label" id="difficulty-select-label">Difficulty:</label>
          <div className="difficulty-pills" role="radiogroup" aria-labelledby="difficulty-select-label">
            {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((level) => {
              const isSelected = difficulty === level;
              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`diff-pill-btn diff-${level} ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (difficulty !== level) {
                      sound.playButtonClick();
                      onDifficultyChange(level);
                    }
                  }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="control-group action-buttons">
        <button
          type="button"
          className="btn-primary new-game-action-btn"
          onClick={() => {
            sound.playButtonClick();
            onNewGame();
          }}
          title="Restart or clear board"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          <span>Restart Game</span>
        </button>
      </div>
    </div>
  );
};
