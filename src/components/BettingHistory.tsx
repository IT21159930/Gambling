import React from 'react';
import { Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const BettingHistory: React.FC = () => {
  const { bettingHistory } = useGameStore();

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Betting History</h2>
      </div>
      <div className="space-y-2">
        {bettingHistory.map((bet, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {bet.type === 'color' 
                  ? `Color: ${bet.value}`
                  : bet.type === 'range'
                  ? `Range: ${bet.value}`
                  : `Number: ${bet.value}`}
              </span>
              <span className="text-xs text-gray-500">
                Amount: ${bet.amount} × {bet.multiplier}x
              </span>
            </div>
            <span className="text-sm font-medium text-blue-600">
              Potential Win: ${(bet.amount * bet.multiplier).toFixed(2)}
            </span>
          </div>
        ))}
        {bettingHistory.length === 0 && (
          <p className="text-gray-500 text-center py-4">No bets placed yet</p>
        )}
      </div>
    </div>
  );
};