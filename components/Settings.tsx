
import React from 'react';
import { AppView } from '../types';

interface SettingsProps {
  onNavigate: (view: AppView) => void;
  config: {
    highContrast: boolean;
    fontSize: number;
    reduceMotion: boolean;
  };
  onConfigChange: (newConfig: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, config, onConfigChange }) => {
  
  const toggle = (key: string) => {
    onConfigChange({ [key]: !((config as any)[key]) });
  };

  return (
    <div className="h-full w-full bg-[#111418] overflow-y-auto p-10 lg:p-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 animate-fade-in">
          <button onClick={() => onNavigate(AppView.DASHBOARD)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-gray-400 mb-8 border border-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-5xl font-black mb-4 tracking-tighter">Panel de Control</h1>
          <p className="text-gray-500 text-lg">Personaliza tu experiencia y optimiza tu entorno de trabajo.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-panel p-10 rounded-[2.5rem] border border-white/10 shadow-2xl animate-fade-in">
              <h2 className="text-xl font-black mb-10 flex items-center gap-4">
                 <div className="p-2 rounded-xl bg-primary/20 text-primary">
                    <span className="material-symbols-outlined filled">visibility</span>
                 </div>
                 Preferencias de Interfaz
              </h2>
              <div className="space-y-10">
                 <ToggleOption 
                   label="Modo de Alto Contraste" 
                   desc="Aumenta el contraste entre el texto y el fondo para mejor legibilidad." 
                   active={config.highContrast}
                   onClick={() => toggle('highContrast')}
                 />
                 <div className="space-y-5">
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-gray-200">Escala de Interfaz</span>
                       <span className="text-primary font-black px-3 py-1 bg-primary/10 rounded-lg">{config.fontSize}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" max="140" step="5"
                      value={config.fontSize}
                      onChange={(e) => onConfigChange({ fontSize: parseInt(e.target.value) })}
                      className="w-full accent-primary bg-white/10 rounded-full h-2 appearance-none cursor-pointer" 
                    />
                 </div>
                 <ToggleOption 
                   label="Reducir Movimiento" 
                   desc="Desactiva las animaciones de fondo y transiciones pesadas." 
                   active={config.reduceMotion}
                   onClick={() => toggle('reduceMotion')}
                 />
              </div>
            </section>
          </div>

          <div className="space-y-6">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600 px-4">Estado de Sincronización</h3>
             <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] sticky top-10">
                <div className="h-44 bg-gradient-to-br from-primary to-indigo-900 flex items-end p-8 relative overflow-hidden">
                   <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">cloud_done</span>
                   </div>
                   <h4 className="text-3xl font-black leading-none text-white">Config.<br/>Activa</h4>
                </div>
                <div className="p-8 space-y-6">
                   <p className="text-gray-400 text-sm leading-relaxed">
                     Los cambios realizados se aplican de forma instantánea a tu perfil de Administrador.
                   </p>
                   <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-400 filled">verified_user</span>
                      </div>
                      <div>
                         <p className="text-sm font-black">Perfil: Admin</p>
                         <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Sesión Segura</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => onNavigate(AppView.DASHBOARD)}
                    className="w-full py-4 bg-primary rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors"
                   >
                     Regresar al Dashboard
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleOption = ({ label, desc, active, onClick }: any) => (
  <div className="flex items-center justify-between group cursor-pointer" onClick={onClick}>
    <div className="flex-1 pr-10">
      <p className="font-black mb-1 group-hover:text-primary transition-colors">{label}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
    <div className={`w-14 h-7 rounded-full relative transition-all duration-300 border-2 ${active ? 'bg-primary border-primary' : 'bg-gray-800 border-gray-700'}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 ${active ? 'left-[calc(100%-1.5rem)]' : 'left-1'}`} />
    </div>
  </div>
);

export default Settings;
