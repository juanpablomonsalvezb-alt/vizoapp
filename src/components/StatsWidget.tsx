
import React from 'react';

const StatsWidget: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl shadow-xl border border-white/10 flex flex-col gap-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
             <span className="material-symbols-outlined text-lg">insights</span>
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-300">Progreso</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
           <span className="material-symbols-outlined text-xs text-orange-400 filled">local_fire_department</span>
           <span className="text-[10px] font-black text-orange-400">12 DÍAS RACHA</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Hoy" value="4h 20m" progress={70} color="#136dec" />
        <StatCard label="Tareas" value="8/10" progress={80} color="#10b981" />
      </div>

      <div className="flex items-end gap-1.5 h-16 pt-2">
         {[30, 50, 40, 70, 90, 20, 10].map((h, i) => (
           <div 
             key={i} 
             className={`flex-1 rounded-t-md transition-all duration-500 hover:opacity-80 cursor-help ${i === 4 ? 'bg-primary' : 'bg-white/5'}`} 
             style={{ height: `${h}%` }}
             title={`Day ${i+1}`}
           />
         ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, progress, color }: any) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col gap-2">
    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{label}</p>
    <p className="text-xl font-black">{value}</p>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
       <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: color }} />
    </div>
  </div>
);

export default StatsWidget;
