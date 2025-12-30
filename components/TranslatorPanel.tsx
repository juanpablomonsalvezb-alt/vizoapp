
import React, { useState } from 'react';
import { translateText } from '../services/geminiService';

interface TranslatorPanelProps {
  onClose: () => void;
}

const TranslatorPanel: React.FC<TranslatorPanelProps> = ({ onClose }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const translation = await translateText(text, 'English');
    setResult(translation);
    setLoading(false);
  };

  return (
    <div className="h-full glass-panel rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-white/10 animate-slide-up">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-lg">translate</span>
          </div>
          <h3 className="font-bold tracking-tight text-white">Traductor</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-gray-500">close</span>
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
        <div className="space-y-2">
           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">TEXTO ORIGINAL</label>
           <textarea 
             className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary focus:bg-white/10 transition-all outline-none resize-none"
             placeholder="Introduce texto aquí..."
             value={text}
             onChange={(e) => setText(e.target.value)}
           />
        </div>

        <button 
          onClick={handleTranslate}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-primary hover:bg-blue-600 disabled:opacity-50 transition-all font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined text-lg">g_translate</span>
          )}
          Traducir ahora
        </button>

        <div className="flex-1 flex flex-col gap-2 min-h-0">
           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">RESULTADO</label>
           <div className="flex-1 bg-black/40 rounded-2xl p-4 text-sm text-gray-300 border border-white/5 overflow-y-auto leading-relaxed">
             {result || <span className="italic opacity-30">El resultado aparecerá aquí...</span>}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPanel;
