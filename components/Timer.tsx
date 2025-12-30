
import React, { useState, useEffect, useRef } from 'react';
import { ThemeVibe } from '../types';

interface TimerProps {
  currentTheme: ThemeVibe;
}

const Timer: React.FC<TimerProps> = ({ currentTheme }) => {
  const FOCUS_TIME = 1500; // 25 min
  const BREAK_TIME = 300;  // 5 min
  
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsActive(false);
      // Play a notification sound could go here
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setSeconds(nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = () => {
    setIsActive(false);
    const nextMode = mode === 'focus' ? 'break' : 'focus';
    setMode(nextMode);
    setSeconds(nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalModeSeconds = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  const progress = (seconds / totalModeSeconds) * 100;
  // Perímetro del círculo es 2 * PI * radio. r=45% de 450px aprox. Usamos valor fijo 1256 para el dasharray.
  const strokeDashoffset = 1256 - (1256 * progress) / 100;

  const getThemeColor = () => {
    switch (currentTheme) {
      case ThemeVibe.KPOP: return '#d946ef';
      case ThemeVibe.LOFI: return '#f97316';
      case ThemeVibe.JUVENILE: return '#10b981';
      default: return '#136dec';
    }
  };

  const themeColor = getThemeColor();

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
        {/* Glow dinámico */}
        <div 
          className="absolute inset-0 blur-[120px] opacity-20 rounded-full transition-colors duration-1000"
          style={{ backgroundColor: themeColor }}
        ></div>
        
        {/* Anillo de Progreso */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="50%" cy="50%" r="44%" 
            fill="transparent" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="12"
          />
          <circle 
            cx="50%" cy="50%" r="44%" 
            fill="transparent" 
            stroke={themeColor}
            strokeWidth="12"
            strokeDasharray="1256"
            style={{ 
              strokeDashoffset, 
              transition: 'stroke-dashoffset 1s linear, stroke 1s ease'
            }}
            strokeLinecap="round"
          />
        </svg>

        <div className="relative flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-xl filled" style={{ color: themeColor }}>
              {mode === 'focus' ? 'self_improvement' : 'coffee'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              {mode === 'focus' ? 'Sesión de Enfoque' : 'Descanso'}
            </span>
          </div>
          <h2 className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
            {formatTime(seconds)}
          </h2>
          <div className="mt-8 px-5 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Objetivo: Flujo Continuo
            </p>
          </div>
        </div>

        {/* Controles */}
        <div className="absolute -bottom-6 flex items-center gap-6 glass-panel px-8 py-4 rounded-3xl shadow-2xl border border-white/10">
          <button 
            onClick={resetTimer}
            className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
            title="Reiniciar"
          >
            <span className="material-symbols-outlined text-2xl">restart_alt</span>
          </button>
          
          <button 
            onClick={toggleTimer}
            className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="material-symbols-outlined text-4xl filled">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button 
            onClick={switchMode}
            className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
            title="Siguiente Modo"
          >
            <span className="material-symbols-outlined text-2xl">skip_next</span>
          </button>
        </div>
      </div>

      <div className="mt-24 w-80 md:w-[480px] glass-panel rounded-2xl p-4 flex items-center gap-4 border border-white/10 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
        <span className="material-symbols-outlined text-gray-500">edit_square</span>
        <input 
          type="text" 
          placeholder="¿En qué estás trabajando ahora?" 
          className="bg-transparent border-none focus:ring-0 w-full text-white placeholder-gray-600 text-sm font-bold"
        />
      </div>
    </div>
  );
};

export default Timer;
