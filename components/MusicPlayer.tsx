
import React, { useState, useRef, useEffect } from 'react';
import { ThemeVibe } from '../types';

interface MusicPlayerProps {
  currentTheme: ThemeVibe;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTheme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Stream de radio real para que la app sea funcional
  const LOFI_STREAM = "https://hyades.shoutca.st/11410/stream";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="glass-panel p-4 rounded-[2.5rem] flex items-center gap-6 border border-white/10 shadow-2xl animate-fade-in">
      <audio ref={audioRef} src={LOFI_STREAM} crossOrigin="anonymous" />
      
      <div className="relative w-16 h-16 rounded-[1.25rem] overflow-hidden shadow-2xl flex-shrink-0 group">
        <img 
          src="https://images.unsplash.com/photo-1514525253344-7814d9994a80?auto=format&fit=crop&q=80&w=200" 
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] linear ${isPlaying ? 'scale-150 rotate-12' : 'scale-100'}`} 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {isPlaying ? (
             <div className="flex items-end gap-1 h-5">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-1 bg-white rounded-full animate-bounce" style={{ height: `${Math.random()*100}%`, animationDuration: `${0.4 + i*0.1}s` }} />
               ))}
             </div>
          ) : (
             <span className="material-symbols-outlined text-white/50">music_note</span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
           <span className="text-[9px] font-black bg-primary text-white px-2 py-0.5 rounded-sm">LIVE</span>
           <h4 className="text-xs font-black uppercase tracking-widest text-white truncate">Vizo Ambient Radio</h4>
        </div>
        <p className="text-[10px] font-bold text-gray-500 truncate uppercase">Lo-Fi & Deep Focus Beats</p>
      </div>

      <div className="flex items-center gap-4 pr-2">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <span className="material-symbols-outlined text-3xl filled">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        <div className="h-10 w-px bg-white/10 hidden md:block"></div>

        <div className="hidden md:flex items-center gap-3 px-2">
           <span className="material-symbols-outlined text-gray-500 text-lg">volume_down</span>
           <input 
              type="range" min="0" max="1" step="0.01" value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-primary bg-white/10 rounded-full appearance-none cursor-pointer"
           />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
