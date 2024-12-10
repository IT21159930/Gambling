import React, { useState } from 'react';
import type { Bet } from '../types/game';

interface BettingBoardProps {
  onPlaceBet: (bet: Bet) => void;
  disabled: boolean;
}

export const BettingBoard: React.FC<BettingBoardProps> = ({ onPlaceBet, disabled }) => {
  const [betAmount] = useState(10);
  const [selectedMultiplier] = useState(1);

  const handleNumberBet = (number: number) => {
    if (disabled) return;
    onPlaceBet({
      type: 'number',
      value: number,
      amount: betAmount,
      multiplier: selectedMultiplier,
    });
  };

  const renderNumbers = () => {
    return Array.from({ length: 48 }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        onClick={() => handleNumberBet(number)}
        disabled={disabled}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}
          ${[1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46].includes(number)
            ? 'bg-red-500'
            : 'bg-green-500'
          }`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        
        
      </div>
      <div className="grid grid-cols-8 gap-2 mb-6">
        {renderNumbers()}
      </div>
      <div className="flex justify-between gap-4">
        
      </div>
    </div>
  );
};