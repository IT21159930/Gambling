import React, { memo } from 'react';
import { Wallet, TrendingUp } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const UserStats: React.FC = memo(() => {
  const balance = useGameStore((state) => state.balance);
  const winnings = useGameStore((state) => state.winnings);

  return (
    <div className="flex gap-4">
      <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-3 flex-1">
        <Wallet className="w-6 h-6 text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-3 flex-1">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Total Winnings</p>
          <p className="text-xl font-bold">${winnings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
});