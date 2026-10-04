import React, { useState } from 'react';
import { 
  Flame, CheckCircle2, Circle, Plus, Bell, Calendar as CalendarIcon, 
  Sparkles, Shield, ChevronRight, Award, Trash2, Clock
} from 'lucide-react';
import { CustomHabit, HabitReminder } from '../types';
import { formatDateKey, getPastDates } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface HabitStreakViewProps {
  habits: CustomHabit[];
  onToggleHabit: (habitId: string) => void;
  onAddCustomHabit: (habit: CustomHabit) => void;
  onDeleteHabit: (habitId: string) => void;
  reminders: HabitReminder[];
  onToggleReminder: (reminderId: string) => void;
  onAddReminder: (reminder: HabitReminder) => void;
  streakCount: number;
  onOpenPremium: () => void;
  isPremium: boolean;
}

export const HabitStreakView: React.FC<HabitStreakViewProps> = ({
  habits,
  onToggleHabit,
  onAddCustomHabit,
  onDeleteHabit,
  reminders,
  onToggleReminder,
  onAddReminder,
  streakCount,
  onOpenPremium,
  isPremium
}) => {
  const [activeTab, setActiveTab] = useState<'habits' | 'calendar' | 'reminders'>('habits');
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(formatDateKey());
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // New Custom Habit Form State
  const [habitTitle, setHabitTitle] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  const [habitCategory, setHabitCategory] = useState<'fitness' | 'water' | 'nutrition' | 'sleep' | 'mindset'>('fitness');
  const [habitFrequency, setHabitFrequency] = useState<'daily' | 'weekly'>('daily');
  const [habitTarget, setHabitTarget] = useState('1');
  const [habitUnit, setHabitUnit] = useState('times');
  const [habitReminderTime, setHabitReminderTime] = useState('08:00');

  // New Reminder Form State
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderHabitType, setReminderHabitType] = useState('');
  const [reminderTime, setReminderTime] = useState('12:00');

  const past28Days = getPastDates(28);
  const todayKey = formatDateKey();

  // Completed habits today
  const completedTodayCount = habits.filter((h) => h.isCompletedToday).length;
  const completionPercentage = Math.round((completedTodayCount / Math.max(1, habits.length)) * 100);

  const handleToggleHabitWithSound = (id: string) => {
    soundManager.playHabitDone();
    onToggleHabit(id);
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitTitle) return;

    const newHabit: CustomHabit = {
      id: 'habit-custom-' + Date.now(),
      title: habitTitle,
      description: habitDesc || 'Personal wellness commitment',
      category: habitCategory,
      frequency: habitFrequency,
      targetCount: Number(habitTarget) || 1,
      unit: habitUnit,
      currentProgressToday: 0,
      isCompletedToday: false,
      streakCount: 0,
      bestStreak: 0,
      reminderTime: habitReminderTime,
      icon: habitCategory === 'water' ? 'Droplets' : habitCategory === 'fitness' ? 'Flame' : 'Award',
      history: { [todayKey]: false }
    };

    onAddCustomHabit(newHabit);
    setIsAddHabitModalOpen(false);
    setHabitTitle('');
    setHabitDesc('');
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderTitle) return;

    const newRem: HabitReminder = {
      id: 'rem-' + Date.now(),
      title: reminderTitle,
      habitType: reminderHabitType || 'Habit reminder',
      time: reminderTime,
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };

    onAddReminder(newRem);
    setIsAddReminderModalOpen(false);
    setReminderTitle('');
    setReminderHabitType('');
  };

  // Test push notification simulation
  const handleTriggerTestReminder = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
    setNotificationToast(`${title}: ${body}`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const requestBrowserPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        handleTriggerTestReminder('SehatSync Reminders Enabled', 'You will receive gentle habit reminders at your chosen times.');
      }
    } else {
      handleTriggerTestReminder('SehatSync Reminder', 'Stay hydrated and complete your 15-minute home workout!');
    }
  };

  // Calculate day completion rate for calendar
  const getDayStatus = (dateKey: string) => {
    let completedCount = 0;
    habits.forEach((h) => {
      if (h.history && h.history[dateKey]) {
        completedCount++;
      }
    });
    if (completedCount === 0) return 'none';
    if (completedCount >= habits.length * 0.75) return 'high';
    return 'medium';
  };

  return (
    <section className="space-y-8">
      {/* Toast Notification simulation */}
      {notificationToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-4 rounded-2xl bg-stone-900 text-white shadow-2xl border border-stone-700 flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
          <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-wider block text-[10px]">
              SehatSync Reminder
            </span>
            <p className="mt-0.5 text-stone-200">{notificationToast}</p>
          </div>
        </div>
      )}

      {/* Hero Streak Header */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Big Flame Icon */}
            <div className="relative w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Flame className="w-10 h-10 text-amber-500 fill-amber-500 animate-pulse" />
              <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                Active
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-bold text-amber-700 uppercase tracking-wider">Daily Health Streak</span>
                <span aria-hidden="true">·</span>
                <span>Consistency Over Intensity</span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-stone-900 tabular-nums">
                  {streakCount}
                </span>
                <span className="text-base font-semibold text-stone-600">Consecutive Days</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Today: {completedTodayCount} of {habits.length} habits completed ({completionPercentage}%)
              </p>
            </div>
          </div>

          {/* Streak shield & quick actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-700" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900 block">Streak Shield Protected</span>
                <span className="text-emerald-700">1 Free pass active for unexpected events</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddHabitModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Set Custom Habit Goal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1 bg-stone-200/70 rounded-xl self-start max-w-md text-xs">
        <button
          onClick={() => setActiveTab('habits')}
          className={`flex-1 py-2 px-3 font-semibold rounded-lg transition-all ${
            activeTab === 'habits' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Today's Habits
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 py-2 px-3 font-semibold rounded-lg transition-all ${
            activeTab === 'calendar' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Visual Calendar View
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`flex-1 py-2 px-3 font-semibold rounded-lg transition-all ${
            activeTab === 'reminders' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Reminders & Alerts
        </button>
      </div>

      {/* TAB 1: TODAY'S HABITS */}
      {activeTab === 'habits' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900">Your Configured Habit Goals</h3>
            <span className="text-xs text-stone-500">Tap circle to check off today's goal</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  habit.isCompletedToday
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleHabitWithSound(habit.id)}
                    className="mt-0.5 transition-transform active:scale-90"
                    title={habit.isCompletedToday ? 'Mark incomplete' : 'Mark completed'}
                  >
                    {habit.isCompletedToday ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-700 fill-emerald-600/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-stone-300 hover:text-emerald-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          habit.isCompletedToday ? 'text-emerald-950 line-through decoration-emerald-600' : 'text-stone-900'
                        }`}
                      >
                        {habit.title}
                      </h4>
                      <span className="text-[10px] font-semibold uppercase text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                        Goal: {habit.targetCount} {habit.unit}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {habit.description}
                    </p>

                    <div className="flex items-center gap-3 mt-3 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1 font-bold text-amber-700">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                        <span className="tabular-nums">{habit.streakCount}d streak</span>
                      </span>
                      <span>·</span>
                      <span>Best: {habit.bestStreak}d</span>
                      {habit.reminderTime && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{habit.reminderTime}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteHabit(habit.id)}
                  className="text-stone-300 hover:text-rose-600 p-1 transition-colors"
                  title="Delete habit"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VISUAL PROGRESS TRACKER (CALENDAR VIEW) */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-emerald-800" />
                  <span>28-Day Habit Streak Calendar</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Visual record of all your daily completed wellness pillars
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                  All Done
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  Partial
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-stone-200 inline-block" />
                  Rest / Missed
                </span>
              </div>
            </div>

            {/* 4-Week Grid */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-[11px] font-bold text-stone-400 uppercase tracking-wider py-1">
                  {d}
                </div>
              ))}

              {past28Days.map((dateStr) => {
                const status = getDayStatus(dateStr);
                const isSelected = selectedCalendarDate === dateStr;
                const isToday = dateStr === todayKey;
                const dayNum = dateStr.split('-')[2];

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedCalendarDate(dateStr)}
                    className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      status === 'high'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : status === 'medium'
                        ? 'bg-amber-100 text-amber-950 border border-amber-200'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                    } ${isSelected ? 'ring-2 ring-stone-900 ring-offset-2' : ''}`}
                  >
                    <span className="text-xs font-bold font-mono">{dayNum}</span>
                    <span className="text-[9px] mt-0.5 opacity-80">
                      {status === 'high' ? 'Done' : status === 'medium' ? 'Part' : '-'}
                    </span>
                    {isToday && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detail for selected date */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">
                  Day Inspection: {selectedCalendarDate} {selectedCalendarDate === todayKey && '(Today)'}
                </span>
                <span className="text-stone-500 font-medium">
                  {habits.filter((h) => h.history && h.history[selectedCalendarDate]).length} of {habits.length} Habits Logged
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {habits.map((h) => {
                  const done = h.history ? !!h.history[selectedCalendarDate] : false;
                  return (
                    <div
                      key={h.id}
                      className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200/80 text-stone-800"
                    >
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-300" />
                      )}
                      <span className={done ? 'font-medium' : 'text-stone-500'}>{h.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REMINDERS & ALERTS */}
      {activeTab === 'reminders' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Gentle Habit Reminders</h3>
                <p className="text-xs text-stone-500">
                  Timely cues keep your habits effortless throughout the workday
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={requestBrowserPermission}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Enable Push Alerts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddReminderModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Reminder</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-100/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center font-mono font-bold text-xs text-stone-800">
                      {rem.time}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{rem.title}</h4>
                      <p className="text-[11px] text-stone-500">{rem.habitType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTriggerTestReminder(rem.title, rem.habitType)}
                      className="text-[11px] text-emerald-800 hover:underline font-semibold"
                    >
                      Test Alert
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleReminder(rem.id)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${
                        rem.enabled ? 'bg-emerald-600' : 'bg-stone-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                          rem.enabled ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CREATE CUSTOM HABIT MODAL */}
      {isAddHabitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold font-display text-stone-900">
              Set Custom Habit Goal
            </h3>
            <p className="text-xs text-stone-500">
              Define your own customized goal (e.g. 'drink 8 glasses of water daily', 'workout 5 times a week').
            </p>

            <form onSubmit={handleCreateHabit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Habit Name / Action</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drink 8 glasses of water daily"
                  value={habitTitle}
                  onChange={(e) => setHabitTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Description / Benefit</label>
                <input
                  type="text"
                  placeholder="e.g. Keep kidneys hydrated, clear skin, sustained energy"
                  value={habitDesc}
                  onChange={(e) => setHabitDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Category</label>
                  <select
                    value={habitCategory}
                    onChange={(e) => setHabitCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="fitness">Fitness / Workout</option>
                    <option value="water">Water / Hydration</option>
                    <option value="nutrition">Nutrition & Diet</option>
                    <option value="sleep">Sleep & Recovery</option>
                    <option value="mindset">Mindset / Habit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Frequency</label>
                  <select
                    value={habitFrequency}
                    onChange={(e) => setHabitFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="daily">Daily Target</option>
                    <option value="weekly">Weekly Target (X / wk)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Target Number</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={habitTarget}
                    onChange={(e) => setHabitTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. glasses, workouts, mins"
                    value={habitUnit}
                    onChange={(e) => setHabitUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Daily Cue Time</label>
                <input
                  type="time"
                  value={habitReminderTime}
                  onChange={(e) => setHabitReminderTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddHabitModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-semibold hover:bg-emerald-900 transition-colors"
                >
                  Create Habit Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE REMINDER MODAL */}
      {isAddReminderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold font-display text-stone-900">
              Set Habit Reminder
            </h3>
            <form onSubmit={handleCreateReminder} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Reminder Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Water Break"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Habit Type / Prompt</label>
                <input
                  type="text"
                  placeholder="e.g. Drink 1 tall glass of water with lemon"
                  value={reminderHabitType}
                  onChange={(e) => setReminderHabitType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Time</label>
                <input
                  type="time"
                  required
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddReminderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-semibold hover:bg-emerald-900 transition-colors"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
