
import React from 'react';
import { AppView } from '../types';

interface HistoryProps {
  onNavigate: (view: AppView) => void;
}

const History: React.FC<HistoryProps> = ({ onNavigate }) => {
  const events = [
    { type: 'session', title: 'Bloque de Enfoque', desc: 'Desarrollo Frontend (45 min)', time: '12:30', date: 'Hoy' },
    { type: 'task', title: 'Tarea Finalizada', desc: 'Corrección de bugs en Dashboard', time: '11:15', date: 'Hoy' },
    { type: 'settings', title: 'Tema Actualizado', desc: 'Cambiado a Juvenil', time: '09:00', date: 'Hoy' },
    { type: 'session', title: 'Descanso Corto', desc: 'Meditación Guiada (5 min)', time: '16:45', date: 'Ayer' },
  ];

  return (
    <div className="h-full w-full bg-[#111418] overflow-y-auto p-10 lg:p-20 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-end justify-between mb-20 px-4">
           <div>
              <button 
                onClick={() => onNavigate(AppView.DASHBOARD)} 
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 font-black text-xs uppercase tracking-widest"
              >
                 <span className="material-symbols-outlined text-sm">arrow_back</span>
                 Dashboard
              </button>
              <h1 className="text-5xl font-black mb-3 tracking-tighter">Tu Línea de Tiempo</h1>
              <p className="text-gray-500 text-lg">Un registro visual de cada minuto invertido en tu futuro.</p>
           </div>
           <button className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 font-black text-xs uppercase transition-all shadow-xl">
              <span className="material-symbols-outlined">analytics</span>
              Generar Reporte
           </button>
        </header>

        <div className="space-y-12">
           <section>
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                 <h2 className="text-2xl font-black">Hoy</h2>
                 <span className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">24 DE OCTUBRE</span>
              </div>
              <div className="space-y-2">
                {events.filter(e => e.date === 'Hoy').map((ev, i) => (
                  <HistoryItem key={i} {...ev} />
                ))}
              </div>
           </section>

           <section>
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                 <h2 className="text-2xl font-black opacity-50">Ayer</h2>
                 <span className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">23 DE OCTUBRE</span>
              </div>
              <div className="space-y-2">
                {events.filter(e => e.date === 'Ayer').map((ev, i) => (
                  <HistoryItem key={i} {...ev} />
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ type, title, desc, time }: any) => {
  const getIcon = () => {
    switch(type) {
      case 'task': return 'check_circle';
      case 'session': return 'timer';
      default: return 'settings_suggest';
    }
  };
  
  const getColor = () => {
    switch(type) {
      case 'task': return 'text-emerald-400';
      case 'session': return 'text-primary';
      default: return 'text-fuchsia-400';
    }
  };
  
  return (
    <div className="group flex items-center gap-6 p-6 rounded-[2rem] hover:bg-white/5 transition-all border border-transparent hover:border-white/10 cursor-default animate-fade-in">
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 ${getColor()} group-hover:scale-110 transition-all`}>
          <span className="material-symbols-outlined text-2xl">{getIcon()}</span>
       </div>
       <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
             <h4 className="font-black text-gray-200 uppercase text-xs tracking-widest">{title}</h4>
             <span className="text-[10px] font-bold text-gray-600">{time}</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">{desc}</p>
       </div>
       <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-3 text-gray-600 hover:text-white">
             <span className="material-symbols-outlined">chevron_right</span>
          </button>
       </div>
    </div>
  );
};

export default History;
