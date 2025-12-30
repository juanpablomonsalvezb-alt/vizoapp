
import React from 'react';
import { AppView, ThemeVibe } from '../types';

interface SidebarProps {
  currentTheme: ThemeVibe;
  onThemeChange: (theme: ThemeVibe) => void;
  onNavigate: (view: AppView) => void;
  onToggleTranslator: () => void;
  currentView: AppView;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTheme, onThemeChange, onNavigate, onToggleTranslator, currentView }) => {
  
  const handleLogout = () => {
    localStorage.setItem('vizo-auth', 'false');
    window.location.reload(); // Forma sencilla de resetear el estado global
  };

  return (
    <aside className="w-72 h-full glass-panel border-r border-white/5 flex flex-col p-6 z-30">
      <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => onNavigate(AppView.LANDING)}>
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(19,109,236,0.4)]">
          <span className="material-symbols-outlined text-white text-2xl filled">spa</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">Vizo</h2>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 px-3">NAVEGACIÓN</p>
        <NavItem 
          active={currentView === AppView.DASHBOARD} 
          icon="timer" 
          label="Focus Zone" 
          onClick={() => onNavigate(AppView.DASHBOARD)} 
        />
        <NavItem 
          active={currentView === AppView.HISTORY}
          icon="bar_chart" 
          label="Estadísticas" 
          onClick={() => onNavigate(AppView.HISTORY)} 
        />
        <NavItem 
          active={currentView === AppView.INTEGRATIONS}
          icon="hub" 
          label="Integraciones" 
          onClick={() => onNavigate(AppView.INTEGRATIONS)} 
        />
        <NavItem 
          icon="translate" 
          label="Traductor IA" 
          onClick={onToggleTranslator} 
        />
        
        <div className="my-8 h-px bg-white/5 mx-3"></div>
        
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 px-3">ESTILO & AMBIENTE</p>
        <VibeSelector 
          id={ThemeVibe.PROFESSIONAL} 
          label="Profesional" 
          color="#136dec" 
          active={currentTheme === ThemeVibe.PROFESSIONAL} 
          onClick={() => onThemeChange(ThemeVibe.PROFESSIONAL)} 
        />
        <VibeSelector 
          id={ThemeVibe.LOFI} 
          label="Lo-Fi Relax" 
          color="#f97316" 
          active={currentTheme === ThemeVibe.LOFI} 
          onClick={() => onThemeChange(ThemeVibe.LOFI)} 
        />
        <VibeSelector 
          id={ThemeVibe.KPOP} 
          label="K-Pop Focus" 
          color="#d946ef" 
          active={currentTheme === ThemeVibe.KPOP} 
          onClick={() => onThemeChange(ThemeVibe.KPOP)} 
        />
        <VibeSelector 
          id={ThemeVibe.JUVENILE} 
          label="Juvenil" 
          color="#10b981" 
          active={currentTheme === ThemeVibe.JUVENILE} 
          onClick={() => onThemeChange(ThemeVibe.JUVENILE)} 
        />
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
        <div 
          onClick={() => onNavigate(AppView.SETTINGS)}
          className={`flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 cursor-pointer transition-all group ${currentView === AppView.SETTINGS ? 'bg-white/5' : ''}`}
        >
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="w-10 h-10 rounded-full border-2 border-white/10" alt="Profile" />
          <div className="flex-1 min-w-0">
             <p className="text-sm font-bold truncate text-white">Admin Vizo</p>
             <p className="text-[10px] text-emerald-400 font-black uppercase tracking-tight">Administrador</p>
          </div>
          <span className={`material-symbols-outlined text-gray-500 text-lg ${currentView === AppView.SETTINGS ? 'text-primary' : ''}`}>settings</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all border border-transparent ${
      active ? 'bg-primary/10 text-primary border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={`material-symbols-outlined ${active ? 'filled' : ''}`}>{icon}</span>
    <span className="text-sm font-bold">{label}</span>
  </button>
);

const VibeSelector = ({ id, label, color, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all border ${
      active ? 'bg-white/10 border-white/10' : 'border-transparent hover:bg-white/5 text-gray-500 hover:text-gray-300'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div>
      <span className="text-sm font-bold">{label}</span>
    </div>
    {active && <span className="material-symbols-outlined text-primary text-lg filled">check_circle</span>}
  </button>
);

export default Sidebar;
