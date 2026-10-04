import React from 'react';
import { Sparkles, Bell, Flame } from 'lucide-react';
import { UserSubscription } from '../types';

interface NavbarProps {
  activeTab: 'workouts' | 'meals' | 'water' | 'sleep' | 'habits';
  onSelectTab: (tab: 'workouts' | 'meals' | 'water' | 'sleep' | 'habits') => void;
  subscription: UserSubscription;
  onOpenPremium: () => void;
  streakCount: number;
  onOpenReminders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  subscription,
  onOpenPremium,
  streakCount,
  onOpenReminders
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => onSelectTab('habits')}
          className="text-left font-display font-extrabold text-xl tracking-tight text-emerald-900 hover:text-emerald-800 transition-colors"
        >
          SehatSync
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('workouts')}
            className={`transition-colors hover:text-stone-900 ${
              activeTab === 'workouts' ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
            }`}
          >
            Workouts
          </button>
          <button
            onClick={() => onSelectTab('meals')}
            className={`transition-colors hover:text-stone-900 ${
              activeTab === 'meals' ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
            }`}
          >
            Meals & Diets
          </button>
          <button
            onClick={() => onSelectTab('water')}
            className={`transition-colors hover:text-stone-900 ${
              activeTab === 'water' ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
            }`}
          >
            Water Tracker
          </button>
          <button
            onClick={() => onSelectTab('sleep')}
            className={`transition-colors hover:text-stone-900 ${
              activeTab === 'sleep' ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
            }`}
          >
            Sleep
          </button>
          <button
            onClick={() => onSelectTab('habits')}
            className={`transition-colors hover:text-stone-900 ${
              activeTab === 'habits' ? 'text-emerald-800 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
            }`}
          >
            Habits & Streaks
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Streak Flame Indicator */}
          <button
            onClick={() => onSelectTab('habits')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-colors"
            title="Current Streak"
          >
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span className="tabular-nums">{streakCount}d</span>
          </button>

          {/* Quick Reminders button */}
          <button
            onClick={onOpenReminders}
            className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Habit Reminders"
            aria-label="Habit Reminders"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Upgrade / Member Button */}
          <button
            onClick={onOpenPremium}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              subscription.isPremium
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{subscription.isPremium ? 'Sehat+ Active' : 'Upgrade to Sehat+'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
