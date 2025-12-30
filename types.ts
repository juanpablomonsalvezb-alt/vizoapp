
export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  INTEGRATIONS = 'INTEGRATIONS',
  SETTINGS = 'SETTINGS',
  HISTORY = 'HISTORY'
}

export enum ThemeVibe {
  PROFESSIONAL = 'PROFESSIONAL',
  LOFI = 'LOFI',
  KPOP = 'KPOP',
  JUVENILE = 'JUVENILE'
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Stats {
  focusMinutesToday: number;
  tasksCompletedToday: number;
  totalEvents: number;
  streakDays: number;
}
