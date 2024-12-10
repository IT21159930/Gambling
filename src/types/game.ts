export interface Card {
  id: number;
  number: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  coins: number;
  betAmount: number;
  timer: number;
  canBet: boolean;
  selectedCards: Card[];
  isPlaying: boolean;
  showAllCards: boolean;
}