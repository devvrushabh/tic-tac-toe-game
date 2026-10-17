import React from 'react';
import type { BoardState, Player, WinInfo } from '../types';
import { GameCell } from './GameCell';

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  disabled: boolean;
  currentTurn: Player;
  winInfo: WinInfo | null;
  isAiThinking: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  disabled,
  currentTurn,
  winInfo,
  isAiThinking,
}) => {
  const winningCells = new Set(winInfo ? winInfo.line : []);

  // Determine winning line strike coordinates for SVG line
  let strikeCoords: { x1: string; y1: string; x2: string; y2: string } | null = null;
  if (winInfo) {
    switch (winInfo.direction) {
      case 'row-0':
        strikeCoords = { x1: '6%', y1: '16.66%', x2: '94%', y2: '16.66%' };
        break;
      case 'row-1':
        strikeCoords = { x1: '6%', y1: '50%', x2: '94%', y2: '50%' };
        break;
      case 'row-2':
        strikeCoords = { x1: '6%', y1: '83.33%', x2: '94%', y2: '83.33%' };
        break;
      case 'col-0':
        strikeCoords = { x1: '16.66%', y1: '6%', x2: '16.66%', y2: '94%' };
        break;
      case 'col-1':
        strikeCoords = { x1: '50%', y1: '6%', x2: '50%', y2: '94%' };
        break;
      case 'col-2':
        strikeCoords = { x1: '83.33%', y1: '6%', x2: '83.33%', y2: '94%' };
        break;
      case 'diag-main':
        strikeCoords = { x1: '8%', y1: '8%', x2: '92%', y2: '92%' };
        break;
      case 'diag-anti':
        strikeCoords = { x1: '92%', y1: '8%', x2: '8%', y2: '92%' };
        break;
    }
  }

  const strikeColor = winInfo?.winner === 'X' ? '#F83157' : '#3BA8D7';

  return (
    <div className="game-board-wrapper" role="region" aria-label="Tic-Tac-Toe 3 by 3 game board">
      <div className="game-board-grid">
        {board.map((cellValue, idx) => (
          <GameCell
            key={idx}
            index={idx}
            value={cellValue}
            onClick={() => onCellClick(idx)}
            disabled={disabled || isAiThinking}
            isWinningCell={winningCells.has(idx)}
            currentTurn={currentTurn}
            isInteractive={!disabled && !isAiThinking}
          />
        ))}

        {/* Dynamic Grid Divider Lines */}
        <div className="grid-divider grid-divider-v1" aria-hidden="true" />
        <div className="grid-divider grid-divider-v2" aria-hidden="true" />
        <div className="grid-divider grid-divider-h1" aria-hidden="true" />
        <div className="grid-divider grid-divider-h2" aria-hidden="true" />

        {/* Animated Winning Strike Line */}
        {strikeCoords && (
          <svg className="winning-strike-svg" viewBox="0 0 100 100" aria-hidden="true">
            <line
              x1={strikeCoords.x1}
              y1={strikeCoords.y1}
              x2={strikeCoords.x2}
              y2={strikeCoords.y2}
              stroke={strikeColor}
              strokeWidth="5"
              strokeLinecap="round"
              className="strike-line-animated"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
