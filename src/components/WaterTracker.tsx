import React, { useState } from 'react';
import { Droplets, Plus, RotateCcw, Sparkles, CheckCircle2, Bell } from 'lucide-react';
import { WaterLog } from '../types';
import { soundManager } from '../utils/audio';
import { APP_IMAGES } from '../assets/images';

interface WaterTrackerProps {
  waterLogs: WaterLog[];
  waterGoalMl: number;
  onAddWater: (amountMl: number) => void;
  onResetWater: () => void;
  onUpdateGoal: (newGoalMl: number) => void;
  onOpenReminders: () => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  waterLogs,
  waterGoalMl,
  onAddWater,
  onResetWater,
  onUpdateGoal,
  onOpenReminders
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState(String(waterGoalMl));

  const totalConsumedMl = waterLogs.reduce((acc, log) => acc + log.amountMl, 0);
  const percentage = Math.min(100, Math.round((totalConsumedMl / waterGoalMl) * 100));
  const remainingMl = Math.max(0, waterGoalMl - totalConsumedMl);
  const glassesEquivalent = Math.round((totalConsumedMl / 250) * 10) / 10;
  const targetGlasses = Math.round(waterGoalMl / 250);

  const handleQuickAdd = (amount: number) => {
    soundManager.playWaterDrop();
    onAddWater(amount);
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(customGoalInput);
    if (val >= 1000 && val <= 6000) {
      onUpdateGoal(val);
      setIsEditingGoal(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-6 md:p-8 shadow-lg">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">
            <span>Cellular Hydration</span>
            <span aria-hidden="true">·</span>
            <span>Metabolic Flush</span>
            <span aria-hidden="true">·</span>
            <span>Warm Climate Vitality</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">
            Daily Water & Mineral Hydration
          </h2>
          <p className="mt-2 text-stone-300 text-xs md:text-sm leading-relaxed">
            In Pakistani summers and dry dry-season winds, dehydration is the hidden trigger behind afternoon lethargy, sugar cravings, and kidney stress. Drink clean, steady water throughout your day.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden md:block">
          <img
            src={APP_IMAGES.waterHydration}
            alt="Fresh mineral water"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        </div>
      </div>

      {/* Main Hydration Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Water Fill Card */}
        <div className="lg:col-span-1 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-xs text-stone-500 mb-4">
            <span className="font-semibold uppercase tracking-wider text-sky-700">Today's Progress</span>
            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-stone-500 hover:text-stone-800 underline font-medium"
            >
              {isEditingGoal ? 'Cancel' : 'Edit Target'}
            </button>
          </div>

          {isEditingGoal && (
            <form onSubmit={handleSaveGoal} className="w-full mb-4 p-3 rounded-2xl bg-sky-50 border border-sky-100 text-xs space-y-2">
              <label className="block text-sky-900 font-bold">Daily Goal (Milliliters)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="250"
                  min="1000"
                  max="6000"
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-sky-300 font-mono text-xs"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Visual Interactive Water Cylinder Gauge */}
          <div className="relative w-36 h-60 rounded-3xl border-4 border-stone-200 bg-stone-50 overflow-hidden shadow-inner flex flex-col justify-end my-2">
            {/* Water liquid with subtle wave styling */}
            <div
              className="w-full bg-gradient-to-t from-sky-600 via-sky-400 to-sky-300 transition-all duration-700 relative"
              style={{ height: `${percentage}%` }}
            >
              {/* Subtle bubble shine */}
              <div className="absolute top-1 left-3 w-3 h-3 rounded-full bg-white/40 blur-[1px]" />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 blur-[0.5px]" />
            </div>

            {/* Percentage Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none drop-shadow-sm">
              <span className="text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                {percentage}%
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 mt-0.5">
                {glassesEquivalent} / {targetGlasses} Glasses
              </span>
            </div>
          </div>

          {/* Total stats */}
          <div className="mt-4 space-y-1 w-full">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-sky-900 tabular-nums">
                {totalConsumedMl}
              </span>
              <span className="text-sm font-medium text-stone-500">/ {waterGoalMl} ml</span>
            </div>
            <p className="text-xs text-stone-500">
              {remainingMl > 0 ? `${remainingMl} ml remaining to hit goal` : 'Goal achieved for today! Fantastic job!'}
            </p>
          </div>

          <div className="w-full pt-4 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <button
              onClick={onResetWater}
              className="text-stone-400 hover:text-stone-700 flex items-center gap-1"
              title="Reset today's logs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Day</span>
            </button>
            <button
              onClick={onOpenReminders}
              className="text-sky-700 hover:text-sky-900 flex items-center gap-1 font-semibold"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Water Alerts</span>
            </button>
          </div>
        </div>

        {/* Quick Log Buttons & Hydration Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Log Panel */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">Quick Water Log</h3>
              <p className="text-xs text-stone-500">Tap an amount to instantly add to your hydration tally</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleQuickAdd(250)}
                className="p-4 rounded-2xl border border-sky-100 bg-sky-50/60 hover:bg-sky-100 hover:border-sky-300 text-sky-900 transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-xs"
              >
                <Droplets className="w-6 h-6 text-sky-500" />
                <span className="text-sm font-bold font-mono">+250 ml</span>
                <span className="text-[11px] text-sky-700 font-medium">1 Standard Glass</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickAdd(500)}
                className="p-4 rounded-2xl border border-sky-100 bg-sky-50/60 hover:bg-sky-100 hover:border-sky-300 text-sky-900 transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-xs"
              >
                <Droplets className="w-6 h-6 text-sky-600" />
                <span className="text-sm font-bold font-mono">+500 ml</span>
                <span className="text-[11px] text-sky-700 font-medium">1 Water Bottle</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickAdd(750)}
                className="p-4 rounded-2xl border border-sky-100 bg-sky-50/60 hover:bg-sky-100 hover:border-sky-300 text-sky-900 transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-xs"
              >
                <Droplets className="w-6 h-6 text-sky-700" />
                <span className="text-sm font-bold font-mono">+750 ml</span>
                <span className="text-[11px] text-sky-700 font-medium">Gym Flask</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickAdd(1000)}
                className="p-4 rounded-2xl border border-sky-100 bg-sky-50/60 hover:bg-sky-100 hover:border-sky-300 text-sky-900 transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-xs"
              >
                <Droplets className="w-6 h-6 text-sky-800" />
                <span className="text-sm font-bold font-mono">+1,000 ml</span>
                <span className="text-[11px] text-sky-700 font-medium">1 Liter Jug</span>
              </button>
            </div>
          </div>

          {/* Today's Log Timeline */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-stone-900">Today's Hydration Timeline</h3>
            {waterLogs.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-2">No water logged yet today. Take a glass now!</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {waterLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  >
                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                    <span className="font-bold font-mono text-stone-900">+{log.amountMl} ml</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-500">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pakistani Climate Hydration Tips */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-2 text-xs text-stone-700">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Desi Hydration & Kidney Health Tips</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <p>
                <strong className="text-stone-900">Morning Nahar-Munh Glass:</strong> Drinking 2 glasses of lukewarm water before your morning chai clears nocturnal metabolic toxins and stimulates digestion.
              </p>
              <p>
                <strong className="text-stone-900">Kheera & Leemo Water:</strong> Adding sliced cucumber (kheera) and fresh lemon to your pitcher provides cellular potassium and natural electrolyte replenishment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
