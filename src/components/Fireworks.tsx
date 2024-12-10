import React from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

export function Fireworks() {
  return (
    <ReactCanvasConfetti
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
      fire={true}
      colors={['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#ff00ff']}
      particleCount={200}
      spread={180}
      origin={{ x: 0.5, y: 0.8 }}
    />
  );
}