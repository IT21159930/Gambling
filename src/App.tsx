import React, { useState } from 'react';
import { CardGame } from './components/CardGame';
import { BirdGame } from './components/BirdGame';

type GameType = 'cards' | 'birds';

function App() {
  const [activeGame, setActiveGame] = useState<GameType>('cards');

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-black p-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
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
        </div>

        <h1 className="text-4xl font-bold text-center text-blue-400">
          {activeGame === 'cards' ? 'Card Matching Game' : 'Flying Birds Game'}
        </h1>
        
        {activeGame === 'cards' ? <CardGame /> : <BirdGame />}
      </div>
    </div>
  );
}

export default App;