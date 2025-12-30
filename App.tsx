
import React, { useState, useEffect } from 'react';
import { AppView, ThemeVibe } from './types';
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
  
  // Configuración global de accesibilidad
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
      if (auth === 'true') setIsAuthenticated(true);

      const savedConfig = localStorage.getItem('vizo-config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
        document.documentElement.style.setProperty('--vizo-font-scale', `${parsed.fontSize}%`);
      }
    } catch (e) {}
  }, []);

  const handleConfigChange = (newConfig: any) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    localStorage.setItem('vizo-config', JSON.stringify(updated));
    document.documentElement.style.setProperty('--vizo-font-scale', `${updated.fontSize}%`);
  };

  const handleThemeChange = (newTheme: ThemeVibe) => {
    setTheme(newTheme);
    localStorage.setItem('vizo-theme', newTheme);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('vizo-auth', 'true');
    setView(AppView.DASHBOARD);
  };

  const renderContent = () => {
    const privateViews = [AppView.DASHBOARD, AppView.INTEGRATIONS, AppView.SETTINGS, AppView.HISTORY];
    if (privateViews.includes(view) && !isAuthenticated) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setView(AppView.LANDING)} />;
    }

    switch (view) {
      case AppView.LANDING:
        return <LandingPage onStart={() => setView(isAuthenticated ? AppView.DASHBOARD : AppView.LOGIN)} />;
      case AppView.LOGIN:
        return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setView(AppView.LANDING)} />;
      case AppView.DASHBOARD:
        return <Dashboard 
                  currentTheme={theme} 
                  onThemeChange={handleThemeChange} 
                  onNavigate={setView} 
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
        return <History onNavigate={setView} />;
      default:
        return <LandingPage onStart={() => setView(AppView.LOGIN)} />;
    }
  };

  const getThemeClass = () => {
    let classes = config.highContrast ? 'high-contrast ' : '';
    switch (theme) {
      case ThemeVibe.KPOP: return classes + 'theme-kpop';
      case ThemeVibe.LOFI: return classes + 'theme-lofi';
      case ThemeVibe.JUVENILE: return classes + 'theme-juvenile';
      default: return classes + 'theme-professional';
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden transition-all duration-700 bg-background-dark ${getThemeClass()}`}>
      {renderContent()}
    </div>
  );
};

export default App;
