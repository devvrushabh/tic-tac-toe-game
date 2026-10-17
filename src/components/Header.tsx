import React from 'react';
import { sound } from '../services/sound';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenResetModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNewGame: () => void;
  onShowMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenResetModal,
  soundEnabled,
  onToggleSound,
  onNewGame,
  onShowMenu,
}) => {
  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        {/* Left hamburger drawer toggle */}
        <button
          type="button"
          className="header-icon-btn menu-btn"
          onClick={() => {
            sound.playButtonClick();
            onOpenMenu();
          }}
          aria-label="Open navigation menu"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Brand Logo & Title */}
        <div className="header-brand">
          <a href="#middle" className="brand-link" aria-label="Dost Tic Tac Toe Game">
            <span className="brand-icon">
              <span className="brand-x">X</span>
              <span className="brand-o">O</span>
            </span>
            <span className="brand-title">DOST TIC TAC TOE</span>
          </a>
        </div>

        {/* Right Header Controls */}
        <div className="header-actions">
          {/* Main Menu button */}
          {onShowMenu && (
            <button
              type="button"
              className="header-action-btn pause-screen-btn"
              onClick={() => {
                sound.playButtonClick();
                onShowMenu();
              }}
              title="Return to Main Menu"
              aria-label="Return to Main Menu"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor" stroke="none" />
                <rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor" stroke="none" />
                <rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor" stroke="none" />
                <rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor" stroke="none" />
              </svg>
              <span className="header-btn-text">Menu</span>
            </button>
          )}

          {/* Quick New Game button */}
          <button
            type="button"
            className="header-action-btn restart-btn"
            onClick={() => {
              sound.playButtonClick();
              onNewGame();
            }}
            title="Start a new game"
            aria-label="Start a new game"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            <span className="header-btn-text">New Game</span>
          </button>

          {/* Reset Score button */}
          <button
            type="button"
            className="header-action-btn reset-score-btn"
            onClick={() => {
              sound.playButtonClick();
              onOpenResetModal();
            }}
            title="Reset score for current mode"
            aria-label="Reset score for current mode"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span className="header-btn-text">Reset Score</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            className={`header-icon-btn sound-toggle-btn ${soundEnabled ? 'active' : 'muted'}`}
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                setTimeout(() => sound.playToggle(), 10);
              }
            }}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            title={soundEnabled ? 'Sound is ON (click to mute)' : 'Sound is MUTED (click to unmute)'}
          >
            {soundEnabled ? (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
