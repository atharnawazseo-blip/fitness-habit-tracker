import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Utensils, Droplets, Moon, Flame, 
  Sparkles, Bell, HeartHandshake, Shield
} from 'lucide-react';
import { 
  CustomHabit, LoggedMealItem, WaterLog, SleepLog, 
  HabitReminder, UserSubscription 
} from './types';
import { 
  loadHabits, saveHabits, 
  loadWaterLogs, saveWaterLogs, loadWaterGoal, saveWaterGoal,
  loadMealLogs, saveMealLogs,
  loadSleepLog, saveSleepLog,
  loadReminders, saveReminders,
  loadSubscription, saveSubscription,
  logWorkoutCompletion, formatDateKey
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { AdBanner } from './components/AdBanner';
import { WorkoutSection } from './components/WorkoutSection';
import { MealTracker } from './components/MealTracker';
import { WaterTracker } from './components/WaterTracker';
import { SleepTracker } from './components/SleepTracker';
import { HabitStreakView } from './components/HabitStreakView';
import { PremiumModal } from './components/PremiumModal';
import { AiConsultantModal } from './components/AiConsultantModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workouts' | 'meals' | 'water' | 'sleep' | 'habits'>('habits');

  // Application State
  const [habits, setHabits] = useState<CustomHabit[]>(loadHabits);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>(loadWaterLogs);
  const [waterGoalMl, setWaterGoalMl] = useState<number>(loadWaterGoal);
  const [mealLogs, setMealLogs] = useState<LoggedMealItem[]>(loadMealLogs);
  const [sleepLog, setSleepLog] = useState<SleepLog>(loadSleepLog);
  const [reminders, setReminders] = useState<HabitReminder[]>(loadReminders);
  const [subscription, setSubscription] = useState<UserSubscription>(loadSubscription);

  // Modals state
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState(false);

  // Calculate streak based on habits
  const streakCount = habits.length > 0 
    ? Math.max(...habits.map((h) => h.streakCount)) 
    : 7;

  // Sync state changes with persistence
  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    saveWaterLogs(waterLogs);
  }, [waterLogs]);

  useEffect(() => {
    saveMealLogs(mealLogs);
  }, [mealLogs]);

  useEffect(() => {
    saveSleepLog(sleepLog);
  }, [sleepLog]);

  useEffect(() => {
    saveReminders(reminders);
  }, [reminders]);

  useEffect(() => {
    saveSubscription(subscription);
  }, [subscription]);

  // Workout Completion handler
  const handleWorkoutCompleted = (workoutTitle: string, durationMin: number, cal: number) => {
    logWorkoutCompletion(workoutTitle, durationMin, cal);

    // Auto check-off workout habit if present
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === 'habit-workout' || h.category === 'fitness') {
          const todayKey = formatDateKey();
          return {
            ...h,
            isCompletedToday: true,
            currentProgressToday: (h.currentProgressToday || 0) + 1,
            streakCount: h.streakCount + (h.isCompletedToday ? 0 : 1),
            history: { ...h.history, [todayKey]: true }
          };
        }
        return h;
      })
    );
  };

  // Water log handlers
  const handleAddWater = (amountMl: number) => {
    const newLog: WaterLog = {
      id: 'w-' + Date.now(),
      amountMl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [...waterLogs, newLog];
    setWaterLogs(updated);

    // Check if total hits goal
    const totalMl = updated.reduce((acc, l) => acc + l.amountMl, 0);
    if (totalMl >= waterGoalMl) {
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id === 'habit-water' || h.category === 'water') {
            const todayKey = formatDateKey();
            return {
              ...h,
              isCompletedToday: true,
              history: { ...h.history, [todayKey]: true }
            };
          }
          return h;
        })
      );
    }
  };

  const handleResetWater = () => {
    setWaterLogs([]);
  };

  const handleUpdateWaterGoal = (newGoal: number) => {
    setWaterGoalMl(newGoal);
    saveWaterGoal(newGoal);
  };

  // Meal handlers
  const handleAddMeal = (item: LoggedMealItem) => {
    setMealLogs((prev) => [...prev, item]);
  };

  const handleRemoveMeal = (id: string) => {
    setMealLogs((prev) => prev.filter((m) => m.id !== id));
  };

  // Sleep handler
  const handleSaveSleep = (log: SleepLog) => {
    setSleepLog(log);
    // Mark sleep habit if >= 7 hours
    if (log.durationHours >= 7) {
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id === 'habit-sleep-7h' || h.category === 'sleep') {
            const todayKey = formatDateKey();
            return {
              ...h,
              isCompletedToday: true,
              history: { ...h.history, [todayKey]: true }
            };
          }
          return h;
        })
      );
    }
  };

  // Habit handlers
  const handleToggleHabit = (habitId: string) => {
    const todayKey = formatDateKey();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const newStatus = !h.isCompletedToday;
          return {
            ...h,
            isCompletedToday: newStatus,
            streakCount: newStatus ? h.streakCount + 1 : Math.max(0, h.streakCount - 1),
            history: {
              ...h.history,
              [todayKey]: newStatus
            }
          };
        }
        return h;
      })
    );
  };

  const handleAddCustomHabit = (newHabit: CustomHabit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  // Reminder handlers
  const handleToggleReminder = (remId: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === remId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleAddReminder = (newRem: HabitReminder) => {
    setReminders((prev) => [...prev, newRem]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 pb-20 md:pb-12">
      {/* Top Sponsored Ad Banner (Only shown in Free tier) */}
      <AdBanner
        isPremium={subscription.isPremium}
        onUpgradeClick={() => setIsPremiumModalOpen(true)}
      />

      {/* Top Bar Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        subscription={subscription}
        onOpenPremium={() => setIsPremiumModalOpen(true)}
        streakCount={streakCount}
        onOpenReminders={() => setActiveTab('habits')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {/* Quick Sehat Coach Floating Trigger */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-900 text-white shadow-sm">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-200">Coach Tariq:</span>
            <span className="text-stone-200 hidden sm:inline">
              "Consistency beats perfection. Drink a glass of water and try today's 15-min Baithak routine!"
            </span>
          </div>

          <button
            onClick={() => setIsAiConsultantOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult AI Dietitian</span>
          </button>
        </div>

        {/* View Routing */}
        {activeTab === 'workouts' && (
          <WorkoutSection
            onWorkoutCompleted={handleWorkoutCompleted}
            onOpenPremium={() => setIsPremiumModalOpen(true)}
            isPremium={subscription.isPremium}
          />
        )}

        {activeTab === 'meals' && (
          <MealTracker
            mealLogs={mealLogs}
            onAddMeal={handleAddMeal}
            onRemoveMeal={handleRemoveMeal}
            onOpenPremium={() => setIsPremiumModalOpen(true)}
            isPremium={subscription.isPremium}
          />
        )}

        {activeTab === 'water' && (
          <WaterTracker
            waterLogs={waterLogs}
            waterGoalMl={waterGoalMl}
            onAddWater={handleAddWater}
            onResetWater={handleResetWater}
            onUpdateGoal={handleUpdateWaterGoal}
            onOpenReminders={() => setActiveTab('habits')}
          />
        )}

        {activeTab === 'sleep' && (
          <SleepTracker
            sleepLog={sleepLog}
            onSaveSleep={handleSaveSleep}
            onOpenPremium={() => setIsPremiumModalOpen(true)}
          />
        )}

        {activeTab === 'habits' && (
          <HabitStreakView
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onAddCustomHabit={handleAddCustomHabit}
            onDeleteHabit={handleDeleteHabit}
            reminders={reminders}
            onToggleReminder={handleToggleReminder}
            onAddReminder={handleAddReminder}
            streakCount={streakCount}
            onOpenPremium={() => setIsPremiumModalOpen(true)}
            isPremium={subscription.isPremium}
          />
        )}
      </main>

      {/* Native Mobile Bottom Navigation Bar (Pattern 1 from design guide) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200">
        <nav aria-label="Mobile Navigation" className="grid grid-cols-5 items-center h-16 px-1">
          <button
            onClick={() => setActiveTab('habits')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] ${
              activeTab === 'habits' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-[10px] mt-1">Streaks</span>
          </button>

          <button
            onClick={() => setActiveTab('workouts')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] ${
              activeTab === 'workouts' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            <span className="text-[10px] mt-1">Workouts</span>
          </button>

          <button
            onClick={() => setActiveTab('meals')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] ${
              activeTab === 'meals' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[10px] mt-1">Meals</span>
          </button>

          <button
            onClick={() => setActiveTab('water')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] ${
              activeTab === 'water' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Droplets className="w-5 h-5" />
            <span className="text-[10px] mt-1">Water</span>
          </button>

          <button
            onClick={() => setActiveTab('sleep')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] ${
              activeTab === 'sleep' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-[10px] mt-1">Sleep</span>
          </button>
        </nav>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-stone-100 py-6 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-stone-800">SehatSync</span>
            <span aria-hidden="true">·</span>
            <span>Pakistani Health & Home Fitness System</span>
          </div>
          <div className="flex items-center gap-4 text-stone-600">
            <span>Free Tier (Ad-Supported)</span>
            <span>·</span>
            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="text-emerald-800 hover:underline font-semibold"
            >
              {subscription.isPremium ? 'Manage Sehat+' : 'Upgrade to Sehat+ Premium'}
            </button>
          </div>
        </div>
      </footer>

      {/* Premium Upgrade Modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        subscription={subscription}
        onUpdateSubscription={setSubscription}
      />

      {/* AI Consultant Modal */}
      <AiConsultantModal
        isOpen={isAiConsultantOpen}
        onClose={() => setIsAiConsultantOpen(false)}
        isPremium={subscription.isPremium}
        onOpenPremium={() => {
          setIsAiConsultantOpen(false);
          setIsPremiumModalOpen(true);
        }}
      />
    </div>
  );
}
