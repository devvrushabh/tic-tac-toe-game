import React, { useEffect, useState } from 'react';
import type { Difficulty } from '../types';
import { sound } from '../services/sound';

interface MainMenuProps {
  isOpen: boolean;
  onSelectOnePlayer: () => void;
  onSelectTwoPlayer: () => void;
  onExit: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  onResetScores: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  isOpen,
  onSelectOnePlayer,
  onSelectTwoPlayer,
  onExit,
  soundEnabled,
  onToggleSound,
  difficulty,
  onDifficultyChange,
  onResetScores,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isSettingsOpen) {
          setIsSettingsOpen(false);
        } else {
          onExit();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSettingsOpen, onExit]);

  if (!isOpen) return null;

  return (
    <div
      className="main-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Dost Tic Tac Toe Main Menu"
    >
      {/* Tabletop Room Background Image */}
      <div
        className="main-menu-bg"
        style={{ backgroundImage: `url('./dost-menu-bg.jpg')` }}
      />

      {/* Top-Right Settings Gear Button matching reference */}
      <div className="main-menu-top-bar">
        <button
          type="button"
          className="menu-gear-btn"
          onClick={() => {
            sound.playButtonClick();
            setIsSettingsOpen(true);
          }}
          aria-label="Game Settings"
          title="Game Settings"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="currentColor"
            className="menu-gear-icon"
          >
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>
      </div>

      {/* Main Center Menu Stack */}
      <div className="main-menu-content">
        <div className="main-menu-actions">
          {/* One Player Button */}
          <button
            type="button"
            className="menu-pill-btn menu-pill-one-player"
            onClick={() => {
              sound.playButtonClick();
              onSelectOnePlayer();
            }}
          >
            <span className="menu-pill-text">One Player</span>
          </button>

          {/* Two Player Button */}
          <button
            type="button"
            className="menu-pill-btn menu-pill-two-player"
            onClick={() => {
              sound.playButtonClick();
              onSelectTwoPlayer();
            }}
          >
            <span className="menu-pill-text">Two Player</span>
          </button>

          {/* Exit Button */}
          <button
            type="button"
            className="menu-pill-btn menu-pill-exit"
            onClick={() => {
              sound.playButtonClick();
              onExit();
            }}
          >
            <span className="menu-pill-text">Exit</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div
          className="menu-settings-backdrop"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="menu-settings-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Game Settings"
          >
            <div className="menu-settings-header">
              <h2 className="menu-settings-title">SETTINGS</h2>
              <button
                type="button"
                className="menu-settings-close-btn"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close Settings"
              >
                ✕
              </button>
            </div>

            <div className="menu-settings-body">
              {/* Sound Option */}
              <div className="settings-row">
                <div className="settings-label-group">
                  <span className="settings-label">Sound Effects</span>
                  <span className="settings-desc">Synthesized audio cues</span>
                </div>
                <button
                  type="button"
                  className={`settings-toggle-btn ${soundEnabled ? 'active' : ''}`}
                  onClick={() => {
                    onToggleSound();
                    sound.playToggle();
                  }}
                >
                  <span className="toggle-thumb" />
                  <span className="toggle-text">
                    {soundEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* AI Difficulty Option */}
              <div className="settings-row-vertical">
                <span className="settings-label">1-Player AI Difficulty</span>
                <div className="diff-pills-row">
                  {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map(
                    (diff) => (
                      <button
                        key={diff}
                        type="button"
                        className={`diff-pill-btn ${difficulty === diff ? 'active' : ''}`}
                        onClick={() => {
                          sound.playButtonClick();
                          onDifficultyChange(diff);
                        }}
                      >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Reset Scores Option */}
              <div className="settings-row">
                <div className="settings-label-group">
                  <span className="settings-label">Score History</span>
                  <span className="settings-desc">Clear saved wins & ties</span>
                </div>
                <button
                  type="button"
                  className="settings-reset-btn"
                  onClick={() => {
                    sound.playButtonClick();
                    onResetScores();
                    setIsSettingsOpen(false);
                  }}
                >
                  Reset Scores
                </button>
              </div>
            </div>

            <div className="menu-settings-footer">
              <button
                type="button"
                className="settings-done-btn"
                onClick={() => setIsSettingsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
