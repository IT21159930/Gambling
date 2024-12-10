import React from 'react';
import { useGameStore } from '../store/gameStore';
import { History } from 'lucide-react';
import type { GameHistory as GameHistoryType } from '../types/game';

interface GameHistoryProps {
  history: GameHistoryType[];
}

export const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const { spinHistory, gameHistory } = useGameStore();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-xl">
      {/* Last 10 Numbers Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Last 10 Numbers</h2>
        <div className="flex gap-2">
          {spinHistory.slice(0, 10).map((spin, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                spin.color === 'red'
                  ? 'bg-red-600'
                  : spin.color === 'black'
                  ? 'bg-black'
                  : 'bg-green-600'
              }`}
            >
              {spin.number}
            </div>
          ))}
        </div>
      </div>

      {/* Betting History Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Betting History</h2>
        <div className="space-y-2">
          {gameHistory.slice(0, 10).map((historyItem, index) => (
            <div
              key={index}
              className="p-2 bg-gray-100 rounded flex justify-between items-center"
            >
              <div>
                <span className="font-bold">Bet: </span>
                <span>${historyItem.bet.amount} on {historyItem.bet.type}</span>
              </div>
              <div>
                <span className="font-bold">Result: </span>
                <span
                  className={`font-bold ${
                    historyItem.winAmount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {historyItem.winAmount > 0
                    ? `+$${historyItem.winAmount}`
                    : `-$${historyItem.bet.amount}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game History Summary Section */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <History className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Game History</h2>
        </div>
        <div className="space-y-2">
          {history.map((entry) => (
            <div
              key={entry.period}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-600">Period {entry.period}</span>
              <div className="flex items-center space-x-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    entry.color === 'red' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                >
                  {entry.result}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
