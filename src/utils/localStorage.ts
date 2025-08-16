export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
}

const HABITS_KEY = 'growtrack-habits';

export const loadHabits = (): Habit[] => {
  try {
    const saved = localStorage.getItem(HABITS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

export const saveHabits = (habits: Habit[]): void => {
  try {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const isCompletedToday = (habit: Habit): boolean => {
  const today = getTodayString();
  return habit.completedDates.includes(today);
};

export const getCurrentStreak = (habit: Habit): number => {
  const today = new Date();
  let streak = 0;
  
  for (let i = 0; i >= -365; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    if (habit.completedDates.includes(dateString)) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};