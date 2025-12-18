import React from 'react';
import { GameState, AnimatronicId } from '../types';
import AnimatronicModel from './AnimatronicModel';

interface OfficeProps {
  gameState: GameState;
  onToggleDoor: (side: 'left' | 'right') => void;
  onToggleLight: (side: 'left' | 'right') => void;
  onToggleMonitor: () => void;
}

const Office: React.FC<OfficeProps> = ({ 
  gameState, 
  onToggleDoor, 
  onToggleLight,
  onToggleMonitor
}) => {
  const bonnieAtDoor = gameState.animatronics[AnimatronicId.Bonnie].location === 'OFFICE_DOOR_LEFT';
  const chicaAtDoor = gameState.animatronics[AnimatronicId.Chica].location === 'OFFICE_DOOR_RIGHT';
  const freddyAtDoor = gameState.animatronics[AnimatronicId.Freddy].location === 'OFFICE_DOOR_RIGHT';

  return (
    <div className="relative w-full h-full bg-black overflow-hidden perspective-pan">
      
      {/* --- ROOM CONSTRUCTION (CSS ART) --- */}
      
      {/* 1. Back Wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-0">
        <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-transparent to-transparent" />
      </div>

      {/* 2. Floor (Checkerboard) */}
      <div 
        className="absolute bottom-0 w-full h-[40%] z-0 opacity-30"
        style={{
          background: `
            linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111),
            linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111)
          `,
          backgroundColor: '#222',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          transform: 'perspective(500px) rotateX(40deg) scale(1.5)',
          transformOrigin: 'bottom'
        }}
      />

      {/* 3. Poster */}
      <div className="absolute top-[20%] left-[35%] w-32 h-44 bg-gray-800 border border-gray-600 shadow-lg transform -rotate-2 z-0 flex flex-col items-center justify-center p-2">
         <div className="flex gap-1 mb-2">
             <div className="w-4 h-4 bg-yellow-700 rounded-full" />
             <div className="w-4 h-4 bg-amber-900 rounded-full" />
             <div className="w-4 h-4 bg-purple-900 rounded-full" />
         </div>
         <div className="text-[8px] text-center text-gray-400 leading-tight">
             CELEBRATE!<br/>---<br/>PIZZA
         </div>
      </div>

      {/* --- LEFT SIDE --- */}
      <div className="absolute top-0 left-0 bottom-0 w-[15%] min-w-[120px] z-10 bg-gray-900 border-r-8 border-gray-800 flex flex-col justify-center">
        {/* Door Void */}
        <div className="absolute top-[10%] bottom-[10%] right-0 w-[90%] bg-black overflow-hidden shadow-[inset_10px_0_20px_rgba(0,0,0,1)] flex items-end justify-center">
            {/* Bonnie Visual (Door) */}
            {gameState.lightLeftOn && bonnieAtDoor && (
                <div className="transform scale-150 origin-bottom translate-y-10 filter brightness-75 contrast-125">
                     <AnimatronicModel id={AnimatronicId.Bonnie} className="animate-pulse" />
                </div>
            )}
        </div>
        
        {/* Steel Door */}
        <div 
          className="absolute top-[10%] right-0 w-[90%] bg-gray-400 border-l-4 border-gray-600 transition-all duration-200 z-20 ease-linear"
          style={{ height: gameState.doorLeftOpen ? '0%' : '80%' }}
        >
             <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
        </div>

        {/* Buttons Panel */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-30 flex flex-col gap-2 bg-gray-800 p-2 rounded border-2 border-gray-600 shadow-xl">
             <button 
                onClick={() => onToggleDoor('left')}
                className={`w-12 h-12 rounded-full border-4 font-bold text-[10px] ${!gameState.doorLeftOpen ? 'bg-red-900 border-red-500 text-white shadow-[0_0_10px_red]' : 'bg-gray-700 border-gray-500 text-gray-400'}`}
             >
                 DOOR
             </button>
             <button 
                onClick={() => onToggleLight('left')}
                className={`w-12 h-12 rounded-full border-4 font-bold text-[10px] ${gameState.lightLeftOn ? 'bg-blue-100 border-blue-400 text-black shadow-[0_0_15px_white]' : 'bg-gray-700 border-gray-500 text-gray-400'}`}
             >
                 LIGHT
             </button>
        </div>
      </div>

      {/* --- RIGHT SIDE --- */}
      <div className="absolute top-0 right-0 bottom-0 w-[15%] min-w-[120px] z-10 bg-gray-900 border-l-8 border-gray-800 flex flex-col justify-center">
        {/* Door Void */}
        <div className="absolute top-[10%] bottom-[10%] left-0 w-[90%] bg-black overflow-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,1)] flex items-end justify-center">
             {/* Chica/Freddy Visual (Door) */}
            {gameState.lightRightOn && (chicaAtDoor || freddyAtDoor) && (
                <div className="transform scale-150 origin-bottom translate-y-10 filter brightness-75 contrast-125">
                     <AnimatronicModel 
                        id={freddyAtDoor ? AnimatronicId.Freddy : AnimatronicId.Chica} 
                        className="animate-pulse" 
                     />
                </div>
            )}
        </div>

        {/* Steel Door */}
        <div 
          className="absolute top-[10%] left-0 w-[90%] bg-gray-400 border-r-4 border-gray-600 transition-all duration-200 z-20 ease-linear"
          style={{ height: gameState.doorRightOpen ? '0%' : '80%' }}
        >
             <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
        </div>

        {/* Buttons Panel */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-30 flex flex-col gap-2 bg-gray-800 p-2 rounded border-2 border-gray-600 shadow-xl">
             <button 
                onClick={() => onToggleDoor('right')}
                className={`w-12 h-12 rounded-full border-4 font-bold text-[10px] ${!gameState.doorRightOpen ? 'bg-red-900 border-red-500 text-white shadow-[0_0_10px_red]' : 'bg-gray-700 border-gray-500 text-gray-400'}`}
             >
                 DOOR
             </button>
             <button 
                onClick={() => onToggleLight('right')}
                className={`w-12 h-12 rounded-full border-4 font-bold text-[10px] ${gameState.lightRightOn ? 'bg-blue-100 border-blue-400 text-black shadow-[0_0_15px_white]' : 'bg-gray-700 border-gray-500 text-gray-400'}`}
             >
                 LIGHT
             </button>
        </div>
      </div>

      {/* --- DESK PROPS --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[25vh] z-20">
          {/* Desk Surface */}
          <div className="w-full h-full bg-gray-800 border-t-8 border-gray-600 shadow-2xl relative">
              {/* Fan Base */}
              <div className="absolute -top-10 left-12 w-16 h-4 bg-black rounded-full" />
              <div className="absolute -top-32 left-16 w-8 h-24 bg-black" />
              {/* Fan Head */}
              <div className="absolute -top-40 left-8 w-24 h-24 border-4 border-black rounded-full bg-gray-800/50 flex items-center justify-center">
                   <div className="w-full h-full border-4 border-gray-900 rounded-full animate-spin border-t-transparent border-l-transparent opacity-80" />
                   <div className="absolute w-4 h-4 bg-blue-900 rounded-full" />
              </div>

              {/* Papers */}
              <div className="absolute top-4 right-1/4 w-32 h-24 bg-white/10 rotate-3 rounded p-2 text-[6px] text-white overflow-hidden font-mono">
                  SECURITY LOG
                  <br/> - Night 1
                  <br/> - Check lights
                  <br/> - Check cameras
              </div>
              <div className="absolute top-6 right-[20%] w-28 h-20 bg-white/10 -rotate-6 rounded" />

              {/* Cup */}
              <div className="absolute -top-16 right-12 w-10 h-16 bg-orange-700 border-b-4 border-orange-900 shadow-lg flex items-center justify-center text-[8px] text-white/50 rounded-sm">
                  SODA
              </div>
              
              {/* Plushie (Freddy) */}
              <div className="absolute -top-16 left-1/2 w-12 h-16 bg-amber-700 rounded-t-xl shadow-lg border-2 border-black/20">
                 <div className="absolute -top-2 left-1 w-2 h-4 bg-black rounded-t-sm" /> {/* Hat */}
                 <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full" />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" />
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full" />
                 <div className="absolute -top-2 left-0 w-3 h-4 bg-amber-700 rounded-t-lg -z-10" />
                 <div className="absolute -top-2 right-0 w-3 h-4 bg-amber-700 rounded-t-lg -z-10" />
              </div>
          </div>
      </div>

      {/* --- MONITOR TRIGGER --- */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30 group">
        <button 
            onClick={onToggleMonitor}
            className="w-[600px] h-12 bg-gray-800/90 border-2 border-gray-500 rounded-t-lg hover:bg-gray-700 flex items-center justify-center shadow-lg transition-transform hover:-translate-y-2"
        >
            <div className="w-1/2 h-1 bg-gray-500 group-hover:bg-white rounded-full" />
            <div className="absolute bottom-1 text-[9px] text-gray-500 uppercase tracking-widest group-hover:text-white">
                &gt; &gt; OPEN MONITOR &lt; &lt;
            </div>
        </button>
      </div>

      {/* Light Blindness Overlay */}
      {(gameState.lightLeftOn || gameState.lightRightOn) && (
          <div className="absolute inset-0 bg-white opacity-5 pointer-events-none mix-blend-overlay z-40" />
      )}
    </div>
  );
};

export default Office;