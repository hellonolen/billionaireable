import React from 'react';
import { Play, Lock } from 'lucide-react';
import { STUDIO_CONTENT } from '../constants';

const Studio: React.FC = () => {
  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-12 animate-fade-in">
      
      <div className="mb-16">
         <h1 className="font-serif text-8xl md:text-9xl font-black text-black tracking-tighter leading-none mb-6">STUDIO</h1>
         <p className="font-mono text-gray-400 font-bold uppercase tracking-widest text-xl">Masterclasses /// Archives /// Dialogues</p>
      </div>

      {/* Hero */}
      <div className="relative w-full bg-art-orange rounded-[48px] h-[600px] mb-16 p-8 md:p-16 flex flex-col justify-end shadow-soft-xl group cursor-pointer overflow-hidden">
        {/* Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 C30,20 70,20 100,0 L100,100 C70,80 30,80 0,100 Z" fill="black"/>
             </svg>
        </div>
        
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 max-w-2xl rounded-[32px] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
                <span className="bg-black text-white px-3 py-1 rounded-full font-mono text-xs uppercase font-bold">New Release</span>
                <span className="font-mono text-xs font-bold uppercase text-gray-500">1h 24m</span>
            </div>
            <h2 className="font-sans text-5xl font-black text-black uppercase leading-[0.9] mb-4">Psychology of Scale</h2>
            <p className="font-serif text-2xl text-gray-500 mb-8">"We didn't build for next year. We built for the next century."</p>
            <div className="flex items-center gap-4">
                <button className="bg-black text-white px-8 py-4 rounded-full font-mono font-bold uppercase hover:bg-art-blue transition-colors flex items-center gap-3">
                    <Play className="w-4 h-4 fill-current" /> Watch Now
                </button>
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {STUDIO_CONTENT.map((item) => (
            <div key={item.id} className={`group relative rounded-[40px] p-8 h-[450px] flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${item.thumbnailColor}`}>
                {/* Soft overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
                
                <div className="relative z-10 flex justify-between items-start">
                    <span className="font-mono text-xs font-bold bg-white/30 backdrop-blur-md text-black px-3 py-1 rounded-full uppercase">{item.category}</span>
                    {item.locked && (
                        <div className="bg-black/20 backdrop-blur-md text-black p-2 rounded-full">
                            <Lock className="w-4 h-4" />
                        </div>
                    )}
                </div>
                
                <div className="relative z-10 mt-auto">
                     <h3 className="font-serif text-4xl font-black text-black leading-[0.95] mb-4">{item.title}</h3>
                     <div className="border-t border-black/10 pt-4 flex justify-between items-end">
                        <p className="font-sans text-lg font-bold uppercase tracking-wide text-black/60">{item.guest}</p>
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                            <Play className="w-5 h-5 fill-current ml-1" />
                        </div>
                     </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Studio;