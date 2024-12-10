import React, { useState } from 'react';
import type { Bet } from '../types/game';
import { CircleDollarSign } from 'lucide-react';

interface BettingOptionsProps {
  onPlaceBet: (bet: Bet) => void;
  betAmount: number;
  multiplier: number;
  disabled: boolean;
}

export const BettingOptions: React.FC<BettingOptionsProps> = ({
  onPlaceBet,
  betAmount,
  multiplier,
  disabled,
}) => {
  const [selectedBet, setSelectedBet] = useState<Omit<Bet, 'amount' | 'multiplier'> | null>(null);

  const handleSelectBet = (type: 'color' | 'range', value: string) => {
    setSelectedBet({ type, value });
  };

  const handlePlaceBet = () => {
    if (selectedBet) {
      onPlaceBet({
        ...selectedBet,
        amount: betAmount,
        multiplier,
      });
      setSelectedBet(null);
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-lg p-6 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Color Bets</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleSelectBet('color', 'red')}
              disabled={disabled}
              className={`flex-1 py-3 px-6 rounded-md transition-all duration-200 ${
                selectedBet?.type === 'color' && selectedBet.value === 'red'
                  ? 'bg-red-500 text-white ring-4 ring-red-200'
                  : 'bg-red-100 text-red-700 hover:bg-red-500 hover:text-white'
              } disabled:opacity-50`}
            >
              Red
            </button>
            <button
              onClick={() => handleSelectBet('color', 'green')}
              disabled={disabled}
              className={`flex-1 py-3 px-6 rounded-md transition-all duration-200 ${
                selectedBet?.type === 'color' && selectedBet.value === 'green'
                  ? 'bg-green-500 text-white ring-4 ring-green-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-500 hover:text-white'
              } disabled:opacity-50`}
            >
              Green
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Range Bets</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleSelectBet('range', 'small')}
              disabled={disabled}
              className={`flex-1 py-3 px-6 rounded-md transition-all duration-200 ${
                selectedBet?.type === 'range' && selectedBet.value === 'small'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white'
              } disabled:opacity-50`}
            >
              Small (1-24)
            </button>
            <button
              onClick={() => handleSelectBet('range', 'big')}
              disabled={disabled}
              className={`flex-1 py-3 px-6 rounded-md transition-all duration-200 ${
                selectedBet?.type === 'range' && selectedBet.value === 'big'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white'
              } disabled:opacity-50`}
            >
              Big (25-48)
            </button>
          </div>
        </div>
      </div>

      {selectedBet && (
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <p className="font-medium">Selected Bet:</p>
              <p className="text-sm">
                {selectedBet.type === 'color' 
                  ? `${selectedBet.value.charAt(0).toUpperCase() + selectedBet.value.slice(1)}`
                  : `${selectedBet.value === 'small' ? 'Small (1-24)' : 'Big (25-48)'}`}
              </p>
              <p className="text-sm">Amount: ${betAmount} × {multiplier}x</p>
            </div>
            <button
              onClick={handlePlaceBet}
              disabled={disabled}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <CircleDollarSign className="w-5 h-5" />
              Place Bet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};