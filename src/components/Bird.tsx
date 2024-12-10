import React from 'react';
import { Bird as BirdType } from '../types/bird';

interface BirdProps {
  bird: BirdType;
  onClick: (bird: BirdType) => void;
  disabled: boolean;
}

export function Bird({ bird, onClick, disabled }: BirdProps) {
  const birdSize = 60;
  const isPositive = bird.value > 0;

  return (
    <button
      onClick={() => onClick(bird)}
      disabled={disabled || bird.isClicked}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110
        ${bird.isClicked ? 'opacity-50' : 'opacity-100'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        left: bird.position.x,
        top: bird.position.y,
        width: birdSize,
        height: birdSize,
      }}
    >
      <div className={`relative ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        <div className="text-4xl animate-bounce">🦅</div>
        {bird.isClicked && (
          <div className={`absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-lg
            ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{bird.value}
          </div>
        )}
      </div>
    </button>
  );
}