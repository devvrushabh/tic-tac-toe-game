import React, { useEffect } from 'react';
import { sound } from '../services/sound';

interface StartScreenProps {
  isOpen: boolean;
  onStart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  isOpen,
  onStart,
  soundEnabled,
  onToggleSound,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        sound.playButtonClick();
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onStart]);

  if (!isOpen) return null;

  return (
    <div
      className="start-screen-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Start Game Screen"
      onClick={() => {
        sound.playButtonClick();
        onStart();
      }}
    >
      {/* 3D Tabletop Background Image */}
      <div className="start-screen-bg" style={{ backgroundImage: `url('/start-bg.jpg')` }} />

      {/* Dark Vignette Overlay matching Gametable */}
      <div className="start-screen-dimmer" />

      {/* Top-Right Quick Sound / Settings Button */}
      <div className="start-screen-top-bar" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="start-corner-btn"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          title={soundEnabled ? 'Sound is ON' : 'Sound is MUTED'}
        >
          {soundEnabled ? (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>

      {/* Center Play Button & 'press here to play' text */}
      <div className="start-screen-center">
        <button
          type="button"
          className="start-play-btn"
          aria-label="Press here to play Tic Tac Toe"
          onClick={(e) => {
            e.stopPropagation();
            sound.playButtonClick();
            onStart();
          }}
          autoFocus
        >
          <svg viewBox="0 0 240 240" className="start-play-svg">
            {/* Outer Thick White Ring */}
            <circle
              cx="120"
              cy="100"
              r="85"
              fill="none"
              stroke="#ffffff"
              strokeWidth="15"
              className="start-play-ring"
            />
            {/* Solid White Triangle */}
            <polygon
              points="100,64 162,100 100,136"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="12"
              strokeLinejoin="round"
              className="start-play-triangle"
            />
            {/* 'press here to play' label */}
            <text
              x="120"
              y="226"
              className="start-play-text"
              textAnchor="middle"
            >
              press here to play
            </text>
          </svg>
        </button>
      </div>
    </div>
  );
};
