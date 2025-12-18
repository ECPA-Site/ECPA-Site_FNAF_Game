import React from 'react';
import { AnimatronicId } from '../types';

interface AnimatronicModelProps {
  id: AnimatronicId;
  className?: string;
  isJumpscare?: boolean;
}

const AnimatronicModel: React.FC<AnimatronicModelProps> = ({ id, className = "", isJumpscare = false }) => {
  
  // Dynamic classes for jumpscare state (glowing eyes, aggressive stance)
  const eyeGlowClass = isJumpscare ? "animate-ping opacity-75" : "animate-pulse";
  const jawClass = isJumpscare ? "translate-y-4" : "";

  switch (id) {
    case AnimatronicId.Freddy:
        return (
            <div className={`w-24 h-40 relative filter drop-shadow-xl select-none ${className}`}>
                {/* Top Hat */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-10 bg-gradient-to-r from-black via-gray-900 to-black rounded-sm z-30">
                    <div className="absolute bottom-2 w-full h-2 bg-black opacity-50" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-black rounded-full z-30" />
                
                {/* Ears */}
                <div className="absolute -top-2 left-0 w-8 h-8 bg-amber-900 rounded-full border-4 border-amber-950 shadow-inner" />
                <div className="absolute -top-2 right-0 w-8 h-8 bg-amber-900 rounded-full border-4 border-amber-950 shadow-inner" />

                {/* Head Shape */}
                <div className="w-24 h-24 bg-gradient-to-b from-amber-800 to-amber-950 rounded-2xl relative shadow-[inset_0_-5px_10px_rgba(0,0,0,0.5)] z-20">
                    {/* Eyes (Blue/White standard) */}
                    <div className="absolute top-8 left-5 w-5 h-5 bg-black rounded-full border-2 border-gray-800 flex items-center justify-center overflow-hidden">
                         <div className={`w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_5px_cyan] ${eyeGlowClass}`} />
                    </div>
                    <div className="absolute top-8 right-5 w-5 h-5 bg-black rounded-full border-2 border-gray-800 flex items-center justify-center overflow-hidden">
                         <div className={`w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_5px_cyan] ${eyeGlowClass}`} />
                    </div>
                    {/* Eyebrows */}
                    <div className={`absolute top-6 left-4 w-6 h-2 bg-black rotate-6 rounded-full transition-transform ${isJumpscare ? 'rotate-12 translate-y-1' : ''}`} />
                    <div className={`absolute top-6 right-4 w-6 h-2 bg-black -rotate-6 rounded-full transition-transform ${isJumpscare ? '-rotate-12 translate-y-1' : ''}`} />

                    {/* Snout */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-14 h-10 bg-amber-700 rounded-full border border-amber-900 flex flex-col items-center justify-center">
                        {/* Nose */}
                        <div className="w-6 h-3 bg-black rounded-full mb-1" />
                        {/* Freckles */}
                        <div className="flex gap-4">
                            <div className="flex gap-1"><div className="w-0.5 h-0.5 bg-black"/><div className="w-0.5 h-0.5 bg-black"/></div>
                            <div className="flex gap-1"><div className="w-0.5 h-0.5 bg-black"/><div className="w-0.5 h-0.5 bg-black"/></div>
                        </div>
                    </div>

                    {/* Jaw */}
                    <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-amber-800 rounded-b-xl border-t-4 border-black transition-transform duration-75 ${jawClass}`} />
                </div>

                {/* Body/Bowtie */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-24 bg-amber-900 rounded-t-xl z-10 pt-2 flex justify-center">
                     {/* Bowtie */}
                     <div className="z-20 flex flex-col items-center">
                         <div className="w-3 h-3 bg-black rounded-full z-10" />
                         <div className="absolute top-2 flex">
                             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent" />
                             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-black border-b-[8px] border-b-transparent" />
                         </div>
                     </div>
                     {/* Buttons */}
                     <div className="absolute top-12 w-3 h-3 bg-black rounded-full" />
                     <div className="absolute top-16 w-3 h-3 bg-black rounded-full" />
                </div>
            </div>
        );

    case AnimatronicId.Bonnie:
        return (
            <div className={`w-24 h-40 relative filter drop-shadow-xl select-none ${className}`}>
                {/* Ears */}
                <div className="absolute -top-16 left-2 w-8 h-24 bg-indigo-900 rounded-full border-2 border-indigo-950 origin-bottom -rotate-6 flex justify-center z-0">
                    <div className="mt-4 w-4 h-16 bg-pink-300/50 rounded-full" />
                </div>
                <div className="absolute -top-16 right-2 w-8 h-24 bg-indigo-900 rounded-full border-2 border-indigo-950 origin-bottom rotate-6 flex justify-center z-0">
                     <div className="mt-4 w-4 h-16 bg-pink-300/50 rounded-full" />
                     {/* Fold effect */}
                     <div className="absolute top-0 w-full h-8 bg-black/20 rounded-t-full" />
                </div>

                {/* Head */}
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-2xl relative shadow-[inset_0_-5px_15px_rgba(0,0,0,0.6)] z-20">
                    {/* Eyes (Ruby Glow) */}
                    <div className="absolute top-8 left-5 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300">
                         <div className={`w-2 h-2 bg-pink-600 rounded-full shadow-[0_0_8px_red] ${eyeGlowClass}`} />
                    </div>
                    <div className="absolute top-8 right-5 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300">
                         <div className={`w-2 h-2 bg-pink-600 rounded-full shadow-[0_0_8px_red] ${eyeGlowClass}`} />
                    </div>

                    {/* Snout/Muzzle */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-14 h-10 bg-indigo-700 rounded-full opacity-90 flex flex-col items-center pt-1 border border-indigo-900">
                        <div className="w-5 h-3 bg-black rounded-full" />
                        <div className="w-0.5 h-4 bg-black/30 mt-1" />
                    </div>

                    {/* Teeth (Bottom) */}
                    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-12 flex justify-center gap-1 transition-transform ${isJumpscare ? 'translate-y-2 scale-110' : ''}`}>
                         <div className="w-2 h-3 bg-white rounded-t-sm border border-gray-300" />
                         <div className="w-2 h-3 bg-white rounded-t-sm border border-gray-300" />
                         <div className="w-2 h-3 bg-white rounded-t-sm border border-gray-300" />
                    </div>
                </div>

                {/* Body & Bowtie */}
                <div className="absolute top-22 left-1/2 -translate-x-1/2 w-18 h-20 bg-indigo-900 rounded-t-xl z-10 flex justify-center pt-1">
                    {/* Red Bowtie */}
                     <div className="z-20 flex items-center relative top-2">
                         <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-red-600 border-b-[6px] border-b-transparent" />
                         <div className="w-2 h-2 bg-red-800 rounded-full" />
                         <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-red-600 border-b-[6px] border-b-transparent" />
                     </div>
                </div>
            </div>
        );

    case AnimatronicId.Chica:
        return (
            <div className={`w-24 h-36 relative filter drop-shadow-xl select-none ${className}`}>
                {/* Head Feathers */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 z-0">
                    <div className="w-3 h-6 bg-yellow-400 rounded-full -rotate-12" />
                    <div className="w-3 h-8 bg-yellow-400 rounded-full -translate-y-2" />
                    <div className="w-3 h-6 bg-yellow-400 rounded-full rotate-12" />
                </div>

                {/* Head */}
                <div className="w-24 h-24 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full relative shadow-md z-20">
                    {/* Eyes (Purple/Pink Glow) */}
                    <div className="absolute top-8 left-4 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-gray-300">
                         <div className={`w-2 h-2 bg-fuchsia-700 rounded-full shadow-[0_0_5px_magenta] ${eyeGlowClass}`} />
                         {!isJumpscare && <div className="absolute -top-1 w-full h-2 bg-purple-300/50 rounded-t-full" />} {/* Eyelid */}
                    </div>
                    <div className="absolute top-8 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-gray-300">
                         <div className={`w-2 h-2 bg-fuchsia-700 rounded-full shadow-[0_0_5px_magenta] ${eyeGlowClass}`} />
                         {!isJumpscare && <div className="absolute -top-1 w-full h-2 bg-purple-300/50 rounded-t-full" />}
                    </div>
                    {/* Eyebrows */}
                    <div className={`absolute top-5 left-4 w-6 h-2 bg-black/80 rounded-full -rotate-12 ${isJumpscare ? '-rotate-45' : ''}`} />
                    <div className={`absolute top-5 right-4 w-6 h-2 bg-black/80 rounded-full rotate-12 ${isJumpscare ? 'rotate-45' : ''}`} />

                    {/* Beak */}
                    <div className={`absolute top-14 left-1/2 -translate-x-1/2 w-10 flex flex-col items-center drop-shadow-lg transition-transform ${isJumpscare ? 'scale-110' : ''}`}>
                        <div className="w-10 h-6 bg-orange-500 rounded-t-xl" /> {/* Top Beak */}
                        <div className={`w-8 h-3 bg-orange-600 rounded-b-lg border-t border-black/50 transition-transform ${jawClass}`} /> {/* Bottom Beak */}
                        {/* Teeth inside beak */}
                        <div className="absolute bottom-2 w-6 flex justify-between px-1">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Body & Bib */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-16 bg-yellow-500 rounded-t-2xl z-10 flex justify-center">
                    {/* BIB */}
                    <div className="absolute top-1 w-16 h-12 bg-white rounded-b-full border-2 border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                         <div className="text-[4px] font-black text-center text-yellow-500 tracking-tighter leading-tight drop-shadow-[0_0_1px_purple]">
                             LET'S<br/>EAT!!!
                         </div>
                         {/* Confetti */}
                         <div className="absolute top-1 left-2 w-1 h-1 bg-red-500 rounded-full opacity-50" />
                         <div className="absolute bottom-3 right-3 w-1 h-1 bg-green-500 rounded-full opacity-50" />
                         <div className="absolute top-4 right-1 w-1 h-1 bg-blue-500 rounded-full opacity-50" />
                    </div>
                </div>
            </div>
        );

    case AnimatronicId.Foxy:
        return (
            <div className={`w-24 h-40 relative filter drop-shadow-xl select-none ${className}`}>
                {/* Ears (Pointy) */}
                <div className="absolute -top-14 left-1 w-8 h-20 bg-red-900 rounded-t-full origin-bottom -rotate-12 border-l-2 border-black/30 z-0">
                     <div className="absolute bottom-4 left-1 w-4 h-10 bg-black/40 rounded-full blur-[1px]" />
                </div>
                <div className="absolute -top-14 right-1 w-8 h-20 bg-red-900 rounded-t-full origin-bottom rotate-12 border-r-2 border-black/30 z-0">
                     <div className="absolute bottom-4 right-1 w-4 h-10 bg-black/40 rounded-full blur-[1px]" />
                </div>
                {/* Hair Tuft */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-800 rotate-45 z-10" />

                {/* Head */}
                <div className="w-24 h-24 bg-red-900 rounded-b-full rounded-t-2xl relative shadow-[inset_0_-5px_20px_black] z-20">
                     {/* Damage / Holes */}
                     <div className="absolute top-2 left-2 w-3 h-3 bg-black/80 rounded-full border border-gray-600" />
                     <div className="absolute top-6 right-1 w-2 h-4 bg-black/80 rounded-full border border-gray-600 rotate-45" />

                    {/* Eyes */}
                    <div className="absolute top-8 left-5 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_10px_orange]">
                        <div className={`w-1 h-3 bg-black rounded-full ${eyeGlowClass}`} /> {/* Slit pupil */}
                    </div>
                    {/* Eye Patch */}
                    <div className="absolute top-6 right-4 w-9 h-9 bg-black rounded-full border-2 border-gray-800 shadow-xl z-30">
                         <div className="absolute top-1/2 -right-4 w-12 h-1 bg-black -rotate-12 -z-10" /> {/* Strap */}
                         {isJumpscare && <div className="w-full h-full bg-black animate-pulse" />} {/* Eyepatch doesn't move but maybe glows? No keep it dark */}
                    </div>

                    {/* Snout (Long) */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-14 h-12 bg-red-800 rounded-t-lg rounded-b-xl border-x border-red-950 flex flex-col items-center">
                        <div className="w-6 h-4 bg-black rounded-full mb-1" /> {/* Nose */}
                        <div className="flex gap-2 justify-center w-full px-2"> {/* Whiskers spots */}
                            <div className="w-0.5 h-0.5 bg-black" /><div className="w-0.5 h-0.5 bg-black" />
                        </div>
                    </div>
                    
                    {/* Sharp Teeth */}
                    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-12 flex justify-between px-1 transition-transform ${jawClass}`}>
                         <div className="w-2 h-4 bg-yellow-100 clip-path-triangle" style={{clipPath: 'polygon(50% 100%, 0 0, 100% 0)'}} />
                         <div className="w-2 h-4 bg-yellow-100 clip-path-triangle" style={{clipPath: 'polygon(50% 100%, 0 0, 100% 0)'}} />
                         <div className="w-2 h-4 bg-yellow-100 clip-path-triangle" style={{clipPath: 'polygon(50% 100%, 0 0, 100% 0)'}} />
                    </div>
                </div>

                {/* Body & Hook */}
                <div className="absolute top-22 left-1/2 -translate-x-1/2 w-18 h-20 bg-red-900 rounded-t-xl z-10 flex justify-center">
                     <div className="absolute top-4 w-10 h-16 bg-gray-400 opacity-20 rounded-full" /> {/* Chest Piece */}
                     
                     {/* Hook Hand (Right side) */}
                     <div className="absolute top-10 -right-8 w-12 h-12 border-4 border-gray-400 rounded-b-full rounded-r-full border-l-transparent border-t-transparent rotate-45 shadow-sm" />
                     <div className="absolute top-8 -right-4 w-4 h-4 bg-gray-500 rounded-full" /> {/* Hook Base */}
                </div>
            </div>
        );
  }
  return null;
};

export default AnimatronicModel;