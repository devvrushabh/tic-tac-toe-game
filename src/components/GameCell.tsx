import React, { useState } from 'react';
import type { Player } from '../types';

interface GameCellProps {
  index: number;
  value: Player | null;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
  currentTurn: Player;
  isInteractive: boolean;
}

export const GameCell: React.FC<GameCellProps> = ({
  index,
  value,
  onClick,
  disabled,
  isWinningCell,
  currentTurn,
  isInteractive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Position descriptions for screen readers (e.g. "top left", "center", "bottom right")
  const rowNames = ['top', 'middle', 'bottom'];
  const colNames = ['left', 'center', 'right'];
  const row = Math.floor(index / 3);
  const col = index % 3;
  const positionName = `${rowNames[row]} ${colNames[col]}`;

  const accessibleLabel = value
    ? `Cell ${index + 1}, ${positionName}, marked ${value}`
    : `Cell ${index + 1}, ${positionName}, empty`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !value) {
      e.preventDefault();
      onClick();
    }
  };

  const showGhost = isHovered && !value && isInteractive && !disabled;

  return (
    <button
      type="button"
      id={`cell-${index}`}
      className={`game-cell cell-${index} ${value ? `marked marked-${value.toLowerCase()}` : 'empty'} ${
        isWinningCell ? 'winning-cell' : ''
      }`}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={accessibleLabel}
      tabIndex={disabled && value ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Actual Marked Symbol */}
      {value === 'X' && (
        <svg
          viewBox="0 0 100 100"
          className="symbol-svg symbol-x"
          role="img"
          aria-hidden="true"
        >
          <line
            x1="22"
            y1="22"
            x2="78"
            y2="78"
            stroke="#F83157"
            strokeWidth="14"
            strokeLinecap="round"
            className="x-line x-line-1"
          />
          <line
            x1="78"
            y1="22"
            x2="22"
            y2="78"
            stroke="#F83157"
            strokeWidth="14"
            strokeLinecap="round"
            className="x-line x-line-2"
          />
        </svg>
      )}

      {value === 'O' && (
        <svg
          viewBox="0 0 100 100"
          className="symbol-svg symbol-o"
          role="img"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#3BA8D7"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            className="o-circle"
          />
        </svg>
      )}

      {/* Ghost Preview on Hover when empty */}
      {showGhost && (
        <div className={`ghost-preview ghost-${currentTurn.toLowerCase()}`} aria-hidden="true">
          {currentTurn === 'X' ? (
            <svg viewBox="0 0 100 100" className="symbol-svg symbol-x-ghost">
              <line x1="22" y1="22" x2="78" y2="78" stroke="#F83157" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
              <line x1="78" y1="22" x2="22" y2="78" stroke="#F83157" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="symbol-svg symbol-o-ghost">
              <circle cx="50" cy="50" r="30" stroke="#3BA8D7" strokeWidth="12" fill="none" opacity="0.3" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
};
