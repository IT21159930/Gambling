import React from 'react';

interface BettingControlsProps {
  betAmount: number;
  onBetAmountChange: (amount: number) => void;
  multiplier: number;
  onMultiplierChange: (multiplier: number) => void;
}

export const BettingControls: React.FC<BettingControlsProps> = ({
  betAmount,
  onBetAmountChange,
  multiplier,
  onMultiplierChange,
}) => {
  return (
    <div className="flex flex-wrap gap-6 bg-white rounded-lg p-6 shadow-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bet Amount</label>
        <input
          type="number"
          min="10"
          step="10"
          value={betAmount}
          onChange={(e) => onBetAmountChange(Number(e.target.value))}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Multiplier</label>
        <select
          value={multiplier}
          onChange={(e) => onMultiplierChange(Number(e.target.value))}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value={1}>x1</option>
          <option value={2}>x2</option>
          <option value={5}>x5</option>
          <option value={10}>x10</option>
        </select>
      </div>
    </div>
  );
};