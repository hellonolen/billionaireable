import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowRight } from 'lucide-react';

const Oracle: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("Awaiting Input");

  useEffect(() => {
    if (isListening) {
        setText("Listening...");
    } else {
        setText("Awaiting Input");
    }
  }, [isListening]);

  return (
    <div className="min-h-[80vh] flex flex-col relative overflow-hidden rounded-[48px] m-4 md:m-12 bg-art-yellow shadow-soft-xl">
      
      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[48px]">
         <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/20 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/20 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center z-10 px-4 relative">
         {/* Breathing Circle */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-black/5 transition-all duration-1000 ${isListening ? 'scale-110 opacity-100 border-black/20' : 'scale-100 opacity-50'}`}></div>
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-black/10 transition-all duration-1000 delay-100 ${isListening ? 'scale-110 opacity-100' : 'scale-100 opacity-50'}`}></div>
         
         <h1 className="font-serif text-[5vw] leading-none font-black text-black text-center tracking-tight select-none mb-12">
            {text}
         </h1>
         
         <div>
            <button 
                onClick={() => setIsListening(!isListening)}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-[40px] flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-black text-white shadow-none scale-95' : 'bg-white text-black shadow-soft-xl hover:-translate-y-2 hover:shadow-2xl'}`}
            >
                {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>
         </div>
      </div>

      <div className="bg-white/30 backdrop-blur-md py-8 px-8 md:px-16 z-20 border-t border-white/20">
         <p className="font-mono text-[10px] mb-6 uppercase tracking-[0.2em] text-black/60 font-bold">Scenario Simulations</p>
         <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between">
            {['Simulate Market Crash', 'Stress Test Liquidity', 'Model Tax Migration'].map((p, i) => (
                <button key={i} className="text-left font-serif text-2xl hover:text-white transition-colors flex items-center gap-4 group w-full md:w-auto">
                    <span className="opacity-30 group-hover:opacity-100 transition-opacity font-sans font-bold text-lg">0{i+1}</span> 
                    {p} 
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Oracle;