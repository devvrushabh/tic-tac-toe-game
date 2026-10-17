import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <div className="info-content-container">
      {/* How to Play & Features */}
      <section className="info-card-section" id="how-to-play">
        <div className="info-grid">
          {/* How to Play */}
          <div className="info-col play-col">
            <h2 className="info-section-title">HOW TO PLAY</h2>
            <ol className="info-list-ordered">
              <li>
                <strong>Choose your opponent:</strong> Switch between 1 Player (against the computer) and 2 Player local mode.
              </li>
              <li>
                <strong>Pick your challenge:</strong> In single-player, choose between Easy, Medium, Hard, and unbeatable Expert AI.
              </li>
              <li>
                <strong>Tap an open square:</strong> Take turns placing your mark (X or O) on an empty grid cell.
              </li>
              <li>
                <strong>Make 3 in a row:</strong> Form a complete line horizontally, vertically, or diagonally to win the game.
              </li>
              <li>
                <strong>Block your opponent:</strong> Watch the board closely and block when your rival gets 2 in a row!
              </li>
              <li>
                <strong>Audio & settings:</strong> Toggle sound effects or reset scores using the top controls at any time.
              </li>
            </ol>
          </div>

          {/* Features */}
          <div className="info-col features-col" id="features">
            <h2 className="info-section-title">GAME FEATURES</h2>
            <ul className="info-list-unordered">
              <li>
                <strong>4 Computer Difficulties:</strong> From casual random play to an optimal, unbeatable Minimax AI.
              </li>
              <li>
                <strong>Pass & Play 2-Player Mode:</strong> Enjoy matches with friends and family on the same device.
              </li>
              <li>
                <strong>Alternating Starting Player:</strong> Starting turns automatically alternate each round for fair play.
              </li>
              <li>
                <strong>Synthesized Web Audio:</strong> Crisp mark clicks, chime notes, and fanfare using the Web Audio API.
              </li>
              <li>
                <strong>Persistent Scoreboard:</strong> Automatically records scores in local storage for each difficulty mode.
              </li>
              <li>
                <strong>Responsive & Touch-Ready:</strong> Perfectly proportioned for phones, tablets, and desktop displays.
              </li>
              <li>
                <strong>Accessibility First:</strong> Full keyboard navigation, ARIA announcements, and reduced-motion support.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rules, Zero-Sum, History, Noughts & Crosses */}
      <section className="info-card-section details-section" id="rules">
        <div className="info-grid">
          <div className="info-col rules-col">
            <h2 className="info-section-title">RULES</h2>
            <p>
              Tic-Tac-Toe is a classic two-player strategy game played on a 3×3 grid. One player takes <strong>X</strong> and the other takes <strong>O</strong>.
            </p>
            <p>
              By default, Player 1 (X) starts first in the opening game. In subsequent rounds, the starting player alternates between Player 1 and Player 2 (or the AI). This guarantees a balanced match over multiple games.
            </p>
            <p>
              Players alternate placing their mark in any empty cell. The first player to align 3 consecutive marks horizontally, vertically, or diagonally wins immediately.
            </p>
            <p>
              If all 9 squares are filled and neither player has achieved 3 in a row, the round concludes in a <strong>Tie</strong> (draw).
            </p>

            <h3 className="info-subsection-title">ZERO-SUM GAME</h3>
            <p>
              Tic-Tac-Toe is mathematically classified as a zero-sum game of complete information. With optimal play by both participants, the outcome is always a draw. In Expert mode, the AI leverages the Minimax algorithm to execute the theoretically perfect strategy—try to see how many ties you can hold!
            </p>
          </div>

          <div className="info-col history-col" id="history">
            <h2 className="info-section-title">HISTORY</h2>
            <p>
              Tic-Tac-Toe is one of humankind's oldest recreational games. Early variants like <em>Terni Lapilli</em> were enjoyed across the Roman Empire around the first century BC, scratched into stones, tiles, and roof slates.
            </p>
            <p>
              Three-in-a-row games have also been discovered etched into ancient Egyptian temple stones dating back more than three thousand years, highlighting the timeless appeal of the grid.
            </p>

            <h3 className="info-subsection-title">NOUGHTS AND CROSSES</h3>
            <p>
              Throughout the United Kingdom, Australia, New Zealand, and South Africa, the game is widely known as <strong>Noughts and Crosses</strong>, where "nought" refers to the zero/circle (O) and "cross" refers to the X mark. It is also popularly described worldwide as the <strong>XO Game</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
