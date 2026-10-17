import { useState, useEffect, useCallback, useRef } from 'react';
import type { BoardState, Difficulty, GameMode, GameStatus, Player, ScoreRecord, WinInfo } from './types';
import { checkWinner, isBoardFull } from './services/gameLogic';
import { getComputerMove } from './services/ai';
import { sound } from './services/sound';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { GameControls } from './components/GameControls';
import { Scoreboard } from './components/Scoreboard';
import { TurnIndicator } from './components/TurnIndicator';
import { GameBoard } from './components/GameBoard';
import { GameOverModal } from './components/GameOverModal';
import { ResetModal } from './components/ResetModal';
import { StartScreen } from './components/StartScreen';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';

const INITIAL_SCORES: ScoreRecord = {
  ai_easy: { p1Wins: 0, p2Wins: 0, ties: 0 },
  ai_medium: { p1Wins: 0, p2Wins: 0, ties: 0 },
  ai_hard: { p1Wins: 0, p2Wins: 0, ties: 0 },
  ai_expert: { p1Wins: 0, p2Wins: 0, ties: 0 },
  local: { p1Wins: 0, p2Wins: 0, ties: 0 },
};

export function App() {
  // Persistent Settings
  const [mode, setMode] = useLocalStorage<GameMode>('tictactoe_mode', 'ai');
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>('tictactoe_diff', 'medium');
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>('tictactoe_sound', true);
  const [scores, setScores] = useLocalStorage<ScoreRecord>('tictactoe_scores', INITIAL_SCORES);

  // Sync sound engine enabled state
  useEffect(() => {
    sound.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Round & Board state
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [startingPlayer, setStartingPlayer] = useState<Player>('X');
  const [status, setStatus] = useState<GameStatus>('in_progress');
  const [winInfo, setWinInfo] = useState<WinInfo | null>(null);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Start Screen state
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  // Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Score key helper
  const currentScoreKey = mode === 'local' ? 'local' : `ai_${difficulty}` as keyof ScoreRecord;
  const currentScore = scores[currentScoreKey] || { p1Wins: 0, p2Wins: 0, ties: 0 };

  // In AI mode, Player 1 is always Human (X) and Computer is Player 2 (O)
  const humanMark: Player = 'X';
  const computerMark: Player = 'O';

  // Prevent multiple score updates for the same round
  const scoreRecordedRef = useRef<boolean>(false);

  /**
   * Start a fresh game / rematch
   */
  const handleStartGame = useCallback((nextRound = false) => {
    setIsAiThinking(false);
    scoreRecordedRef.current = false;
    setBoard(Array(9).fill(null));
    setStatus('in_progress');
    setWinInfo(null);

    let nextStarter: Player = 'X';
    if (nextRound) {
      const nextRoundNum = roundNumber + 1;
      setRoundNumber(nextRoundNum);
      // Alternate starting player each round (Gametable rule)
      nextStarter = nextRoundNum % 2 === 1 ? 'X' : 'O';
    } else {
      setRoundNumber(1);
      nextStarter = 'X';
    }

    setStartingPlayer(nextStarter);
    setCurrentTurn(nextStarter);
    if (mode === 'ai' && nextStarter === computerMark) {
      setIsAiThinking(true);
    }
  }, [roundNumber, mode, computerMark]);

  /**
   * When mode or difficulty changes, reset the board
   */
  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    handleStartGame(false);
  };

  const handleDifficultyChange = (newDiff: Difficulty) => {
    setDifficulty(newDiff);
    handleStartGame(false);
  };

  /**
   * Complete round and update score once
   */
  const handleRoundEnd = useCallback(
    (finalStatus: 'won' | 'draw', win: WinInfo | null) => {
      setStatus(finalStatus);
      setWinInfo(win);

      if (scoreRecordedRef.current) return;
      scoreRecordedRef.current = true;

      if (finalStatus === 'won' && win) {
        sound.playWin();
        setScores((prev) => {
          const key = mode === 'local' ? 'local' : `ai_${difficulty}` as keyof ScoreRecord;
          const current = prev[key] || { p1Wins: 0, p2Wins: 0, ties: 0 };
          return {
            ...prev,
            [key]: {
              ...current,
              p1Wins: win.winner === 'X' ? current.p1Wins + 1 : current.p1Wins,
              p2Wins: win.winner === 'O' ? current.p2Wins + 1 : current.p2Wins,
            },
          };
        });
      } else if (finalStatus === 'draw') {
        sound.playDraw();
        setScores((prev) => {
          const key = mode === 'local' ? 'local' : `ai_${difficulty}` as keyof ScoreRecord;
          const current = prev[key] || { p1Wins: 0, p2Wins: 0, ties: 0 };
          return {
            ...prev,
            [key]: {
              ...current,
              ties: current.ties + 1,
            },
          };
        });
      }
    },
    [mode, difficulty, setScores]
  );

  /**
   * Handle AI Move
   */
  useEffect(() => {
    if (mode !== 'ai' || status !== 'in_progress' || currentTurn !== computerMark) return;

    const timer = setTimeout(() => {
      setBoard((prevBoard) => {
        // Double check status before applying AI move
        if (status !== 'in_progress') {
          setIsAiThinking(false);
          return prevBoard;
        }

        const moveIndex = getComputerMove(prevBoard, computerMark, difficulty);
        if (moveIndex === -1 || prevBoard[moveIndex] !== null) {
          setIsAiThinking(false);
          return prevBoard;
        }

        const newBoard = [...prevBoard];
        newBoard[moveIndex] = computerMark;

        if (computerMark === 'O') {
          sound.playMarkO();
        } else {
          sound.playMarkX();
        }

        const win = checkWinner(newBoard);
        if (win) {
          handleRoundEnd('won', win);
        } else if (isBoardFull(newBoard)) {
          handleRoundEnd('draw', null);
        } else {
          setCurrentTurn(humanMark);
        }

        setIsAiThinking(false);
        return newBoard;
      });
    }, 450); // Natural 450ms human-friendly deliberation delay

    return () => clearTimeout(timer);
  }, [mode, status, currentTurn, computerMark, humanMark, difficulty, handleRoundEnd]);

  /**
   * Handle Cell Click from Human Player
   */
  const handleCellClick = (index: number) => {
    if (status !== 'in_progress' || board[index] !== null || isAiThinking) {
      return;
    }

    if (mode === 'ai' && currentTurn !== humanMark) {
      return; // Not human's turn
    }

    const playerMark = currentTurn;
    const newBoard = [...board];
    newBoard[index] = playerMark;

    // Play appropriate mark sound
    if (playerMark === 'X') {
      sound.playMarkX();
    } else {
      sound.playMarkO();
    }

    setBoard(newBoard);

    // Check terminal conditions
    const win = checkWinner(newBoard);
    if (win) {
      handleRoundEnd('won', win);
      return;
    }

    if (isBoardFull(newBoard)) {
      handleRoundEnd('draw', null);
      return;
    }

    // Switch turn
    setCurrentTurn((prev) => (prev === 'X' ? 'O' : 'X'));
    if (mode === 'ai') {
      setIsAiThinking(true);
    }
  };

  /**
   * Reset Score Confirmation
   */
  const handleConfirmResetScore = () => {
    sound.playButtonClick();
    setScores((prev) => ({
      ...prev,
      [currentScoreKey]: { p1Wins: 0, p2Wins: 0, ties: 0 },
    }));
    setIsResetModalOpen(false);
  };

  return (
    <div className="app-container">
      {/* Background with diagonal stripes matching Gametable */}
      <div className="table-background" aria-hidden="true" />

      {/* Header */}
      <Header
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onNewGame={() => handleStartGame(false)}
        onShowStartScreen={() => setIsGameStarted(false)}
      />

      {/* Main Game Stage */}
      <main id="middle" className="main-content">
        <div className="tabletop-stage">
          <div className="tabletop-frame">
            {/* Start / Pause Screen Overlay ('press here to play') */}
            <StartScreen
              isOpen={!isGameStarted}
              onStart={() => {
                setIsGameStarted(true);
                handleStartGame(false);
              }}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((prev) => !prev)}
            />

            {/* Top Game Controls (Opponent & Difficulty) */}
            <GameControls
              mode={mode}
              onModeChange={handleModeChange}
              difficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
              onNewGame={() => handleStartGame(false)}
            />

            {/* Turn & Status Indicator */}
            <TurnIndicator
              status={status}
              winner={winInfo ? winInfo.winner : null}
              currentTurn={currentTurn}
              mode={mode}
              difficulty={difficulty}
              isAiThinking={isAiThinking}
            />

            {/* 3x3 Game Board */}
            <div className="board-area">
              <GameBoard
                board={board}
                onCellClick={handleCellClick}
                disabled={status !== 'in_progress' || (mode === 'ai' && currentTurn !== humanMark)}
                currentTurn={currentTurn}
                winInfo={winInfo}
                isAiThinking={isAiThinking}
              />

              {/* Game Over Modal / Result Banner */}
              <GameOverModal
                status={status}
                winner={winInfo ? winInfo.winner : null}
                mode={mode}
                difficulty={difficulty}
                onPlayAgain={() => handleStartGame(true)}
              />
            </div>

            {/* Scoreboard Panel */}
            <Scoreboard
              score={currentScore}
              mode={mode}
              difficulty={difficulty}
              currentTurn={currentTurn}
              startingPlayer={startingPlayer}
              isAiThinking={isAiThinking}
              onOpenResetModal={() => setIsResetModalOpen(true)}
            />
          </div>
        </div>

        {/* Informational Content (How to Play, Rules, History) */}
        <InfoSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onNewGame={() => handleStartGame(false)}
        onShowStartScreen={() => setIsGameStarted(false)}
      />

      {/* Reset Confirmation Dialog */}
      <ResetModal
        isOpen={isResetModalOpen}
        mode={mode}
        difficulty={difficulty}
        onConfirm={handleConfirmResetScore}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}

export default App;
