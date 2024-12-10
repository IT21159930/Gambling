import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
  showNumber: boolean;
}

export function Card({ card, onClick, disabled, showNumber }: CardProps) {
  return (
    <button
      onClick={() => onClick(card)}
      disabled={disabled || card.isMatched}
      className={`relative w-32 h-48 rounded-xl transition-transform duration-500 transform perspective-1000 ${
        showNumber ? 'rotate-y-180' : ''
      }`}
    >
      <div className={`absolute w-full h-full backface-hidden ${showNumber ? 'hidden' : 'block'}`}>
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-800 rounded-xl shadow-lg border-2 border-purple-300 flex items-center justify-center">
          <div className="text-4xl font-bold text-white">?</div>
        </div>
      </div>

      <div
        className={`absolute w-full h-full backface-hidden rotate-y-180 ${
          showNumber ? 'block' : 'hidden'
        }`}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-800 rounded-xl shadow-lg border-2 border-purple-300 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">{card.number}</span>
        </div>
      </div>
    </button>
  );
}
