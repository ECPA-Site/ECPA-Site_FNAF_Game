import React, { useState, useEffect, useCallback } from 'react';
import { GameState, GameStatus, AnimatronicId, CameraId } from './types';
import { MAX_POWER, HOUR_DURATION_TICKS, TICK_RATE_MS, INITIAL_AI_LEVELS, AI_PATHS } from './constants';
import Office from './components/Office';
import CameraSystem from './components/CameraSystem';
import HUD from './components/HUD';
import StaticEffect from './components/StaticEffect';
import AnimatronicModel from './components/AnimatronicModel';

// --- INITIAL STATE FACTORY ---
const getInitialState = (): GameState => ({
  status: GameStatus.MENU,
  hour: 0,
  timeTicks: 0,
  power: MAX_POWER,
  usage: 1,
  doorLeftOpen: true,
  doorRightOpen: true,
  lightLeftOn: false,
  lightRightOn: false,
  monitorOpen: false,
  currentCamera: CameraId.ShowStage,
  jumpscareTarget: null,
  lastFoxyCheckTick: 0,
  animatronics: {
    [AnimatronicId.Freddy]: { 
      id: AnimatronicId.Freddy, 
      location: CameraId.ShowStage, 
      aiLevel: INITIAL_AI_LEVELS.freddy, 
      movementOpportunity: 0,
      doorWaitTicks: 0,
      foxyStage: 0,
      isRunning: false
    },
    [AnimatronicId.Bonnie]: { 
      id: AnimatronicId.Bonnie, 
      location: CameraId.ShowStage, 
      aiLevel: INITIAL_AI_LEVELS.bonnie, 
      movementOpportunity: 0,
      doorWaitTicks: 0,
      foxyStage: 0,
      isRunning: false
    },
    [AnimatronicId.Chica]: { 
      id: AnimatronicId.Chica, 
      location: CameraId.ShowStage, 
      aiLevel: INITIAL_AI_LEVELS.chica, 
      movementOpportunity: 0,
      doorWaitTicks: 0,
      foxyStage: 0,
      isRunning: false
    },
    [AnimatronicId.Foxy]: { 
      id: AnimatronicId.Foxy, 
      location: CameraId.PirateCove, 
      aiLevel: INITIAL_AI_LEVELS.foxy, 
      movementOpportunity: 0,
      doorWaitTicks: 0,
      foxyStage: 0, // 0: Curtain, 1: Peeking, 2: Out, 3: Running
      isRunning: false
    },
  }
});

const App: React.FC = () => {
  // Initialize with a fresh state object
  const [state, setState] = useState<GameState>(getInitialState());

  // --- AUDIO GENERATOR ---
  const playJumpscareSound = useCallback(() => {
    try {
      // Use window.AudioContext or webkitAudioContext for broader support
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const t = ctx.currentTime;

      // 1. Screech (High pitch saw - piercing)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(600, t);
      osc1.frequency.linearRampToValueAtTime(200, t + 0.3); // Quick slide down
      osc1.frequency.exponentialRampToValueAtTime(50, t + 1.5);
      
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.8, t);
      gain1.gain.exponentialRampToValueAtTime(0.01, t + 1.5);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // 2. Roar (Low pitch square - body)
      const osc2 = ctx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(150, t);
      osc2.frequency.linearRampToValueAtTime(50, t + 0.5);
      // Vibrato
      const vib = ctx.createOscillator();
      vib.frequency.value = 50; 
      const vibGain = ctx.createGain();
      vibGain.gain.value = 50;
      vib.connect(vibGain);
      vibGain.connect(osc2.frequency);
      vib.start(t);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.8, t);
      gain2.gain.exponentialRampToValueAtTime(0.01, t + 2.0);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      // 3. Static/Noise (Chaos)
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(1.0, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 1.0);
      
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // Start all
      osc1.start(t);
      osc2.start(t);
      noise.start(t);

      // Cleanup
      setTimeout(() => {
          ctx.close();
      }, 3000);

    } catch (e) {
      console.error("Audio play failed", e);
    }
  }, []);

  // --- ACTIONS ---
  const toggleDoor = (side: 'left' | 'right') => {
    setState(prev => ({
      ...prev,
      doorLeftOpen: side === 'left' ? !prev.doorLeftOpen : prev.doorLeftOpen,
      doorRightOpen: side === 'right' ? !prev.doorRightOpen : prev.doorRightOpen
    }));
  };

  const toggleLight = (side: 'left' | 'right') => {
    setState(prev => ({
      ...prev,
      // Ensure only one light is on at a time, or toggle off
      lightLeftOn: side === 'left' ? !prev.lightLeftOn : false,
      lightRightOn: side === 'right' ? !prev.lightRightOn : false
    }));
  };

  const toggleMonitor = () => {
    setState(prev => {
      const isOpening = !prev.monitorOpen;
      // If opening monitor and we are on Foxy's camera, update check time
      const newFoxyCheck = (isOpening && prev.currentCamera === CameraId.PirateCove) 
        ? prev.timeTicks 
        : prev.lastFoxyCheckTick;

      return {
        ...prev,
        monitorOpen: isOpening,
        lastFoxyCheckTick: newFoxyCheck,
        // Turning monitor off/on usually affects lights, let's turn off lights to save power/logic
        lightLeftOn: false,
        lightRightOn: false
      };
    });
  };

  const switchCamera = (camId: CameraId) => {
    setState(prev => ({ 
      ...prev, 
      currentCamera: camId,
      // If checking 1C, reset Foxy logic
      lastFoxyCheckTick: camId === CameraId.PirateCove ? prev.timeTicks : prev.lastFoxyCheckTick
    }));
  };

  const startGame = () => {
    // Generate a fresh state for the new game
    setState({ ...getInitialState(), status: GameStatus.PLAYING });
  };

  // --- SOUND TRIGGER ---
  useEffect(() => {
    if (state.status === GameStatus.JUMPSCARE || state.status === GameStatus.POWER_OUT) {
        // Trigger scream
        if (state.status === GameStatus.JUMPSCARE) {
            playJumpscareSound();
        } 
        // Note: Power Out usually has a melody first (Toreador March) then scream, 
        // but for simplicity we'll just handle the scream when the actual kill happens or if it's the final jumpscare.
        // In the logic below, POWER_OUT state is the "darkness" phase. 
        // The actual jumpscare happens when Freddy kills you in the dark.
    }
  }, [state.status, playJumpscareSound]);

  // --- GAME LOOP ---
  useEffect(() => {
    if (state.status !== GameStatus.PLAYING && state.status !== GameStatus.POWER_OUT) return;

    const interval = setInterval(() => {
      setState(current => {
        // --- 0. POWER OUT SEQUENCE LOGIC ---
        if (current.status === GameStatus.POWER_OUT) {
            // In original game: Lights out -> Eyes flicker -> Song -> Darkness -> Jumpscare
            // Simplified here: Lights out -> Random wait -> Jumpscare
            
            // Random chance to trigger the kill
            if (Math.random() < 0.01) { // 1% chance per tick (approx every 10 sec avg)
                 playJumpscareSound();
                 return { ...current, status: GameStatus.JUMPSCARE, jumpscareTarget: AnimatronicId.Freddy };
            }
            return current;
        }

        // --- 1. POWER & USAGE ---
        let usage = 1; 
        if (!current.doorLeftOpen) usage++;
        if (!current.doorRightOpen) usage++;
        if (current.lightLeftOn) usage++;
        if (current.lightRightOn) usage++;
        if (current.monitorOpen) usage++;

        // REDUCED CONSUMPTION: Multiplier 0.15
        const newPower = Math.max(0, current.power - (usage * 0.15)); 
        
        if (newPower <= 0) {
           // POWER OUT SEQUENCE START
           return { 
             ...current, 
             power: 0, 
             status: GameStatus.POWER_OUT, 
             lightLeftOn: false, 
             lightRightOn: false, 
             monitorOpen: false, 
             doorLeftOpen: true, 
             doorRightOpen: true 
            };
        }

        // --- 2. TIME ---
        let newTicks = current.timeTicks + 1;
        let newHour = current.hour;
        if (newTicks % HOUR_DURATION_TICKS === 0) {
          newHour += 1;
        }
        if (newHour === 6) return { ...current, status: GameStatus.WON };

        // --- 3. AI LOGIC ---
        // Create a deep-ish copy to avoid mutating the current state directly if we were using a ref
        const newAnimatronics = { ...current.animatronics };
        let gameOverTarget: AnimatronicId | null = null;
        let powerPenalty = 0;

        // AI Tick Frequency (Every 40 ticks / 4 seconds)
        const isAiTick = newTicks % 40 === 0;

        (Object.keys(newAnimatronics) as AnimatronicId[]).forEach(key => {
            // Clone the individual animatronic object to avoid mutating the previous state's object
            const anim = { ...newAnimatronics[key] };
            newAnimatronics[key] = anim;

            // 3a. FOXY LOGIC
            if (anim.id === AnimatronicId.Foxy) {
                if (anim.isRunning) {
                    // He is currently running down the hall (Stage 3 -> Attack)
                    // Wait about 25 ticks (2.5 seconds) then impact
                    anim.movementOpportunity++;
                    if (anim.movementOpportunity > 25) {
                        if (current.doorLeftOpen) {
                            gameOverTarget = AnimatronicId.Foxy;
                        } else {
                            // Blocked!
                            anim.foxyStage = Math.random() > 0.5 ? 0 : 1; // Reset to cove
                            anim.isRunning = false;
                            anim.movementOpportunity = 0;
                            powerPenalty = 100; // Lose 10% power (100 units)
                        }
                    }
                } else if (isAiTick) {
                    // Check if player hasn't looked at 1C in a while
                    const ticksSinceCheck = newTicks - current.lastFoxyCheckTick;
                    
                    // If ignored for ~15-20 seconds, advance stage
                    if (ticksSinceCheck > 200 && anim.foxyStage < 3) {
                         // Roll to advance
                         if (Math.random() < 0.3) {
                             anim.foxyStage++;
                             if (anim.foxyStage === 3) {
                                 // Start Run
                                 anim.isRunning = true;
                                 anim.movementOpportunity = 0; // Reset for run timer
                                 anim.location = CameraId.WestHall; // For visuals
                             }
                         }
                    } else if (ticksSinceCheck < 50 && anim.foxyStage > 0 && !anim.isRunning) {
                         // Being watched can sometimes slow him (optional lore), usually just stops advancement
                    }
                }
                return;
            }

            // 3b. BONNIE & CHICA & FREDDY LOGIC
            
            // Activation Times
            if (anim.id === AnimatronicId.Bonnie && newHour < 1) return; // 1 AM
            if (anim.id === AnimatronicId.Chica && newHour < 2) return; // 2 AM
            if (anim.id === AnimatronicId.Freddy) return; // Inactive N1

            // --- AT DOOR LOGIC ---
            if (anim.location === 'OFFICE_DOOR_LEFT' || anim.location === 'OFFICE_DOOR_RIGHT') {
                anim.doorWaitTicks++;
                
                // Wait randomly between 10s (100 ticks) and 40s (400 ticks)
                const waitThreshold = 250; 

                if (anim.doorWaitTicks > waitThreshold) {
                    const isLeft = anim.location === 'OFFICE_DOOR_LEFT';
                    const doorOpen = isLeft ? current.doorLeftOpen : current.doorRightOpen;

                    if (doorOpen) {
                        // Kill
                        gameOverTarget = anim.id;
                    } else {
                        // Retreat
                        anim.doorWaitTicks = 0;
                        // Bonnie returns to Dining Area (1B), Chica to Dining Area (1B)
                        anim.location = CameraId.DiningArea;
                    }
                }
                return;
            }

            // --- MOVEMENT LOGIC ---
            if (isAiTick) {
                // RNG Check (1-20)
                const roll = Math.floor(Math.random() * 20) + 1;
                if (roll <= anim.aiLevel) {
                    const path = AI_PATHS[anim.id];
                    const currentIdx = path.indexOf(anim.location as CameraId);

                    if (currentIdx !== -1 && currentIdx < path.length - 1) {
                        // Move forward
                        anim.location = path[currentIdx + 1];
                    } else if (currentIdx === path.length - 1) {
                        // Reached end of path -> Move to Door
                        if (anim.id === AnimatronicId.Bonnie) anim.location = 'OFFICE_DOOR_LEFT';
                        if (anim.id === AnimatronicId.Chica) anim.location = 'OFFICE_DOOR_RIGHT';
                        anim.doorWaitTicks = 0; // Start timer
                    }
                }
            }
        });

        if (gameOverTarget) {
            return { ...current, status: GameStatus.JUMPSCARE, jumpscareTarget: gameOverTarget };
        }

        return {
          ...current,
          power: Math.max(0, newPower - powerPenalty),
          hour: newHour,
          timeTicks: newTicks,
          usage,
          animatronics: newAnimatronics
        };
      });
    }, TICK_RATE_MS);

    return () => clearInterval(interval);
  }, [state.status, playJumpscareSound]);

  // --- RENDER HELPERS ---
  if (state.status === GameStatus.MENU) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center font-[vt323]">
        <StaticEffect opacity={0.1} />
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-pulse text-center tracking-tighter">
          FIVE NIGHTS<br /><span className="text-red-600">AT REACT'S</span>
        </h1>
        <button 
          onClick={startGame}
          className="px-8 py-4 bg-transparent border-2 border-white text-2xl hover:bg-white hover:text-black transition-all cursor-pointer z-50"
        >
          NEW GAME
        </button>
        <div className="mt-8 text-gray-500 text-sm max-w-md text-center">
          <p>Controls: Click DOOR to close, LIGHT to check blind spots.</p>
          <p>Monitor: Click bottom bar. Click Map to switch cameras.</p>
        </div>
      </div>
    );
  }

  if (state.status === GameStatus.WON) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center animate-bounce">
          <h1 className="text-6xl font-bold">6:00 AM</h1>
          <p className="text-2xl mt-4 text-green-500">You Survived.</p>
          <button onClick={() => setState(getInitialState())} className="mt-8 underline z-50 relative pointer-events-auto">Back to Menu</button>
        </div>
      </div>
    );
  }

  if (state.status === GameStatus.JUMPSCARE || (state.status === GameStatus.POWER_OUT && state.jumpscareTarget)) {
    const target = state.jumpscareTarget || AnimatronicId.Freddy;

    return (
      <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden z-[100]">
        
        {/* CSS Jumpscare Model */}
        <div className="transform scale-[5] animate-[ping_0.1s_infinite] origin-center">
            <AnimatronicModel id={target} isJumpscare={true} />
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-900/30 mix-blend-overlay">
             <h1 className="text-9xl font-black text-black opacity-50 tracking-tighter animate-pulse scale-150">SCREAM</h1>
        </div>

        {/* Game Over UI */}
        <div className="absolute bottom-20 z-50 text-center pointer-events-auto">
            <h2 className="text-4xl text-white font-bold mb-4">GAME OVER</h2>
            <button 
                onClick={() => setState(getInitialState())} 
                className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-300 transition-colors uppercase cursor-pointer"
            >
                Try Again
            </button>
        </div>
      </div>
    );
  }

  // DARKNESS STATE (Power Out before Jumpscare)
  if (state.status === GameStatus.POWER_OUT) {
      return (
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden z-[100]">
            {/* Flashing Freddy Face in the dark */}
            <div className="opacity-20 animate-pulse grayscale">
                <AnimatronicModel id={AnimatronicId.Freddy} />
            </div>
            <div className="absolute inset-0 z-50 flex items-center justify-center">
                 {/* Only eyes might be visible in full version, for now just dark */}
            </div>
        </div>
      );
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative select-none font-vt323">
      <div className="scanlines z-50 pointer-events-none" />
      <HUD gameState={state} />
      
      {/* Main View */}
      <Office 
        gameState={state}
        onToggleDoor={toggleDoor}
        onToggleLight={toggleLight}
        onToggleMonitor={toggleMonitor}
      />

      {/* Camera Overlay */}
      {state.monitorOpen && (
        <CameraSystem 
          currentCamera={state.currentCamera}
          onSwitchCamera={switchCamera}
          animatronics={state.animatronics}
          onToggleMonitor={toggleMonitor}
        />
      )}
    </div>
  );
};

export default App;