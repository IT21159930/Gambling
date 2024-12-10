import { Bet } from '../types/game';

export const NUMBERS = Array.from({ length: 37 }, (_, i) => i);

export const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
export const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

export const getNumberColor = (number: number): 'red' | 'black' | 'green' => {
  if (number === 0) return 'green';
  return RED_NUMBERS.includes(number) ? 'red' : 'black';
};

export const calculateWinnings = (bet: Bet, winningNumber: number): number => {
  const numberColor = getNumberColor(winningNumber);

  switch (bet.type) {
    case 'straight':
      return bet.numbers.includes(winningNumber) ? bet.amount * 35 : 0;
    case 'split':
      return bet.numbers.includes(winningNumber) ? bet.amount * 17 : 0;
    case 'corner':
      return bet.numbers.includes(winningNumber) ? bet.amount * 8 : 0;
    case 'street':
      return bet.numbers.includes(winningNumber) ? bet.amount * 11 : 0;
    case 'red':
      return numberColor === 'red' ? bet.amount * 2 : 0;
    case 'black':
      return numberColor === 'black' ? bet.amount * 2 : 0;
    case 'even':
      return winningNumber !== 0 && winningNumber % 2 === 0 ? bet.amount * 2 : 0;
    case 'odd':
      return winningNumber !== 0 && winningNumber % 2 === 1 ? bet.amount * 2 : 0;
    default:
      return 0;
  }
};