import React from 'react';
import type { Difficulty, GameMode, GameStatus, Player } from '../types';

interface TurnIndicatorProps {
  status: GameStatus;
  winner: Player | null;
  currentTurn: Player;
  mode: GameMode;
  difficulty: Difficulty;
  isAiThinking: boolean;
}

export const TurnIndicator: React.FC<TurnIndicatorProps> = ({
  status,
  winner,
  currentTurn,
  mode,
  difficulty,
  isAiThinking,
}) => {
  let message = '';
  let badgeClass = 'turn-neutral';

  if (status === 'won' && winner) {
    if (mode === 'local') {
      message = winner === 'X' ? 'Player 1 Wins!' : 'Player 2 Wins!';
    } else {
      message = winner === 'X' ? 'You Win! 🎉' : `${difficulty.toUpperCase()} AI Wins!`;
    }
    badgeClass = winner === 'X' ? 'winner-x' : 'winner-o';
  } else if (status === 'draw') {
    message = "It's a Draw! 🤝";
    badgeClass = 'draw-tie';
  } else {
    // In progress
    if (mode === 'ai') {
      if (isAiThinking) {
        message = 'Computer is thinking...';
        badgeClass = 'thinking';
      } else {
        message = 'Your Turn (X)';
        badgeClass = 'player-turn-x';
      }
    } else {
      if (currentTurn === 'X') {
        message = "Player 1's Turn (X)";
        badgeClass = 'player-turn-x';
      } else {
        message = "Player 2's Turn (O)";
        badgeClass = 'player-turn-o';
      }
    }
  }

  return (
    <div className="turn-status-bar" role="status" aria-live="polite">
      <div className={`turn-badge ${badgeClass}`}>
        {isAiThinking && <span className="thinking-dots"><span /><span /><span /></span>}
        <span className="status-text">{message}</span>
      </div>
    </div>
  );
};
