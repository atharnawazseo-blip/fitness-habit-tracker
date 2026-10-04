import { CustomHabit, LoggedMealItem, WaterLog, SleepLog, HabitReminder, UserSubscription } from '../types';

const STORAGE_KEYS = {
  HABITS: 'sehat_habits_v1',
  MEALS: 'sehat_meals_v1',
  WATER: 'sehat_water_v1',
  WATER_GOAL: 'sehat_water_goal_v1',
  SLEEP: 'sehat_sleep_v1',
  REMINDERS: 'sehat_reminders_v1',
  SUBSCRIPTION: 'sehat_subscription_v1',
  WORKOUT_HISTORY: 'sehat_workout_history_v1',
};

// Formats a date into YYYY-MM-DD
export function formatDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Generate past N days for calendar view
export function getPastDates(numDays = 28): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(formatDateKey(d));
  }
  return dates;
}

// Default habits with custom targets requested by user
export const DEFAULT_HABITS: CustomHabit[] = [
  {
    id: 'habit-water',
    title: 'Drink 8+ Glasses of Water',
    description: 'Keep kidneys clean, prevent dehydration headaches in warm climate',
    category: 'water',
    frequency: 'daily',
    targetCount: 8,
    unit: 'glasses',
    currentProgressToday: 6,
    isCompletedToday: false,
    streakCount: 9,
    bestStreak: 14,
    reminderTime: '11:00',
    icon: 'Droplets',
    history: {}
  },
  {
    id: 'habit-workout',
    title: 'No-Equipment Home Workout',
    description: 'Complete at least 15-20 mins of Baithak, Hindu Dand, or core moves',
    category: 'fitness',
    frequency: 'weekly',
    targetCount: 5,
    unit: 'times/wk',
    currentProgressToday: 1,
    isCompletedToday: true,
    streakCount: 6,
    bestStreak: 12,
    reminderTime: '18:30',
    icon: 'Flame',
    history: {}
  },
  {
    id: 'habit-clean-nashta',
    title: 'Clean Desi Nashta (No Deep Ghee)',
    description: 'Swap fried bakery paratha for whole wheat phulka or boiled eggs',
    category: 'nutrition',
    frequency: 'daily',
    targetCount: 1,
    unit: 'meals',
    currentProgressToday: 1,
    isCompletedToday: true,
    streakCount: 12,
    bestStreak: 15,
    reminderTime: '08:30',
    icon: 'UtensilsCrossed',
    history: {}
  },
  {
    id: 'habit-chai-sugar',
    title: 'Zero Sugar in Evening Chai',
    description: 'Curb 3-4 tsp daily refined sugar spikes with cardamom or green tea',
    category: 'nutrition',
    frequency: 'daily',
    targetCount: 1,
    unit: 'cups',
    currentProgressToday: 1,
    isCompletedToday: true,
    streakCount: 8,
    bestStreak: 21,
    reminderTime: '17:00',
    icon: 'Coffee',
    history: {}
  },
  {
    id: 'habit-sleep-7h',
    title: '7.5 Hours Restorative Sleep',
    description: 'Wind down by 11:30 PM, phone away 30 mins before slumber',
    category: 'sleep',
    frequency: 'daily',
    targetCount: 7.5,
    unit: 'hours',
    currentProgressToday: 7.5,
    isCompletedToday: true,
    streakCount: 5,
    bestStreak: 10,
    reminderTime: '23:00',
    icon: 'Moon',
    history: {}
  },
  {
    id: 'habit-chahal-qadmi',
    title: 'Post-Dinner 15-Min Walk (Chahal Qadmi)',
    description: 'Gentle digestion walk inside home or terrace to balance blood sugar',
    category: 'fitness',
    frequency: 'daily',
    targetCount: 15,
    unit: 'minutes',
    currentProgressToday: 0,
    isCompletedToday: false,
    streakCount: 4,
    bestStreak: 9,
    reminderTime: '21:45',
    icon: 'Footprints',
    history: {}
  }
];

export const DEFAULT_REMINDERS: HabitReminder[] = [
  {
    id: 'rem-1',
    title: 'Morning Water Hydration Kickstart',
    habitType: 'Drink 2 glasses of water on empty stomach',
    time: '07:30',
    enabled: true,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'rem-2',
    title: 'Desi Home Workout Session',
    habitType: '15-20 min living room bodyweight strength',
    time: '18:00',
    enabled: true,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: 'rem-3',
    title: 'Chai Sugar-Free Switch',
    habitType: 'Enjoy green tea or cardamom chai without white sugar',
    time: '17:00',
    enabled: true,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'rem-4',
    title: 'Dinner Wind-Down & Sleep Boundary',
    habitType: 'Wrap up dinner, dim bedroom lights',
    time: '22:30',
    enabled: true,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
];

// Initialize initial seeded history for habits
function seedHabitHistories(habits: CustomHabit[]): CustomHabit[] {
  const pastDates = getPastDates(28);
  const todayKey = formatDateKey();

  return habits.map((habit, idx) => {
    const history: Record<string, boolean> = {};
    pastDates.forEach((dateKey, dayIdx) => {
      if (dateKey === todayKey) {
        history[dateKey] = habit.isCompletedToday;
      } else {
        // Create realistic realistic streak patterns
        const isRestDay = (dayIdx % 7 === 0);
        if (habit.id === 'habit-workout') {
          history[dateKey] = !isRestDay && (dayIdx % 3 !== 0);
        } else {
          // Generally completed with a couple missed days 2 weeks ago
          history[dateKey] = (dayIdx > 4 && dayIdx !== 11 && dayIdx !== 18) || (idx === 0);
        }
      }
    });
    return { ...habit, history };
  });
}

// Storage helpers
export function loadHabits(): CustomHabit[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.HABITS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  const seeded = seedHabitHistories(DEFAULT_HABITS);
  saveHabits(seeded);
  return seeded;
}

export function saveHabits(habits: CustomHabit[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  } catch {
    // ignore
  }
}

export function loadWaterLogs(): WaterLog[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WATER);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  // Initial default logs for today
  const defaultLogs: WaterLog[] = [
    { id: 'w-1', amountMl: 500, timestamp: '08:15 AM' },
    { id: 'w-2', amountMl: 250, timestamp: '10:30 AM' },
    { id: 'w-3', amountMl: 500, timestamp: '01:00 PM' },
    { id: 'w-4', amountMl: 250, timestamp: '03:45 PM' }
  ];
  saveWaterLogs(defaultLogs);
  return defaultLogs;
}

export function saveWaterLogs(logs: WaterLog[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.WATER, JSON.stringify(logs));
  } catch {
    // ignore
  }
}

export function loadWaterGoal(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WATER_GOAL);
    if (saved) return Number(saved);
  } catch {
    // fallback
  }
  return 2500; // 2.5 Liters default (approx 10 glasses of 250ml)
}

export function saveWaterGoal(goalMl: number) {
  try {
    localStorage.setItem(STORAGE_KEYS.WATER_GOAL, String(goalMl));
  } catch {
    // ignore
  }
}

export function loadMealLogs(): LoggedMealItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MEALS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  const defaultMeals: LoggedMealItem[] = [
    {
      id: 'm-1',
      foodId: 'food-roti-1',
      name: 'Gandum Ki Roti (Whole Wheat Chapati)',
      mealType: 'breakfast',
      servings: 1,
      servingText: '1 roti',
      macros: { calories: 120, carbs: 24, protein: 3.8, fat: 0.8 },
      loggedAt: '08:30 AM'
    },
    {
      id: 'm-2',
      foodId: 'food-boiled-egg',
      name: 'Ubla Hua Anda (Hard Boiled Egg)',
      mealType: 'breakfast',
      servings: 2,
      servingText: '2 eggs',
      macros: { calories: 148, carbs: 0.8, protein: 12.6, fat: 10.0 },
      loggedAt: '08:32 AM'
    },
    {
      id: 'm-3',
      foodId: 'food-daal-chana',
      name: 'Daal Chana (Yellow Split Chickpea Curry)',
      mealType: 'lunch',
      servings: 1,
      servingText: '1 cup (200g)',
      macros: { calories: 215, carbs: 32.0, protein: 11.5, fat: 4.8 },
      loggedAt: '01:45 PM'
    },
    {
      id: 'm-4',
      foodId: 'food-kachumber-salad',
      name: 'Fresh Desi Kachumber Salad',
      mealType: 'lunch',
      servings: 1,
      servingText: '1 bowl',
      macros: { calories: 42, carbs: 8.5, protein: 1.8, fat: 0.4 },
      loggedAt: '01:47 PM'
    }
  ];
  saveMealLogs(defaultMeals);
  return defaultMeals;
}

export function saveMealLogs(meals: LoggedMealItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
  } catch {
    // ignore
  }
}

export function loadSleepLog(): SleepLog {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SLEEP);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  const defaultSleep: SleepLog = {
    id: 'sleep-today',
    date: formatDateKey(),
    bedTime: '23:30',
    wakeTime: '07:00',
    durationHours: 7.5,
    quality: 4,
    notes: 'Had a cup of warm cardamom milk, fell asleep quickly without phone.'
  };
  saveSleepLog(defaultSleep);
  return defaultSleep;
}

export function saveSleepLog(sleep: SleepLog) {
  try {
    localStorage.setItem(STORAGE_KEYS.SLEEP, JSON.stringify(sleep));
  } catch {
    // ignore
  }
}

export function loadReminders(): HabitReminder[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  saveReminders(DEFAULT_REMINDERS);
  return DEFAULT_REMINDERS;
}

export function saveReminders(reminders: HabitReminder[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  } catch {
    // ignore
  }
}

export function loadSubscription(): UserSubscription {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return { isPremium: false };
}

export function saveSubscription(sub: UserSubscription) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(sub));
  } catch {
    // ignore
  }
}

export function logWorkoutCompletion(workoutTitle: string, durationMin: number, cal: number) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    existing.unshift({
      id: 'wh-' + Date.now(),
      workoutTitle,
      durationMin,
      cal,
      date: formatDateKey(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(existing.slice(0, 30)));
  } catch {
    // ignore
  }
}

export function loadWorkoutHistory(): Array<{ id: string; workoutTitle: string; durationMin: number; cal: number; date: string; time: string }> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return [
    {
      id: 'wh-seed-1',
      workoutTitle: 'Ghar Ki Buniyaad: Low-Impact Full Body',
      durationMin: 15,
      cal: 110,
      date: formatDateKey(),
      time: '07:15 AM'
    }
  ];
}
