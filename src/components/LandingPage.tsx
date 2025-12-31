
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#101822] flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-center border-b border-white/5 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex max-w-[1200px] flex-1 items-center justify-between px-10 py-4">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">spa</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Vizo</h2>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-sm"
          >
            Iniciar sesión
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="w-full max-w-[1200px] px-10 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8">
          <span className="material-symbols-outlined text-primary text-sm filled">star</span>
          <span className="text-xs font-black text-primary uppercase tracking-widest">NUEVO EN V2.0</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-8">
          Domina tu tiempo. <br/>
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Eleva tu enfoque.</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          Desbloquea todo el potencial de tu productividad con el Modo Concentración Avanzado. Únete a más de 10,000 profesionales que han recuperado su tiempo.
        </p>

        <div className="flex gap-4">
          <button 
            onClick={onStart}
            className="px-10 py-4 rounded-2xl bg-primary hover:bg-blue-600 transition-all font-black text-lg shadow-[0_0_30px_rgba(19,109,236,0.3)]"
          >
            Comenzar Gratis
          </button>
          <button className="px-10 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-black text-lg">
            Ver Demo
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 w-full relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30"></div>
          <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
             <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" alt="Preview" className="w-full opacity-60 mix-blend-luminosity" />
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="material-symbols-outlined text-8xl text-white opacity-20">play_circle</span>
             </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <section className="mt-40 w-full">
          <h2 className="text-4xl font-black mb-4">Planes para todos</h2>
          <p className="text-gray-400 mb-16">Invierte en tu recurso más valioso: tu tiempo.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="glass-panel p-10 rounded-3xl text-left border border-white/5 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Mensual</h3>
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-5xl font-black">$9.99</span>
                   <span className="text-gray-500">/mes</span>
                </div>
                <div className="space-y-4 mb-10 flex-1">
                   <Feature label="Focus Mode Avanzado" />
                   <Feature label="Temas dinámicos" />
                   <Feature label="3 Dispositivos" />
                </div>
                <button 
                  onClick={onStart}
                  className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all"
                >
                  Elegir Mensual
                </button>
             </div>
             
             <div className="glass-panel p-10 rounded-3xl text-left border-2 border-primary relative flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Recomendado</div>
                <h3 className="text-xl font-bold mb-2">Anual</h3>
                <div className="flex items-baseline gap-1 mb-2">
                   <span className="text-5xl font-black">$79.99</span>
                   <span className="text-gray-500">/año</span>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg text-sm font-bold w-fit mb-8">Ahorra 33%</div>
                <div className="space-y-4 mb-10 flex-1">
                   <Feature label="Todo lo de Mensual" />
                   <Feature label="Soporte Priority 24/7" />
                   <Feature label="Acceso anticipado a IA" />
                   <Feature label="Sync Ilimitada" />
                </div>
                <button 
                  onClick={onStart}
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-blue-600 font-bold shadow-lg shadow-primary/20 transition-all"
                >
                  Comenzar 7 Días Gratis
                </button>
             </div>
          </div>
        </section>
      </main>
      
      <footer className="py-20 text-gray-500 text-sm">
        © 2024 Vizo Inc. Todos los derechos reservados.
      </footer>
    </div>
  );
};

const Feature = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
    <span className="text-gray-300">{label}</span>
  </div>
);

export default LandingPage;
