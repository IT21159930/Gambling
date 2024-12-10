export interface Bird {
  id: number;
  value: number;
  position: {
    x: number;
    y: number;
  };
  direction: number;
  speed: number;
  isClicked: boolean;
}

export interface GameState {
  birds: Bird[];
  coins: number;
  betAmount: number;
  timer: number;
  canBet: boolean;
  isPlaying: boolean;
}