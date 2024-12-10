import React, { useEffect, useRef } from 'react';
import { NUMBERS, getNumberColor } from '../utils/roulette';

interface RouletteWheelProps {
  isSpinning: boolean;
  lastNumber?: number;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({ isSpinning, lastNumber }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    const drawWheel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      NUMBERS.forEach((number, index) => {
        const angle = (index * 2 * Math.PI) / NUMBERS.length;
        const color = getNumberColor(number);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(
          centerX,
          centerY,
          radius,
          angle,
          angle + (2 * Math.PI) / NUMBERS.length
        );
        ctx.closePath();
        
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        
        // Draw numbers
        ctx.save();
        ctx.translate(
          centerX + (radius * 0.85 * Math.cos(angle + Math.PI / NUMBERS.length)),
          centerY + (radius * 0.85 * Math.sin(angle + Math.PI / NUMBERS.length))
        );
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(number.toString(), 0, 0);
        ctx.restore();
      });
    };

    drawWheel();

    if (isSpinning) {
      let rotation = 0;
      let speed = 0.3;
      
      const animate = () => {
        rotation += speed;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.translate(-centerX, -centerY);
        drawWheel();
        ctx.restore();
        
        if (speed > 0.001) {
          speed *= 0.99;
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isSpinning, lastNumber]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="mx-auto"
    />
  );
};