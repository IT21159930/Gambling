import React from 'react';

interface WinPopupProps {
  winAmount: number;
  onClose: () => void;
}

export function WinPopup({ winAmount, onClose }: WinPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-xl shadow-2xl border-2 border-purple-400 max-w-md w-full mx-4 transform scale-100 animate-bounce">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-4">🎉 YOU WON! 🎉</h2>
        <p className="text-xl text-center text-white mb-6">
          Congratulations! You've won <span className="text-yellow-400 font-bold">{winAmount} coins</span>!
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
}