import React from 'react';
import { CameraId, AnimatronicId, AnimatronicState } from '../types';
import { CAMERAS } from '../constants';
import StaticEffect from './StaticEffect';
import AnimatronicModel from './AnimatronicModel';

interface CameraSystemProps {
  currentCamera: CameraId;
  onSwitchCamera: (id: CameraId) => void;
  animatronics: Record<AnimatronicId, AnimatronicState>;
  onToggleMonitor: () => void;
}

// --- VISUAL HELPERS ---
const getRoomVisuals = (currentCamera: CameraId, visibleAnimatronics: AnimatronicState[]) => {
    switch (currentCamera) {
        case CameraId.ShowStage: // 1A
            return (
                <div className="absolute inset-0 bg-black flex flex-col items-center">
                    {/* Curtains */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-red-900 z-10" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-red-900 z-10" />
                    <div className="absolute top-0 w-full h-12 bg-[repeating-linear-gradient(90deg,red,darkred_20px)] rounded-b-3xl shadow-lg z-20" />
                    
                    {/* Stage */}
                    <div className="mt-auto w-3/4 h-32 bg-amber-900 border-t-8 border-amber-950 flex justify-center items-end pb-4 relative shadow-[inset_0_0_50px_black]">
                        {/* Background Arch */}
                        <div className="absolute -top-40 left-10 right-10 h-40 bg-gray-900 rounded-t-full -z-10 border-4 border-yellow-600/20" />
                        
                        {/* Animatronics Spots */}
                        <div className="flex gap-4 items-end">
                            <div className="w-24 flex justify-center">
                                {visibleAnimatronics.find(a => a.id === AnimatronicId.Bonnie) && <AnimatronicModel id={AnimatronicId.Bonnie} className="mx-2" />}
                            </div>
                            <div className="w-24 flex justify-center pb-4 z-10">
                                {visibleAnimatronics.find(a => a.id === AnimatronicId.Freddy) && <AnimatronicModel id={AnimatronicId.Freddy} className="mx-2" />}
                            </div>
                            <div className="w-24 flex justify-center">
                                {visibleAnimatronics.find(a => a.id === AnimatronicId.Chica) && <AnimatronicModel id={AnimatronicId.Chica} className="mx-2" />}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case CameraId.DiningArea: // 1B
            return (
                <div className="absolute inset-0 bg-gray-900 perspective-[500px] overflow-hidden">
                    {/* Floor */}
                    <div 
                        className="absolute bottom-0 w-full h-[60%] origin-bottom transform rotate-x-60 scale-150"
                        style={{
                            backgroundImage: 'conic-gradient(#222 90deg, #444 90deg 180deg, #222 180deg 270deg, #444 270deg)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                    {/* Tables */}
                    <div className="absolute top-1/2 left-10 w-24 h-60 bg-white transform rotate-x-45 skew-y-12 shadow-lg">
                        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,rgba(0,0,0,0.1)_20px)]" />
                    </div>
                    <div className="absolute top-1/2 right-10 w-24 h-60 bg-white transform rotate-x-45 -skew-y-12 shadow-lg">
                         <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,rgba(0,0,0,0.1)_20px)]" />
                    </div>

                    {/* Animatronics in Dining Area */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center gap-20">
                        {visibleAnimatronics.map(a => (
                            <div key={a.id} className="transform scale-75 opacity-80 brightness-50">
                                <AnimatronicModel id={a.id} />
                            </div>
                        ))}
                    </div>
                </div>
            );

        case CameraId.PirateCove: // 1C
            return (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                    {/* Curtain */}
                    <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#2e1065,#4c1d95_20px,#2e1065_40px)] relative overflow-hidden">
                         <div className="absolute inset-0 bg-black/40" />
                         {/* Stars */}
                         <div className="absolute top-10 left-10 text-yellow-500 opacity-50 text-4xl">★</div>
                         <div className="absolute bottom-20 right-20 text-yellow-500 opacity-50 text-2xl">★</div>
                         
                         {/* Sign */}
                         <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-gray-200 p-2 border-4 border-gray-600 rotate-3 shadow-xl">
                             <div className="border-2 border-black p-1 text-center font-bold text-black uppercase text-sm">
                                 SORRY!<br/><span className="text-red-600 font-black">OUT OF ORDER</span>
                             </div>
                         </div>

                         {/* Foxy Peeking */}
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10">
                            {visibleAnimatronics.find(a => a.id === AnimatronicId.Foxy) && <AnimatronicModel id={AnimatronicId.Foxy} />}
                         </div>

                         {/* Curtain Opening Layer */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </div>
                </div>
            );

        case CameraId.Backstage: // 5
            return (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    {/* Shelves with Heads */}
                    <div className="w-full h-full flex flex-col justify-end p-10 bg-black/50">
                        <div className="w-full h-4 bg-gray-600 mb-20 relative">
                             {/* Spare Heads */}
                             <div className="absolute -top-12 left-10 w-10 h-12 bg-amber-900/50 rounded-lg border border-gray-500" />
                             <div className="absolute -top-12 left-24 w-10 h-12 bg-indigo-900/50 rounded-lg border border-gray-500" />
                        </div>
                        <div className="w-full h-4 bg-gray-600 relative">
                             <div className="absolute -top-14 right-20 w-16 h-14 bg-gray-800 rounded-lg border-2 border-gray-500" /> {/* Endoskeleton */}
                        </div>
                    </div>
                    {/* Bonnie here? */}
                    {visibleAnimatronics.find(a => a.id === AnimatronicId.Bonnie) && (
                        <div className="absolute left-10 top-20 scale-150 z-20 brightness-50">
                             <AnimatronicModel id={AnimatronicId.Bonnie} />
                        </div>
                    )}
                </div>
            );

        case CameraId.SupplyCloset: // 3
            return (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="w-1/2 h-full bg-gray-900 border-r-4 border-black" />
                    {/* Shelves */}
                    <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col gap-10 p-2">
                        <div className="w-full h-2 bg-gray-600" />
                        <div className="w-full h-2 bg-gray-600" />
                        <div className="w-full h-2 bg-gray-600" />
                    </div>
                    {/* Bonnie Staring */}
                    {visibleAnimatronics.find(a => a.id === AnimatronicId.Bonnie) && (
                        <div className="absolute bottom-0 right-10 scale-125 z-20 brightness-75">
                             <AnimatronicModel id={AnimatronicId.Bonnie} />
                        </div>
                    )}
                </div>
            );

        case CameraId.WestHall: // 2A
        case CameraId.EastHall: // 4A
            return (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center perspective-[300px]">
                     {/* Ceiling */}
                     <div className="absolute top-0 w-full h-1/2 bg-gray-800" />
                     {/* Walls */}
                     <div className="absolute inset-0 border-[100px] border-gray-900 border-b-black border-t-gray-800 box-border" />
                     {/* End of Hall */}
                     <div className="w-32 h-32 bg-black shadow-[0_0_50px_black] z-10 flex items-center justify-center relative">
                        <div className="text-gray-600 text-[8px]">EXIT</div>
                        
                        {/* Animatronic in Hall */}
                        <div className="absolute bottom-0 scale-50">
                             {visibleAnimatronics.map(a => <AnimatronicModel key={a.id} id={a.id} />)}
                        </div>
                     </div>
                </div>
            );
        
        case CameraId.Kitchen: // 6
             return (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-gray-700 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-12 h-1 bg-gray-700 rotate-45" />
                        </div>
                        <p className="mt-4 text-gray-500 font-mono text-sm tracking-widest">- AUDIO ONLY -</p>
                    </div>
                </div>
             );

        case CameraId.Restrooms: // 7
             return (
                 <div className="absolute inset-0 bg-gray-900 perspective-[400px]">
                     <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_39px,black_40px)] opacity-20" />
                     {/* Stall Doors */}
                     <div className="absolute top-20 right-10 w-20 h-40 bg-gray-700 border-4 border-gray-600 transform skew-y-12" />
                     <div className="absolute top-20 right-36 w-20 h-40 bg-gray-700 border-4 border-gray-600 transform skew-y-12" />
                     
                     {/* Chica Staring */}
                     {visibleAnimatronics.find(a => a.id === AnimatronicId.Chica) && (
                        <div className="absolute bottom-0 right-20 scale-125 z-20 brightness-50">
                             <AnimatronicModel id={AnimatronicId.Chica} />
                        </div>
                     )}
                     {visibleAnimatronics.find(a => a.id === AnimatronicId.Freddy) && (
                        <div className="absolute bottom-0 right-20 scale-125 z-20 brightness-25">
                             <AnimatronicModel id={AnimatronicId.Freddy} />
                        </div>
                     )}
                 </div>
             )

        default: // Corners
             return (
                 <div className="absolute inset-0 bg-gray-800">
                     <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-80" />
                     {/* Wall Corner */}
                     <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-black blur-sm" />
                     
                     {/* Papers */}
                     <div className="absolute top-1/4 left-10 w-20 h-24 bg-white opacity-20" />
                     <div className="absolute top-1/3 left-12 w-20 h-24 bg-white opacity-20 rotate-6" />

                     {/* Animatronic Close Up */}
                     {visibleAnimatronics.length > 0 && (
                         <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end p-10 transform scale-150 origin-bottom-right">
                             <AnimatronicModel id={visibleAnimatronics[0].id} />
                         </div>
                     )}
                 </div>
             )
    }
};

// --- MAP BUTTON COMPONENT ---
// Moved outside main component to prevent re-mounting and focus loss
interface MapButtonProps {
    id: CameraId;
    label?: string; // Optional custom label
    currentCamera: CameraId;
    onSelect: (id: CameraId) => void;
    style?: React.CSSProperties;
    className?: string;
}

const MapButton: React.FC<MapButtonProps> = ({ 
    id, 
    label,
    currentCamera, 
    onSelect, 
    style, 
    className 
}) => {
    const isSelected = currentCamera === id;
    const baseClass = "absolute border-2 font-bold text-[10px] sm:text-[11px] flex items-center justify-center transition-colors cursor-pointer shadow-md select-none";
    const activeClass = isSelected 
        ? "bg-green-700 border-green-400 text-white z-20" 
        : "bg-gray-800 border-gray-500 text-gray-400 hover:bg-gray-700 z-10";
    
    // Default size if not provided in className
    const sizeClass = className || "w-[45px] h-[30px]";

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
            }}
            style={style}
            className={`${baseClass} ${activeClass} ${sizeClass}`}
        >
            {isSelected && <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />}
            {label || `CAM ${id}`}
        </button>
    );
};

// --- MAIN COMPONENT ---
const CameraSystem: React.FC<CameraSystemProps> = ({ 
  currentCamera, 
  onSwitchCamera, 
  animatronics,
  onToggleMonitor
}) => {

  const visibleAnimatronics = (Object.values(animatronics) as AnimatronicState[]).filter(
    (a) => a.location === currentCamera
  );

  return (
    <div className="absolute inset-0 z-40 bg-black/95 flex flex-col p-2 border-t-8 border-gray-600 animate-[fadeIn_0.1s_ease-out] select-none">
      <StaticEffect opacity={0.15} />
      
      {/* Main Screen Area */}
      <div className="flex-1 relative border-4 border-gray-600 mb-2 overflow-hidden bg-black">
        {/* Render Generated Room */}
        <div className="w-full h-full relative">
            {getRoomVisuals(currentCamera, visibleAnimatronics)}
        </div>
        
        {/* Scanlines / Noise Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-30" />
        
        {/* Room Label */}
        <div className="absolute top-6 left-6 text-white text-2xl font-bold tracking-widest bg-black/70 px-4 py-1 border border-gray-500 z-40">
          {CAMERAS.find(c => c.id === currentCamera)?.label}
        </div>

        {/* Recording Blinker */}
        <div className="absolute top-6 right-6 flex items-center gap-3 bg-black/70 px-2 py-1 rounded z-40">
            <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
            <span className="text-white font-mono tracking-widest">REC</span>
        </div>
        
        {/* Switching Flash */}
        <div key={currentCamera} className="absolute inset-0 bg-white opacity-10 animate-[ping_0.1s_linear_1] pointer-events-none mix-blend-overlay z-50" />
      </div>

      {/* --- MAP LAYOUT --- */}
      <div className="absolute bottom-24 right-4 w-[280px] h-[200px] select-none pointer-events-auto z-50">
        {/* Connection Lines (Simulated with absolute divs) */}
        {/* 1A to 1B */} <div className="absolute top-[15%] left-[45%] w-1 h-8 bg-gray-600/50" />
        {/* 1B to 5 */}  <div className="absolute top-[30%] left-[20%] w-10 h-1 bg-gray-600/50" />
        {/* 1B to 7 */}  <div className="absolute top-[30%] right-[20%] w-10 h-1 bg-gray-600/50" />
        {/* 1B to 1C */} <div className="absolute top-[45%] left-[20%] w-8 h-1 bg-gray-600/50" />
        {/* 7 to 6 */}   <div className="absolute top-[40%] right-[15%] w-1 h-12 bg-gray-600/50" />
        {/* 1B to 2A */} <div className="absolute bottom-[40%] left-[30%] w-1 h-10 bg-gray-600/50" />
        {/* 1B to 4A */} <div className="absolute bottom-[40%] right-[30%] w-1 h-10 bg-gray-600/50" />
        {/* 2A to 2B */} <div className="absolute bottom-[25%] left-[30%] w-1 h-8 bg-gray-600/50" />
        {/* 4A to 4B */} <div className="absolute bottom-[25%] right-[30%] w-1 h-8 bg-gray-600/50" />
        {/* 2A to 3 */}  <div className="absolute bottom-[35%] left-[20%] w-6 h-1 bg-gray-600/50" />

        {/* --- ROOM BUTTONS --- */}
        {/* Show Stage (1A) */}
        <MapButton 
            id={CameraId.ShowStage} 
            currentCamera={currentCamera} 
            onSelect={onSwitchCamera} 
            style={{ top: '0%', left: '38%' }} 
        />

        {/* Dining Area (1B) - Large Central Room */}
        <MapButton
            id={CameraId.DiningArea}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            className="w-[120px] h-[60px]"
            style={{ top: '18%', left: '28%' }}
        />

        {/* Backstage (5) */}
        <MapButton 
            id={CameraId.Backstage}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ top: '25%', left: '5%' }} 
        />

        {/* Pirate Cove (1C) */}
        <MapButton 
            id={CameraId.PirateCove}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ top: '50%', left: '8%', height: '40px' }} 
        />

        {/* Restrooms (7) */}
        <MapButton 
            id={CameraId.Restrooms}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ top: '25%', right: '5%' }} 
        />

        {/* Kitchen (6) */}
        <MapButton 
            id={CameraId.Kitchen}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ top: '55%', right: '5%' }} 
        />

        {/* Supply Closet (3) */}
        <MapButton 
            id={CameraId.SupplyCloset}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ bottom: '25%', left: '2%' }} 
        />

        {/* West Hall (2A) */}
        <MapButton 
            id={CameraId.WestHall}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ bottom: '28%', left: '28%' }} 
        />

        {/* West Hall Corner (2B) */}
        <MapButton 
            id={CameraId.WestHallCorner}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ bottom: '10%', left: '28%' }} 
        />

        {/* East Hall (4A) */}
        <MapButton 
            id={CameraId.EastHall}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ bottom: '28%', right: '28%' }} 
        />

        {/* East Hall Corner (4B) */}
        <MapButton 
            id={CameraId.EastHallCorner}
            currentCamera={currentCamera}
            onSelect={onSwitchCamera}
            style={{ bottom: '10%', right: '28%' }} 
        />

        {/* YOU Marker */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-8 bg-transparent border border-white/30 text-xs flex items-center justify-center text-white/50">
            YOU
            <div className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse" />
        </div>
      </div>

      {/* Close Button */}
      <div className="h-16 w-full flex items-center justify-center absolute bottom-0 left-0 right-0 z-50">
        <button 
            onClick={onToggleMonitor}
            className="w-[600px] h-full bg-gray-700 border-t-4 border-gray-400 flex flex-col items-center justify-center group hover:bg-gray-600 transition-colors shadow-lg"
        >
             <div className="w-1/2 h-2 bg-gray-400 group-hover:bg-white rounded-full mb-1" />
             <span className="text-black/50 font-bold uppercase tracking-[0.2em] text-sm group-hover:text-white/80">Close Monitor</span>
        </button>
      </div>
    </div>
  );
};

export default CameraSystem;