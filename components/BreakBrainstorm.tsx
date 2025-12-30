
import React, { useState } from 'react';
import { getBrainstormSuggestion } from '../services/geminiService';

const BreakBrainstorm: React.FC = () => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('');

  const handleGetSuggestion = async () => {
    setLoading(true);
    const result = await getBrainstormSuggestion(context);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-[2rem] border border-white/10 shadow-2xl animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
          <span className="material-symbols-outlined filled">bolt</span>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-white">IA Break Ideas</h3>
          <p className="text-[10px] font-bold text-gray-500 uppercase">Sugerencias inteligentes</p>
        </div>
      </div>

      <div className="space-y-4">
        {!suggestion ? (
          <>
            <input 
              type="text" 
              placeholder="¿Qué estás haciendo? (opcional)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button 
              onClick={handleGetSuggestion}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Obtener idea de descanso
                </>
              )}
            </button>
          </>
        ) : (
          <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-2xl animate-fade-in">
             <p className="text-sm font-bold text-purple-200 leading-relaxed mb-4">"{suggestion}"</p>
             <button 
               onClick={() => setSuggestion('')}
               className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-white transition-colors"
             >
               Probar otra vez
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakBrainstorm;
