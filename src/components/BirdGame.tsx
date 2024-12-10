import React, { useState, useEffect, useCallback } from 'react';
import { Bird as BirdComponent } from './Bird';
import { GameControls } from './GameControls';
import { Fireworks } from './Fireworks';
import { generateBirds, updateBirdPosition } from '../utils/birdUtils';
import { Bird, GameState } from '../types/bird';

const INITIAL_COINS = 1000;
const ROUND_TIME = 20;
const BET_CUTOFF_TIME = 5;

export function BirdGame() {
  const [gameState, setGameState] = useState<GameState>({
    birds: generateBirds(),
    coins: INITIAL_COINS,
    betAmount: 0,
    timer: ROUND_TIME,
    canBet: true,
    isPlaying: false,
  });
  const [showFireworks, setShowFireworks] = useState(false);

  const resetRound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      birds: generateBirds(),
      timer: ROUND_TIME,
      canBet: true,
      betAmount: 0,
      isPlaying: false,
    }));
    setShowFireworks(false);
  }, []);

  useEffect(() => {
    if (gameState.timer <= 0) {
      resetRound();
      return;
    }

    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timer: prev.timer - 1,
        canBet: prev.timer > BET_CUTOFF_TIME,
        birds: prev.isPlaying ? prev.birds.map(updateBirdPosition) : prev.birds,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.timer, resetRound]);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const animationFrame = requestAnimationFrame(() => {
      setGameState(prev => ({
        ...prev,
        birds: prev.birds.map(updateBirdPosition),
      }));
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [gameState.isPlaying, gameState.birds]);

  const handleBirdClick = (clickedBird: Bird) => {
    if (!gameState.isPlaying || clickedBird.isClicked) return;

    const updatedBirds = gameState.birds.map(bird =>
      bird.id === clickedBird.id ? { ...bird, isClicked: true } : bird
    );

    const newCoins = gameState.coins + (clickedBird.value * gameState.betAmount) / 10;
    
    if (clickedBird.value > 0) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 2000);
    }

    setGameState(prev => ({
      ...prev,
      birds: updatedBirds,
      coins: newCoins,
    }));
  };

  const handlePlaceBet = () => {
    if (!gameState.canBet || gameState.betAmount <= 0 || gameState.betAmount > gameState.coins) {
      return;
    }

    setGameState(prev => ({
      ...prev,
      isPlaying: true,
    }));
  };

  return (
    <div className="space-y-8">
      <GameControls
        coins={gameState.coins}
        betAmount={gameState.betAmount}
        setBetAmount={(amount) => setGameState(prev => ({ ...prev, betAmount: amount }))}
        timer={gameState.timer}
        canBet={gameState.canBet}
        onPlaceBet={handlePlaceBet}
      />

      <div className="relative h-[60vh] bg-gradient-to-b from-sky-800/20 to-sky-900/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
        {gameState.birds.map(bird => (
          <BirdComponent
            key={bird.id}
            bird={bird}
            onClick={handleBirdClick}
            disabled={!gameState.isPlaying}
          />
        ))}
      </div>

      {gameState.coins <= 0 && (
        <div className="text-center p-4 bg-red-900/80 backdrop-blur-sm rounded-lg border border-red-500">
          <p className="text-red-200 font-bold">Game Over! You've run out of coins.</p>
          <button
            onClick={() => setGameState(prev => ({ ...prev, coins: INITIAL_COINS }))}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start New Game
          </button>
        </div>
      )}

      {showFireworks && <Fireworks />}
    </div>
  );
}