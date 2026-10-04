export type WorkoutIntensity = 'beginner' | 'intermediate' | 'advanced';
export type MuscleGroup = 'full_body' | 'legs' | 'core' | 'upper_body' | 'mobility';

export interface Exercise {
  id: string;
  name: string;
  urduName?: string;
  targetMuscle: string;
  durationSeconds?: number;
  reps?: number;
  restSeconds: number;
  instructions: string;
  romanUrduTip?: string;
  formCues: string[];
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  subtitle: string;
  intensity: WorkoutIntensity;
  muscleGroup: MuscleGroup;
  totalDurationMin: number;
  estCalories: number;
  description: string;
  exercises: Exercise[];
  equipmentNeeded: string; // "None (Bodyweight)"
  imageKey?: string;
}

export interface MacroNutrients {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export interface PakistaniFoodItem {
  id: string;
  name: string;
  urduName?: string;
  category: 'roti_grains' | 'salan_curries' | 'bbq_kababs' | 'lentils_sabzi' | 'drinks_chai' | 'snacks_dairy';
  defaultServing: string;
  servingUnit: string;
  macros: MacroNutrients;
  isDesiSuperfood?: boolean;
  glycemicIndex: 'Low' | 'Medium' | 'High';
  desiTip?: string;
}

export interface LoggedMealItem {
  id: string;
  foodId: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;
  servingText: string;
  macros: MacroNutrients;
  loggedAt: string;
}

export interface DesiDietPlan {
  id: string;
  name: string;
  targetCal: number;
  tagline: string;
  description: string;
  macrosSplit: { carbs: number; protein: number; fat: number };
  sampleMenu: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
  desiSecrets: string[];
}

export interface DesiSmartSwap {
  id: string;
  originalFood: string;
  originalCalories: number;
  healthySwap: string;
  swapCalories: number;
  savedCalories: number;
  benefit: string;
}

export interface WaterLog {
  id: string;
  amountMl: number;
  timestamp: string;
}

export interface SleepLog {
  id: string;
  date: string; // YYYY-MM-DD
  bedTime: string; // "23:30"
  wakeTime: string; // "07:00"
  durationHours: number;
  quality: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface CustomHabit {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'water' | 'nutrition' | 'sleep' | 'mindset';
  frequency: 'daily' | 'weekly';
  targetCount: number; // e.g. 8 for glasses, 5 for workouts/week
  unit: string; // "glasses", "sessions", "hours", "steps"
  currentProgressToday: number;
  isCompletedToday: boolean;
  streakCount: number;
  bestStreak: number;
  history: Record<string, boolean>; // 'YYYY-MM-DD': true/false
  reminderTime?: string;
  icon: string;
}

export interface HabitReminder {
  id: string;
  title: string;
  habitType: string;
  time: string; // "07:30"
  enabled: boolean;
  days: string[]; // ["Mon", "Tue", ...]
}

export interface UserSubscription {
  isPremium: boolean;
  plan?: 'monthly' | 'yearly';
  renewalDate?: string;
}
