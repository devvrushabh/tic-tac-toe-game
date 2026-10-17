import React from 'react';
import type { Difficulty, GameMode, GameStatus, Player } from '../types';
import { sound } from '../services/sound';

interface GameOverModalProps {
  status: GameStatus;
  winner: Player | null;
  mode: GameMode;
  difficulty: Difficulty;
  onPlayAgain: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  status,
  winner,
  mode,
  difficulty,
  onPlayAgain,
}) => {
  if (status === 'in_progress') return null;

  let title = '';
  let subtitle = '';
  let markColor = '#00CE9B';

  if (status === 'won' && winner) {
    if (mode === 'local') {
      title = winner === 'X' ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!';
      subtitle = 'Great round! Ready for the rematch?';
    } else {
      if (winner === 'X') {
        title = 'YOU WIN!';
        subtitle = `Spectacular play! You beat the ${difficulty} AI!`;
      } else {
        title = 'COMPUTER WINS!';
        subtitle = `${difficulty.toUpperCase()} AI played perfectly. Try again!`;
      }
    }
    markColor = winner === 'X' ? '#F83157' : '#3BA8D7';
  } else if (status === 'draw') {
    title = "IT'S A TIE!";
    subtitle = 'Both players played skillfully to a zero-sum draw.';
    markColor = '#FAC72E';
  }

  return (
    <div className="game-over-banner" role="dialog" aria-modal="false" aria-label="Game Over">
      <div className="game-over-content">
        <div className="game-over-badge" style={{ borderColor: markColor }}>
          {status === 'won' && winner === 'X' && <span className="winner-symbol x-sym">X</span>}
          {status === 'won' && winner === 'O' && <span className="winner-symbol o-sym">O</span>}
          {status === 'draw' && <span className="winner-symbol draw-sym">🤝</span>}
        </div>
        <h2 className="game-over-title">{title}</h2>
        <p className="game-over-subtitle">{subtitle}</p>
        <div className="game-over-actions">
          <button
            type="button"
            className="btn-play-again"
            onClick={() => {
              sound.playButtonClick();
              onPlayAgain();
            }}
            autoFocus
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
