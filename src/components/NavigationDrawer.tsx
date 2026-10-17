import React from 'react';
import { sound } from '../services/sound';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResetModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNewGame: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenResetModal,
  soundEnabled,
  onToggleSound,
  onNewGame,
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (anchorId: string) => {
    sound.playButtonClick();
    onClose();
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="drawer-overlay" role="dialog" aria-modal="true" aria-label="Game navigation drawer" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-brand">
            <span className="brand-x">X</span>
            <span className="brand-o">O</span>
            <span className="drawer-title">Tic Tac Toe</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => {
              sound.playButtonClick();
              onClose();
            }}
            aria-label="Close navigation drawer"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="drawer-nav">
          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => {
              sound.playButtonClick();
              onNewGame();
              onClose();
            }}
          >
            <span className="nav-icon">🎮</span>
            <span>New Game</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleLinkClick('how-to-play')}
          >
            <span className="nav-icon">📖</span>
            <span>How to Play</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleLinkClick('features')}
          >
            <span className="nav-icon">⭐</span>
            <span>Features</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleLinkClick('rules')}
          >
            <span className="nav-icon">📜</span>
            <span>Rules & Strategy</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleLinkClick('history')}
          >
            <span className="nav-icon">🏛️</span>
            <span>History of Tic Tac Toe</span>
          </button>

          <div className="drawer-divider" />

          {/* Settings in drawer */}
          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                setTimeout(() => sound.playToggle(), 10);
              }
            }}
          >
            <span className="nav-icon">{soundEnabled ? '🔊' : '🔇'}</span>
            <span>Sound Effects: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item danger"
            onClick={() => {
              sound.playButtonClick();
              onClose();
              onOpenResetModal();
            }}
          >
            <span className="nav-icon">🗑️</span>
            <span>Reset Current Scores</span>
          </button>
        </nav>

        <div className="drawer-footer">
          <p>© Classic Board Game Studio</p>
          <p className="subtext">Inspired by Gametable.org</p>
        </div>
      </div>
    </div>
  );
};
