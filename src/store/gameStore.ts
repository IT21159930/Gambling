import { create } from 'zustand';
import { calculateWinnings } from '../utils/gameLogic'; // Only import calculateWinnings
import { getNumberColor } from '../utils/roulette';
import type { Bet, SpinResult, GameHistory } from '../types/game';

interface GameStore {
  balance: number;
  bettingHistory: Bet[];
  winnings: number;
  currentBets: Bet[];
  spinHistory: SpinResult[];
  gameHistory: GameHistory[];
  isSpinning: boolean;

  placeBet: (bet: Bet) => void;
  processBetResult: (result: number) => void;
  addBet: (bet: Omit<Bet, 'id' | 'timestamp'>) => void;
  spin: () => Promise<void>;
  updateBalance: (amount: number) => void;
  addFunds: (amount: number) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  balance: 1000,
  bettingHistory: [],
  winnings: 0,
  currentBets: [],
  spinHistory: [],
  gameHistory: [],
  isSpinning: false,

  placeBet: (bet: Bet) => {
    if (get().balance < bet.amount) return;

    set((state) => ({
      balance: state.balance - bet.amount,
      bettingHistory: [bet, ...state.bettingHistory].slice(0, 10),
    }));
  },

  processBetResult: (result: number) => {
    set((state) => {
      const totalWinnings = state.bettingHistory.reduce((acc, bet) => {
        const payout = calculateWinnings(bet, result); // Use calculateWinnings
        return acc + payout;
      }, 0);

      return {
        balance: state.balance + totalWinnings,
        winnings: state.winnings + totalWinnings,
        bettingHistory: [], // Clear betting history after processing
      };
    });
  },

  addBet: (bet) => {
    const { balance } = get();
    if (balance < bet.amount) return;

    const newBet: Bet = {
      ...bet,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    set((state) => ({
      currentBets: [...state.currentBets, newBet],
      balance: state.balance - bet.amount,
    }));
  },

  spin: async () => {
    const { currentBets } = get();
    if (currentBets.length === 0 || get().isSpinning) return;

    set({ isSpinning: true });

    // Simulate spin delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const winningNumber = Math.floor(Math.random() * 37);
    const result: SpinResult = {
      number: winningNumber,
      color: getNumberColor(winningNumber),
      timestamp: new Date(),
    };

    const gameHistory: GameHistory[] = currentBets.map((bet) => ({
      bet,
      result,
      winAmount: calculateWinnings(bet, winningNumber),
    }));

    const totalWinnings = gameHistory.reduce((sum, h) => sum + h.winAmount, 0);

    set((state) => ({
      spinHistory: [result, ...state.spinHistory],
      gameHistory: [...gameHistory, ...state.gameHistory],
      balance: state.balance + totalWinnings,
      currentBets: [],
      isSpinning: false,
    }));
  },

  updateBalance: (amount) => {
    set((state) => ({ balance: state.balance + amount }));
  },

  addFunds: (amount) => set((state) => ({
    balance: state.balance + amount,
  })),
}));
