
import React, { useState, useEffect } from 'react';
import { ThemeVibe, AppView, Task, HistoryEvent } from '../types';
import Sidebar from './Sidebar';
import Timer from './Timer';
import TaskList from './TaskList';
import MusicPlayer from './MusicPlayer';
import StatsWidget from './StatsWidget';
import TranslatorPanel from './TranslatorPanel';
import BreakBrainstorm from './BreakBrainstorm';

interface DashboardProps {
  currentTheme: ThemeVibe;
  onThemeChange: (theme: ThemeVibe) => void;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  addHistoryEvent: (event: Omit<HistoryEvent, 'id' | 'timestamp'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentTheme, onThemeChange, onNavigate, onLogout, addHistoryEvent }) => {
  const [activeRightPanel, setActiveRightPanel] = useState<'tasks' | 'translator'>('tasks');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInputValue, setTaskInputValue] = useState('');

  // Cargar tareas al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('vizo-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        setTasks([]);
      }
    } else {
      setTasks([
        { id: '1', text: 'Optimizar Core Web Vitals', completed: true },
        { id: '2', text: 'Revisar integración Gemini API', completed: false, dueDate: '14:00' },
      ]);
    }
  }, []);

  // Guardar tareas cuando cambien
  useEffect(() => {
    localStorage.setItem('vizo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: text,
      completed: false
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    addHistoryEvent({ type: 'task', title: 'Tarea Creada', description: text });
  };

  const handleTaskFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    addTask(taskInputValue);
    setTaskInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        if (!t.completed) {
          addHistoryEvent({ type: 'task', title: 'Tarea Completada', description: t.text });
        }
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const removeTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
  };


  const getBgStyle = () => {
    switch (currentTheme) {
      case ThemeVibe.KPOP: return "bg-gradient-to-br from-fuchsia-900/40 via-indigo-950 to-black";
      case ThemeVibe.LOFI: return "bg-gradient-to-br from-orange-900/30 via-background-dark to-black";
      case ThemeVibe.JUVENILE: return "bg-gradient-to-br from-emerald-900/30 via-background-dark to-black";
      default: return "bg-background-dark";
    }
  };

  const getOverlayVideo = () => {
    if (currentTheme === ThemeVibe.LOFI) return "https://assets.mixkit.co/videos/preview/mixkit-coffee-cup-on-a-wooden-table-1175-large.mp4";
    if (currentTheme === ThemeVibe.KPOP) return "https://assets.mixkit.co/videos/preview/mixkit-bright-neon-city-lights-at-night-11913-large.mp4";
    if (currentTheme === ThemeVibe.JUVENILE) return "https://assets.mixkit.co/videos/preview/mixkit-floating-pink-and-purple-smoke-background-34538-large.mp4";
    return "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-coding-screen-in-a-dark-room-42533-large.mp4";
  };

  return (
    <div className={`h-full w-full flex relative overflow-hidden text-white transition-all duration-1000 ${getBgStyle()}`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          key={currentTheme}
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-50 mix-blend-screen scale-110"
        >
          <source src={getOverlayVideo()} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background-dark/40"></div>
      </div>

      <Sidebar 
        currentTheme={currentTheme} 
        onThemeChange={onThemeChange} 
        onNavigate={onNavigate}
        currentView={AppView.DASHBOARD}
        onToggleTranslator={() => setActiveRightPanel(prev => prev === 'translator' ? 'tasks' : 'translator')}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col relative z-10">
        <header className="flex justify-between items-center p-8 animate-fade-in">
           <div className="flex items-center gap-4">
              <div className="glass-panel px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Cloud Sync</p>
                    <p className="text-xs font-bold">Estado: En línea</p>
                 </div>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="glass-panel px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Madrid, ES</p>
                    <p className="text-sm font-black">24°C Despejado</p>
                 </div>
                 <span className="material-symbols-outlined text-orange-400 filled text-2xl">wb_sunny</span>
              </div>
              <button className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                <span className="material-symbols-outlined">notifications</span>
              </button>
           </div>
        </header>

        <div className="flex-1 flex items-center justify-center -mt-20">
           <Timer currentTheme={currentTheme} onAddTask={addTask} addHistoryEvent={addHistoryEvent} />
        </div>

        <div className="p-10 flex items-end justify-between gap-10">
           <div className="w-80 shrink-0">
              <StatsWidget />
           </div>
           <div className="flex-1 max-w-md">
              <MusicPlayer currentTheme={currentTheme} />
           </div>
        </div>
      </main>

      <aside className="w-96 p-8 relative z-20 hidden 2xl:flex flex-col gap-6 h-full border-l border-white/5 glass-panel">
         <div className="flex gap-2 p-1.5 bg-black/40 rounded-2xl mb-2">
            <button 
              onClick={() => setActiveRightPanel('tasks')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${activeRightPanel === 'tasks' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>
              Tareas
            </button>
            <button 
              onClick={() => setActiveRightPanel('translator')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${activeRightPanel === 'translator' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>
              Traductor
            </button>
         </div>
         
         <div className="flex-1 overflow-hidden space-y-6">
            <div className="h-[60%] overflow-hidden">
               {activeRightPanel === 'tasks' ? (
                  <TaskList 
                    tasks={tasks}
                    inputValue={taskInputValue}
                    onInputChange={setTaskInputValue}
                    onTaskSubmit={handleTaskFormSubmit}
                    onToggleTask={toggleTask}
                    onRemoveTask={removeTask}
                  />
                ) : <TranslatorPanel onClose={() => setActiveRightPanel('tasks')} />}
            </div>
            <div className="h-[40%]">
               <BreakBrainstorm />
            </div>
         </div>
      </aside>
    </div>
  );
};

export default Dashboard;
