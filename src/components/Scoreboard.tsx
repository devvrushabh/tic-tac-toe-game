import React from 'react';
import type { Difficulty, GameMode, Player, ScoreData } from '../types';
import { sound } from '../services/sound';

interface ScoreboardProps {
  score: ScoreData;
  mode: GameMode;
  difficulty: Difficulty;
  currentTurn: Player;
  startingPlayer: Player;
  isAiThinking: boolean;
  onOpenResetModal: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  score,
  mode,
  difficulty,
  currentTurn,
  isAiThinking,
  onOpenResetModal,
}) => {
  // Determine labels matching gametable.org
  const p1Label = mode === 'local' ? 'PLAYER 1 (X)' : 'PLAYER (X)';
  
  let p2Label = 'PLAYER 2 (O)';
  if (mode === 'ai') {
    switch (difficulty) {
      case 'easy':
        p2Label = 'EASY AI (O)';
        break;
      case 'medium':
        p2Label = 'MEDIUM AI (O)';
        break;
      case 'hard':
        p2Label = 'HARD AI (O)';
        break;
      case 'expert':
        p2Label = 'EXPERT AI (O)';
        break;
    }
  }

  const isP1Turn = currentTurn === 'X' && !isAiThinking;
  const isP2Turn = currentTurn === 'O' || (mode === 'ai' && isAiThinking);

  return (
    <div className="scoreboard-container" aria-label="Game scoreboard">
      <div className="scoreboard-cards">
        {/* Player 1 Card */}
        <div className={`score-card score-card-p1 ${isP1Turn ? 'active-turn' : ''}`} aria-current={isP1Turn ? 'true' : 'false'}>
          <div className="score-header">
            <span className="mark-badge x-badge">X</span>
            <span className="player-title">{p1Label}</span>
          </div>
          <div className="score-number" aria-label={`${p1Label} score: ${score.p1Wins}`}>
            {score.p1Wins}
          </div>
          {isP1Turn && <div className="turn-indicator-pill">Turn</div>}
        </div>

        {/* Ties Card */}
        <div className="score-card score-card-ties">
          <div className="score-header">
            <span className="mark-badge ties-badge">-</span>
            <span className="player-title">TIES</span>
          </div>
          <div className="score-number" aria-label={`Ties count: ${score.ties}`}>
            {score.ties}
          </div>
        </div>

        {/* Player 2 / AI Card */}
        <div className={`score-card score-card-p2 ${isP2Turn ? 'active-turn' : ''}`} aria-current={isP2Turn ? 'true' : 'false'}>
          <div className="score-header">
            <span className="mark-badge o-badge">O</span>
            <span className="player-title">{p2Label}</span>
          </div>
          <div className="score-number" aria-label={`${p2Label} score: ${score.p2Wins}`}>
            {score.p2Wins}
          </div>
          {isP2Turn && (
            <div className="turn-indicator-pill o-turn">
              {isAiThinking ? 'Thinking...' : 'Turn'}
            </div>
          )}
        </div>
      </div>

      <div className="scoreboard-reset-row">
        <button
          type="button"
          className="mini-reset-btn"
          onClick={() => {
            sound.playButtonClick();
            onOpenResetModal();
          }}
          title="Reset score for current mode"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
};
