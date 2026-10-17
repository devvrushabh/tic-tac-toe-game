export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type BoardState = CellValue[];

export type GameMode = 'ai' | 'local';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type GameStatus = 'in_progress' | 'won' | 'draw';

export type ScreenState = 'start' | 'menu' | 'game';

export type WinDirection =
  | 'row-0'
  | 'row-1'
  | 'row-2'
  | 'col-0'
  | 'col-1'
  | 'col-2'
  | 'diag-main'
  | 'diag-anti';

export interface WinInfo {
  winner: Player;
  line: [number, number, number];
  direction: WinDirection;
}

export interface ScoreData {
  p1Wins: number;
  p2Wins: number;
  ties: number;
}

export type ScoreRecord = {
  ai_easy: ScoreData;
  ai_medium: ScoreData;
  ai_hard: ScoreData;
  ai_expert: ScoreData;
  local: ScoreData;
};

export interface GameSettings {
  mode: GameMode;
  difficulty: Difficulty;
  soundEnabled: boolean;
}
