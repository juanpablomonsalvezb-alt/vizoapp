
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

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

  const addTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputValue,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="h-full glass-panel rounded-[2rem] flex flex-col overflow-hidden shadow-2xl border border-white/10">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">fact_check</span>
          </div>
          <h3 className="font-bold tracking-tight uppercase text-xs tracking-[0.2em] text-gray-300">Objetivos Hoy</h3>
        </div>
        <div className="px-2 py-1 rounded-md bg-white/5 border border-white/5">
           <span className="text-[10px] font-black text-primary">
             {tasks.filter(t => !t.completed).length} RESTANTES
           </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5 animate-fade-in"
          >
            <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center flex-shrink-0 ${
              task.completed ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-gray-700 group-hover:border-primary'
            }`}>
              {task.completed && <span className="material-symbols-outlined text-[16px] text-white font-black">check</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                {task.text}
              </p>
              {task.dueDate && (
                <span className="text-[9px] font-black text-primary/60 uppercase">Vence {task.dueDate}</span>
              )}
            </div>
            <button 
              onClick={(e) => removeTask(task.id, e)}
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-600 hover:text-red-400 transition-all"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-20">
             <span className="material-symbols-outlined text-6xl mb-2">auto_awesome</span>
             <p className="text-sm font-bold">¡Todo despejado!</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/30 border-t border-white/5">
        <form onSubmit={addTask} className="relative">
           <input 
             type="text" 
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Añadir nueva meta..."
             className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-4 pr-14 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary outline-none transition-all"
           />
           <button 
            type="submit"
            className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
           >
              <span className="material-symbols-outlined">add</span>
           </button>
        </form>
      </div>
    </div>
  );
};

export default TaskList;
