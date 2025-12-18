import React from 'react';
import { GameState } from '../types';

interface HUDProps {
  gameState: GameState;
}

const HUD: React.FC<HUDProps> = ({ gameState }) => {
  const powerPercent = Math.floor(gameState.power / 10);
  
  // Power Color
  const powerColor = powerPercent > 50 ? 'text-white' : powerPercent > 20 ? 'text-yellow-400' : 'text-red-500 animate-pulse';

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-6">
      
      {/* Top Right: Time */}
      <div className="absolute top-6 right-8 text-right">
        <div className="text-4xl font-bold tracking-widest text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {gameState.hour === 0 ? '12' : gameState.hour} AM
        </div>
        <div className="text-sm text-gray-400">Night 1</div>
      </div>

      {/* Bottom Left: Power */}
      <div className="absolute bottom-6 left-8">
        <div className={`text-2xl font-bold ${powerColor} drop-shadow-md`}>
          Power left: {powerPercent}%
        </div>
        <div className="flex items-center gap-2 mt-2">
            <span className="text-lg text-gray-300">Usage:</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                        key={level} 
                        className={`w-6 h-4 rounded-sm border border-gray-600 ${gameState.usage >= level ? (level > 3 ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-900'}`}
                    />
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default HUD;