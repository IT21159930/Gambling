import React from 'react';

interface GameControlsProps {
  coins: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  timer: number;
  canBet: boolean;
  onPlaceBet: () => void;
}

export function GameControls({
  coins,
  betAmount,
  setBetAmount,
  timer,
  canBet,
  onPlaceBet,
}: GameControlsProps) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg space-y-4 border border-blue-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-blue-300">Your Balance</h2>
          <p className="text-2xl font-bold text-yellow-400">{coins} 🪙</p>
        </div>
        <div className="text-center px-4 py-2 bg-gray-800 rounded-lg border border-blue-400">
          <p className="text-sm text-blue-300 font-medium">Time Left</p>
          <p className="text-2xl font-bold text-blue-400">{timer}s</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-blue-300">
          Place Your Bet
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
            min="0"
            max={coins}
            className="flex-1 rounded-lg bg-gray-800 border-blue-500 text-white placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            disabled={!canBet}
          />
          <button
            onClick={onPlaceBet}
            disabled={!canBet || betAmount <= 0 || betAmount > coins}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Bet
          </button>
        </div>
      </div>

      {!canBet && timer > 0 && (
        <p className="text-sm text-red-400">Betting is closed for this round!</p>
      )}
    </div>
  );
}