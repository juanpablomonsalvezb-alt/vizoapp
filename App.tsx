
import React, { useState, useEffect } from 'react';
import { AppView, ThemeVibe, HistoryEvent } from './types';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Integrations from './components/Integrations';
import Settings from './components/Settings';
import History from './components/History';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [theme, setTheme] = useState<ThemeVibe>(ThemeVibe.PROFESSIONAL);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  
  const [config, setConfig] = useState({
    highContrast: false,
    fontSize: 100,
    reduceMotion: false
  });

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('vizo-theme');
      if (savedTheme) setTheme(savedTheme as ThemeVibe);
      
      const auth = localStorage.getItem('vizo-auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
        setView(AppView.DASHBOARD);
      } else {
        setView(AppView.LANDING);
      }

      const savedConfig = localStorage.getItem('vizo-config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
        document.documentElement.style.setProperty('--vizo-font-scale', `${parsed.fontSize}%`);
      }

      const savedHistory = localStorage.getItem('vizo-history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

    } catch (e) {}
  }, []);

  const addHistoryEvent = (event: Omit<HistoryEvent, 'id' | 'timestamp'>) => {
    const newEvent: HistoryEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setHistory(prevHistory => [newEvent, ...prevHistory]);
  };

  useEffect(() => {
    localStorage.setItem('vizo-history', JSON.stringify(history));
  }, [history]);

  const handleConfigChange = (newConfig: any) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    localStorage.setItem('vizo-config', JSON.stringify(updated));
    document.documentElement.style.setProperty('--vizo-font-scale', `${updated.fontSize}%`);
  };

  const handleThemeChange = (newTheme: ThemeVibe) => {
    addHistoryEvent({ type: 'theme', title: 'Tema Actualizado', description: `Cambiado a ${newTheme}` });
    setTheme(newTheme);
    localStorage.setItem('vizo-theme', newTheme);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('vizo-auth', 'true');
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('vizo-auth', 'false');
    setView(AppView.LANDING);
  };

  const renderContent = () => {
    if (isAuthenticated) {
        switch (view) {
            case AppView.DASHBOARD:
              return <Dashboard 
                        currentTheme={theme} 
                        onThemeChange={handleThemeChange} 
                        onNavigate={setView} 
                        onLogout={handleLogout}
                        addHistoryEvent={addHistoryEvent}
                      />;
            case AppView.INTEGRATIONS:
              return <Integrations onNavigate={setView} />;
            case AppView.SETTINGS:
              return <Settings 
                        onNavigate={setView} 
                        config={config} 
                        onConfigChange={handleConfigChange} 
                      />;
            case AppView.HISTORY:
              return <History onNavigate={setView} events={history} />;
            default:
              return <Dashboard 
                        currentTheme={theme} 
                        onThemeChange={handleThemeChange} 
                        onNavigate={setView} 
                        onLogout={handleLogout}
                        addHistoryEvent={addHistoryEvent}
                      />;
        }
    } else {
        switch (view) {
            case AppView.LOGIN:
              return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setView(AppView.LANDING)} />;
            default:
              return <LandingPage onStart={() => setView(AppView.LOGIN)} />;
        }
    }
  };

  const getAppClasses = () => {
    let classes = config.highContrast ? 'high-contrast ' : '';
    if (config.reduceMotion) classes += 'reduce-motion ';
    switch (theme) {
      case ThemeVibe.KPOP: return classes + 'theme-kpop';
      case ThemeVibe.LOFI: return classes + 'theme-lofi';
      case ThemeVibe.JUVENILE: return classes + 'theme-juvenile';
      default: return classes + 'theme-professional';
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden transition-all duration-700 bg-background-dark ${getAppClasses()}`}>
      <style>{`
        .reduce-motion * {
          transition: none !important;
          animation: none !important;
        }
        .reduce-motion video, .reduce-motion .backdrop-blur-[2px] {
          display: none !important;
        }
      `}</style>
      {renderContent()}
    </div>
  );
};

export default App;
