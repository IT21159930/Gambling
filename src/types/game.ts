export interface Card {
  id: number;
  number: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Bet {
  type: 'number' | 'color' | 'range';
  value: string | number;
  amount: number;
  multiplier: number;
}

export interface GameHistory {
  period: number;
  result: number;
  timestamp: Date;
  color: 'red' | 'green';
}

export interface MergedGameState {
  // Card Matching Game State
  cards: Card[];
  coins: number;
  betAmount: number;
  timer: number;
  canBet: boolean;
  selectedCards: Card[];
  isPlaying: boolean;
  showAllCards: boolean;

  // Betting Game State
  currentPeriod: number;
  timeRemaining: number;
  lastResults: GameHistory[];
  isAcceptingBets: boolean;
}
