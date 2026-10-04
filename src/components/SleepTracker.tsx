import React, { useState, useEffect } from 'react';
import { Moon, Sun, Sparkles, Star, BedDouble, Wind, Check } from 'lucide-react';
import { SleepLog } from '../types';
import { APP_IMAGES } from '../assets/images';

interface SleepTrackerProps {
  sleepLog: SleepLog;
  onSaveSleep: (log: SleepLog) => void;
  onOpenPremium: () => void;
}

export const SleepTracker: React.FC<SleepTrackerProps> = ({
  sleepLog,
  onSaveSleep,
  onOpenPremium
}) => {
  const [bedTime, setBedTime] = useState(sleepLog.bedTime);
  const [wakeTime, setWakeTime] = useState(sleepLog.wakeTime);
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(sleepLog.quality);
  const [notes, setNotes] = useState(sleepLog.notes || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Box breathing interactive state
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCounter, setBreathCounter] = useState(4);

  // Calculate sleep duration from bed and wake times
  const calculateDuration = (bed: string, wake: string): number => {
    const [bH, bM] = bed.split(':').map(Number);
    const [wH, wM] = wake.split(':').map(Number);
    let totalBedMins = bH * 60 + bM;
    let totalWakeMins = wH * 60 + wM;
    if (totalWakeMins <= totalBedMins) {
      totalWakeMins += 24 * 60; // Next morning
    }
    const diffMins = totalWakeMins - totalBedMins;
    return Math.round((diffMins / 60) * 10) / 10;
  };

  const calculatedHours = calculateDuration(bedTime, wakeTime);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SleepLog = {
      ...sleepLog,
      bedTime,
      wakeTime,
      durationHours: calculatedHours,
      quality,
      notes
    };
    onSaveSleep(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Box Breathing cycle (4s Inhale, 4s Hold, 4s Exhale, 4s Rest)
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev <= 1) {
          setBreathPhase((curPhase) => {
            if (curPhase === 'Inhale') return 'Hold';
            if (curPhase === 'Hold') return 'Exhale';
            if (curPhase === 'Exhale') return 'Rest';
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  return (
    <section className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-6 md:p-8 shadow-lg">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-2">
            <span>Circadian Reset</span>
            <span aria-hidden="true">·</span>
            <span>Sleep Hygiene</span>
            <span aria-hidden="true">·</span>
            <span>Hormone Restoration</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">
            Sleep & Nighttime Restoration
          </h2>
          <p className="mt-2 text-stone-300 text-xs md:text-sm leading-relaxed">
            In our culture of late weddings, 10 PM dinners, and midnight chai, chronic sleep debt silently sabotages fat loss and insulin sensitivity. Track your sleep hygiene and wind down deliberately.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden md:block">
          <img
            src={APP_IMAGES.sleepWellness}
            alt="Evening bedroom atmosphere"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sleep Logging Form */}
        <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">Last Night's Sleep Log</h3>
              <p className="text-xs text-stone-500">Record your bedtime and wake schedule</p>
            </div>
            {saveSuccess && (
              <span className="flex items-center gap-1 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Check className="w-3.5 h-3.5" />
                <span>Saved to Streak!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Bedtime */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Bedtime (Lights Out)</span>
                </label>
                <input
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Wake time */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Wake Time (Morning)</span>
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Calculated stats */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-800 font-medium">Calculated Sleep Duration</span>
                <p className="text-2xl font-bold font-mono text-indigo-950 tabular-nums">
                  {calculatedHours} Hours
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500">Recommended Target</span>
                <p className="text-sm font-semibold text-stone-800">7.5 – 8.5 Hours</p>
              </div>
            </div>

            {/* Quality rating */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                Sleep Quality & Refreshment
              </label>
              <div className="flex items-center gap-2">
                {([1, 2, 3, 4, 5] as const).map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setQuality(star)}
                    className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 transition-all ${
                        star <= quality
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300 hover:text-stone-400'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-stone-600 ml-2">
                  {quality === 1 && 'Restless / Interrupted'}
                  {quality === 2 && 'Fair / Light Sleep'}
                  {quality === 3 && 'Good / Normal'}
                  {quality === 4 && 'Deep / Well Rested'}
                  {quality === 5 && 'Outstanding / Fully Restored'}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700">Night Reflection & Habits</label>
              <input
                type="text"
                placeholder="e.g. Swapped midnight tea for warm cardamom milk, fell asleep quickly"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Save Sleep Record
              </button>
            </div>
          </form>
        </div>

        {/* 4-4-4 Box Breathing Wind-Down Widget */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between text-center space-y-4">
          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
              <Wind className="w-4 h-4" />
              <span>Bedtime Wind-Down</span>
            </div>
            <h4 className="text-base font-bold text-stone-900">4-4-4-4 Box Breathing</h4>
            <p className="text-xs text-stone-500 mt-1">
              Calm the parasympathetic nervous system to slide into deep sleep without tossing and turning.
            </p>
          </div>

          {/* Animated breath circle */}
          <div className="relative py-4 flex flex-col items-center justify-center">
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                isBreathingActive
                  ? breathPhase === 'Inhale'
                    ? 'scale-110 bg-indigo-100 border-4 border-indigo-400'
                    : breathPhase === 'Hold'
                    ? 'scale-110 bg-amber-100 border-4 border-amber-400'
                    : breathPhase === 'Exhale'
                    ? 'scale-90 bg-teal-100 border-4 border-teal-400'
                    : 'scale-90 bg-stone-100 border-4 border-stone-300'
                  : 'bg-stone-100 border-2 border-stone-200'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {isBreathingActive ? breathPhase : 'Ready'}
              </span>
              <span className="text-3xl font-extrabold font-mono text-stone-900 mt-1">
                {isBreathingActive ? breathCounter : '4s'}
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors ${
                isBreathingActive
                  ? 'bg-stone-800 text-white hover:bg-stone-900'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              }`}
            >
              {isBreathingActive ? 'Stop Exercise' : 'Start 2-Min Relaxation Cycle'}
            </button>
          </div>
        </div>
      </div>

      {/* Pakistani Sleep Hygiene Rules */}
      <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-indigo-700" />
          <span>The Pakistani Sleep Hygiene Constitution</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1.5">
            <strong className="text-stone-900 font-bold block">1. The 2-Hour Desi Dinner Rule</strong>
            <p className="text-stone-600 leading-relaxed">
              Consuming heavy ghee-laden salan or nihari at 10 PM forces your gallbladder and stomach to produce excess acid while you lie down, destroying REM sleep. Eat by 8:30 PM.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1.5">
            <strong className="text-stone-900 font-bold block">2. Curb Late Doodh Patti</strong>
            <p className="text-stone-600 leading-relaxed">
              Black tea contains both caffeine and tannins that delay sleep onset by up to 90 minutes. Switch after 6 PM to caffeine-free Elaichi kehwa, chamomile, or warm cinnamon milk.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1.5">
            <strong className="text-stone-900 font-bold block">3. Fajr & Circadian Consistency</strong>
            <p className="text-stone-600 leading-relaxed">
              Waking at a fixed morning hour locks your biological clock. Getting 10 minutes of morning sunlight outdoors resets nighttime melatonin synthesis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
