import React from 'react';
import { Sparkles } from 'lucide-react';

interface LuckyNumberProps {
  number: number | null;
  color: 'red' | 'green' | null;
}

export const LuckyNumber: React.FC<LuckyNumberProps> = ({ number, color }) => {
  if (!number || !color) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
        <Sparkles className="w-8 h-8 text-gray-400" />
        <span className="ml-2 text-gray-500">Waiting for next draw...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Lucky Number</h2>
      <div
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-2
          ${color === 'red' ? 'bg-red-500' : 'bg-green-500'}`}
      >
        {number}
      </div>
      <div className={`text-lg font-medium ${color === 'red' ? 'text-red-500' : 'text-green-500'}`}>
        {color.toUpperCase()}
      </div>
    </div>
  );
};