import React, { useState, useEffect, useCallback } from 'react';
import { Card as CardComponent } from './Card';
import { GameControls } from './GameControls';
import { WinPopup } from './WinPopup';
import { Fireworks } from './Fireworks';
import { generateCards, shuffle } from '../utils/gameUtils';
import { GameState, Card } from '../types/game';

const INITIAL_COINS = 1000;
const ROUND_TIME = 30;
const BET_CUTOFF_TIME = 10;

export function CardGame() {
  const [gameState, setGameState] = useState<GameState>({
    cards: generateCards(),
    coins: INITIAL_COINS,
    betAmount: 0,
    timer: ROUND_TIME,
    canBet: true,
    selectedCards: [],
    isPlaying: false,
    showAllCards: false,
  });
  const [showFireworks, setShowFireworks] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  const resetRound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      cards: generateCards(),
      timer: ROUND_TIME,
      canBet: true,
      betAmount: 0,
      selectedCards: [],
      isPlaying: false,
      showAllCards: false,
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
        cards: prev.timer % 20 === 0 ? shuffle(prev.cards) : prev.cards,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.timer, resetRound]);

  const handleCardClick = (clickedCard: Card) => {
    if (!gameState.isPlaying || clickedCard.isMatched) return;

    const newSelectedCards = [...gameState.selectedCards, clickedCard];
    
    if (newSelectedCards.length === 2) {
      const [firstCard, secondCard] = newSelectedCards;
      const isMatch = firstCard.number === secondCard.number;
      
      if (isMatch) {
        const winAmount = gameState.betAmount * 10;
        setWinAmount(winAmount);
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 2000);
        
        setGameState(prev => ({
          ...prev,
          coins: prev.coins + winAmount,
          cards: prev.cards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          ),
          selectedCards: [],
          showAllCards: true,
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          coins: prev.coins - (prev.betAmount + 2),
          selectedCards: [],
          showAllCards: true,
          cards: shuffle(prev.cards),
        }));
      }
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showAllCards: false,
        }));
      }, 1500);
    } else {
      setGameState(prev => ({
        ...prev,
        selectedCards: newSelectedCards,
      }));
    }
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

      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {gameState.cards.map(card => (
          <CardComponent
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={!gameState.isPlaying || gameState.selectedCards.length === 2}
            showNumber={gameState.showAllCards || gameState.selectedCards.some(c => c.id === card.id)}
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
      {winAmount > 0 && showFireworks && (
        <WinPopup
          winAmount={winAmount}
          onClose={() => {
            setWinAmount(0);
            setShowFireworks(false);
          }}
        />
      )}
    </div>
  );
}