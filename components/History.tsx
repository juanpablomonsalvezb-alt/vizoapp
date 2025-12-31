
import React from 'react';
import { AppView, HistoryEvent } from '../types';

interface HistoryProps {
  onNavigate: (view: AppView) => void;
  events: HistoryEvent[];
}

// Función para agrupar eventos por fecha
const groupEventsByDate = (events: HistoryEvent[]) => {
  const grouped: { [key: string]: HistoryEvent[] } = {};

  events.forEach(event => {
    const eventDate = new Date(event.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dayKey: string;

    if (eventDate.toDateString() === today.toDateString()) {
      dayKey = 'Hoy';
    } else if (eventDate.toDateString() === yesterday.toDateString()) {
      dayKey = 'Ayer';
    } else {
      dayKey = eventDate.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }

    if (!grouped[dayKey]) {
      grouped[dayKey] = [];
    }
    grouped[dayKey].push(event);
  });

  return grouped;
};


const History: React.FC<HistoryProps> = ({ onNavigate, events }) => {

  const groupedEvents = groupEventsByDate(events);

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
          {Object.entries(groupedEvents).map(([date, dateEvents]) => (
            <section key={date}>
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black capitalize">{date}</h2>
              </div>
              <div className="space-y-2">
                {dateEvents.map((ev) => (
                  <HistoryItem key={ev.id} {...ev} />
                ))}
              </div>
            </section>
          ))}

          {events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No hay eventos todavía. ¡Completa una tarea o una sesión de enfoque para empezar!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ type, title, description, timestamp }: HistoryEvent) => {
  const getIcon = () => {
    switch(type) {
      case 'task': return 'check_circle';
      case 'session': return 'timer';
      case 'theme': return 'palette';
      default: return 'settings_suggest';
    }
  };
  
  const getColor = () => {
    switch(type) {
      case 'task': return 'text-emerald-400';
      case 'session': return 'text-primary';
      case 'theme': return 'text-fuchsia-400';
      default: return 'text-gray-500';
    }
  };
  
  const time = new Date(timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

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
          <p className="text-sm text-gray-500 font-medium">{description}</p>
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
