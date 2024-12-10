import React, { useState, useEffect, useMemo } from 'react';
import { CardGame } from './components/CardGame';
import { BirdGame } from './components/BirdGame';
import { Timer } from './components/Timer';
import { GameHistory } from './components/GameHistory';
import { BettingOptions } from './components/BettingOptions';
import { BettingControls } from './components/BettingControls';
import { LuckyNumber } from './components/LuckyNumber';
import { UserStats } from './components/UserStats';
import { BettingHistory } from './components/BettingHistory';
import { useGameStore } from './store/gameStore';
import { useGameSounds } from './hooks/useGameSounds';
import { generateRandomNumber, getColorForNumber } from './utils/gameLogic';
import { BettingBoard } from './components/BettingBoard';

type GameType = 'cards' | 'birds' | 'betting';

const ROUND_DURATION = 30;

function App() {
  const [activeGame, setActiveGame] = useState<GameType>('cards');

  // Betting Game State
  const { placeBet, processBetResult } = useGameStore();
  const { playBet, playWin, playLose, playTick } = useGameSounds();
  const [gameState, setGameState] = useState({
    currentPeriod: 1,
    timeRemaining: ROUND_DURATION,
    lastResults: [],
    isAcceptingBets: true,
  });
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(1);

  const currentResult = useMemo(
    () => gameState.lastResults[0] || { result: null, color: null },
    [gameState.lastResults]
  );

  useEffect(() => {
    if (activeGame !== 'betting') return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeRemaining = prev.timeRemaining - 1;

        if (newTimeRemaining <= 5 && newTimeRemaining > 0) {
          playTick();
        }

        if (newTimeRemaining <= 0) {
          const result = generateRandomNumber();

          setTimeout(() => {
            processBetResult(result);
            const hadWinningBets = true; // Update logic as needed
            hadWinningBets ? playWin() : playLose();
          }, 0);

          const newHistory = {
            period: prev.currentPeriod,
            result,
            timestamp: new Date(),
            color: getColorForNumber(result),
          };

          return {
            currentPeriod: prev.currentPeriod + 1,
            timeRemaining: ROUND_DURATION,
            lastResults: [newHistory, ...prev.lastResults].slice(0, 10),
            isAcceptingBets: true,
          };
        }

        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          isAcceptingBets: newTimeRemaining > 5,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeGame, playTick, playWin, playLose, processBetResult]);

  const handlePlaceBet = (bet) => {
    if (!gameState.isAcceptingBets) return;
    placeBet(bet);
    playBet();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-black p-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Game Selection Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveGame('cards')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeGame === 'cards'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Card Matching Game
          </button>
          <button
            onClick={() => setActiveGame('birds')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeGame === 'birds'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Flying Birds Game
          </button>
          <button
            onClick={() => setActiveGame('betting')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeGame === 'betting'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Hidden Treasure Game
          </button>
        </div>

        {/* Active Game Content */}
        {activeGame === 'cards' && <CardGame />}
        {activeGame === 'birds' && <BirdGame />}
        {activeGame === 'betting' && (
          <div className="space-y-8">
            <UserStats />
            <Timer
              timeRemaining={gameState.timeRemaining}
              isAcceptingBets={gameState.isAcceptingBets}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <BettingBoard
                  onPlaceBet={handlePlaceBet}
                  disabled={!gameState.isAcceptingBets}
                />
                <BettingControls
                  betAmount={betAmount}
                  onBetAmountChange={setBetAmount}
                  multiplier={multiplier}
                  onMultiplierChange={setMultiplier}
                />
                <BettingOptions
                  onPlaceBet={handlePlaceBet}
                  betAmount={betAmount}
                  multiplier={multiplier}
                  disabled={!gameState.isAcceptingBets}
                />
                <BettingHistory />
              </div>
              <div className="space-y-6">
                <LuckyNumber
                  number={currentResult.result}
                  color={currentResult.color}
                />
                <GameHistory history={gameState.lastResults} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
