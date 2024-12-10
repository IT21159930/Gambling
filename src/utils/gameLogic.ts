import { Bet } from "../types/game";

export const COLORS = {
  red: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
  green: [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 32, 36, 37, 41, 42, 47, 48],
};

export const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 48) + 1;
};

export const getColorForNumber = (number: number): 'red' | 'green' => {
  return COLORS.red.includes(number) ? 'red' : 'green';
};

// Calculate winnings for a bet based on the result
export const calculateWinnings = (bet: Bet, result: number): number => {
  if (bet.type === 'number' && bet.value === result) {
    return bet.amount * bet.multiplier;
  }

  if (bet.type === 'color') {
    const resultColor = getColorForNumber(result);
    if (bet.value === resultColor) {
      return bet.amount * (bet.multiplier / 2);
    }
  }

  if (bet.type === 'range') {
    const isSmall = result <= 24;
    if ((bet.value === 'small' && isSmall) || (bet.value === 'big' && !isSmall)) {
      return bet.amount * (bet.multiplier / 2);
    }
  }

  return 0;
};
