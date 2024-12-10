import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  isAcceptingBets: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, isAcceptingBets }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg p-4 shadow-md">
      <TimerIcon className="w-6 h-6 text-blue-600" />
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Next Draw</span>
        <span className="text-2xl font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <div className={`ml-4 px-3 py-1 rounded-full text-sm ${
        isAcceptingBets 
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {isAcceptingBets ? 'Betting Open' : 'Betting Closed'}
      </div>
    </div>
  );
};