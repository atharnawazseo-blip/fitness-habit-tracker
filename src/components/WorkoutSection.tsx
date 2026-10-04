import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, 
  CheckCircle2, Flame, Sparkles, ChevronDown, ChevronUp,
  X, Volume2, VolumeX, Dumbbell
} from 'lucide-react';
import { WorkoutRoutine, WorkoutIntensity, MuscleGroup, Exercise } from '../types';
import { WORKOUT_ROUTINES } from '../data/workouts';
import { soundManager } from '../utils/audio';
import { APP_IMAGES } from '../assets/images';

interface WorkoutSectionProps {
  onWorkoutCompleted: (workoutTitle: string, durationMin: number, cal: number) => void;
  onOpenPremium: () => void;
  isPremium: boolean;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({
  onWorkoutCompleted,
  onOpenPremium
}) => {
  const [selectedIntensity, setSelectedIntensity] = useState<'all' | WorkoutIntensity>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<'all' | MuscleGroup>('all');
  const [expandedRoutineId, setExpandedRoutineId] = useState<string | null>(null);

  // Active workout player state
  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine | null>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(45);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered routines
  const filteredRoutines = WORKOUT_ROUTINES.filter((r) => {
    if (selectedIntensity !== 'all' && r.intensity !== selectedIntensity) return false;
    if (selectedMuscle !== 'all' && r.muscleGroup !== selectedMuscle) return false;
    return true;
  });

  const currentExercise: Exercise | null = activeRoutine ? activeRoutine.exercises[currentExIndex] : null;

  // Handle workout start
  const handleStartWorkout = (routine: WorkoutRoutine) => {
    setActiveRoutine(routine);
    setCurrentExIndex(0);
    setIsResting(false);
    const initialSec = routine.exercises[0].durationSeconds || 45;
    setSecondsRemaining(initialSec);
    setTotalSecondsElapsed(0);
    setIsPlaying(true);
    if (soundEnabled) soundManager.playGoBell();
  };

  // Timer interval handling
  useEffect(() => {
    if (!isPlaying || !activeRoutine || !currentExercise) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTotalSecondsElapsed((prev) => prev + 1);

      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Transition logic
          handleStepFinish();
          return 0;
        }

        // Play tick at 3, 2, 1
        if (prev <= 4 && prev > 1 && soundEnabled) {
          soundManager.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeRoutine, currentExIndex, isResting, soundEnabled]);

  const handleStepFinish = useCallback(() => {
    if (!activeRoutine) return;

    if (!isResting) {
      // Transition from exercise to rest
      const restDuration = activeRoutine.exercises[currentExIndex].restSeconds || 15;
      setIsResting(true);
      setSecondsRemaining(restDuration);
      if (soundEnabled) soundManager.playRestChime();
    } else {
      // Transition from rest to next exercise or finish
      if (currentExIndex + 1 < activeRoutine.exercises.length) {
        const nextIdx = currentExIndex + 1;
        setCurrentExIndex(nextIdx);
        setIsResting(false);
        const nextDur = activeRoutine.exercises[nextIdx].durationSeconds || 45;
        setSecondsRemaining(nextDur);
        if (soundEnabled) soundManager.playGoBell();
      } else {
        // Complete workout!
        setIsPlaying(false);
        if (soundEnabled) soundManager.playVictoryFanfare();
        setIsCompletedModalOpen(true);
        onWorkoutCompleted(activeRoutine.title, activeRoutine.totalDurationMin, activeRoutine.estCalories);
      }
    }
  }, [activeRoutine, currentExIndex, isResting, soundEnabled, onWorkoutCompleted]);

  const handleNextExercise = () => {
    if (!activeRoutine) return;
    if (currentExIndex + 1 < activeRoutine.exercises.length) {
      setCurrentExIndex((prev) => prev + 1);
      setIsResting(false);
      const nextDur = activeRoutine.exercises[currentExIndex + 1].durationSeconds || 45;
      setSecondsRemaining(nextDur);
      if (soundEnabled) soundManager.playGoBell();
    } else {
      setIsPlaying(false);
      setIsCompletedModalOpen(true);
      onWorkoutCompleted(activeRoutine.title, activeRoutine.totalDurationMin, activeRoutine.estCalories);
    }
  };

  const handlePrevExercise = () => {
    if (!activeRoutine || currentExIndex === 0) return;
    setCurrentExIndex((prev) => prev - 1);
    setIsResting(false);
    const prevDur = activeRoutine.exercises[currentExIndex - 1].durationSeconds || 45;
    setSecondsRemaining(prevDur);
    if (soundEnabled) soundManager.playGoBell();
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setActiveRoutine(null);
    setCurrentExIndex(0);
    setIsResting(false);
  };

  return (
    <section className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-6 md:p-10 shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            <span>Zero Equipment</span>
            <span aria-hidden="true">·</span>
            <span>Living Room Workouts</span>
            <span aria-hidden="true">·</span>
            <span>Desi Akhada Conditioning</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-white">
            Ghar Pe Fitness: Pure Bodyweight Stamina
          </h2>
          <p className="mt-3 text-stone-300 text-sm md:text-base leading-relaxed">
            No expensive gym memberships or dumbbells needed. Build muscular stamina, burn calories, and strengthen joints using traditional Desi Baithak, Hindu Dand, and joint mobility routines.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Apartment friendly & quiet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Step-by-step Urdu form cues</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Smart interval audio chimes</span>
            </div>
          </div>
        </div>

        {/* Ambient image background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
          <img
            src={APP_IMAGES.heroFitness}
            alt="Home workout"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        </div>
      </div>

      {/* Filter Section */}
      <div className="space-y-4">
        {/* Intensity Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">Choose Routine by Intensity</h3>
            <p className="text-xs text-stone-500">Pick a tempo suited to your current energy level today</p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl self-start sm:self-auto">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => setSelectedIntensity(intensity)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  selectedIntensity === intensity
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {intensity === 'all' ? 'All Intensities' : intensity}
              </button>
            ))}
          </div>
        </div>

        {/* Muscle Group Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-stone-500 shrink-0 mr-1">Target Area:</span>
          {(
            [
              { key: 'all', label: 'All Areas' },
              { key: 'full_body', label: 'Full Body' },
              { key: 'legs', label: 'Legs & Baithak' },
              { key: 'core', label: 'Core & Abs' },
              { key: 'upper_body', label: 'Chest & Arms' },
              { key: 'mobility', label: 'Joints & Mobility' }
            ] as const
          ).map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedMuscle(m.key)}
              className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors border ${
                selectedMuscle === m.key
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutines.map((routine) => {
          const isExpanded = expandedRoutineId === routine.id;
          const intensityColor =
            routine.intensity === 'beginner'
              ? 'text-emerald-700'
              : routine.intensity === 'intermediate'
              ? 'text-amber-700'
              : 'text-rose-700';

          return (
            <div
              key={routine.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className={`font-bold capitalize ${intensityColor}`}>
                    {routine.intensity}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums font-medium">{routine.totalDurationMin} mins</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums font-medium">~{routine.estCalories} kcal</span>
                </div>

                <h4 className="text-lg font-bold font-display text-stone-900 tracking-tight leading-snug">
                  {routine.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{routine.subtitle}</p>

                <p className="text-xs text-stone-500 mt-3 line-clamp-2">{routine.description}</p>

                {/* Exercises Preview */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700">
                      {routine.exercises.length} Exercises (Zero Equipment)
                    </span>
                    <button
                      onClick={() => setExpandedRoutineId(isExpanded ? null : routine.id)}
                      className="text-xs text-emerald-800 hover:text-emerald-900 font-medium flex items-center gap-0.5"
                    >
                      <span>{isExpanded ? 'Hide moves' : 'View moves'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 space-y-2 bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
                      {routine.exercises.map((ex, i) => (
                        <div key={ex.id} className="pb-1.5 border-b border-stone-200/60 last:border-0">
                          <div className="flex items-center justify-between font-semibold text-stone-800">
                            <span>
                              {i + 1}. {ex.name}
                            </span>
                            <span className="text-stone-500 tabular-nums">
                              {ex.durationSeconds ? `${ex.durationSeconds}s` : `${ex.reps} reps`}
                            </span>
                          </div>
                          {ex.romanUrduTip && (
                            <p className="text-[11px] text-emerald-800 italic mt-0.5">
                              Desi Tip: {ex.romanUrduTip}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Start Workout Button */}
              <div className="mt-6 pt-3">
                <button
                  type="button"
                  onClick={() => handleStartWorkout(routine)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Workout Session</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Workout Player Modal */}
      {activeRoutine && currentExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Top Bar inside player */}
            <div className="flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-stone-200 truncate max-w-[200px]">
                  {activeRoutine.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 text-stone-400 hover:text-white"
                  title={soundEnabled ? 'Mute chimes' : 'Enable chimes'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClosePlayer}
                  className="p-1 text-stone-400 hover:text-white"
                  title="Quit workout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Exercise counter & status */}
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-stone-800 text-stone-300">
                {isResting ? 'Breathe & Rest Interval' : `Exercise ${currentExIndex + 1} of ${activeRoutine.exercises.length}`}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
                {isResting ? 'Take a Breath' : currentExercise.name}
              </h3>
              {currentExercise.urduName && (
                <p className="text-sm font-medium text-emerald-400 mt-1">
                  {currentExercise.urduName}
                </p>
              )}
            </div>

            {/* Circular Timer Display */}
            <div className="relative flex items-center justify-center py-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG Ring */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="stroke-stone-800 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className={`fill-none transition-all duration-300 ${
                      isResting ? 'stroke-amber-400' : 'stroke-emerald-500'
                    }`}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 76}
                    strokeDashoffset={
                      2 *
                      Math.PI *
                      76 *
                      (1 -
                        secondsRemaining /
                          (isResting
                            ? activeRoutine.exercises[currentExIndex].restSeconds || 15
                            : currentExercise.durationSeconds || 45))
                    }
                    strokeLinecap="round"
                  />
                </svg>

                {/* Big digits */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold font-mono tabular-nums text-white">
                    {secondsRemaining}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-stone-400 mt-1">
                    {isResting ? 'Rest Seconds' : 'Seconds'}
                  </span>
                </div>
              </div>
            </div>

            {/* Form cues & Roman Urdu tip */}
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 text-xs space-y-2">
              <p className="text-stone-300 leading-relaxed">{currentExercise.instructions}</p>
              {currentExercise.romanUrduTip && (
                <div className="pt-2 border-t border-stone-700 text-emerald-300">
                  <span className="font-bold">Desi Form Tip:</span> {currentExercise.romanUrduTip}
                </div>
              )}
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handlePrevExercise}
                disabled={currentExIndex === 0}
                className="p-3 rounded-full bg-stone-800 text-stone-300 hover:text-white disabled:opacity-30 transition-colors"
                title="Previous exercise"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-4 rounded-full font-bold shadow-lg transition-transform active:scale-95 ${
                  isPlaying ? 'bg-amber-500 text-stone-950' : 'bg-emerald-500 text-white'
                }`}
                title={isPlaying ? 'Pause' : 'Resume'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleNextExercise}
                className="p-3 rounded-full bg-stone-800 text-stone-300 hover:text-white transition-colors"
                title="Skip to next"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Upcoming next exercise preview */}
            {currentExIndex + 1 < activeRoutine.exercises.length && (
              <p className="text-center text-[11px] text-stone-400">
                Up next: <span className="text-stone-200 font-medium">{activeRoutine.exercises[currentExIndex + 1].name}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Workout Completion Modal */}
      {isCompletedModalOpen && activeRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 md:p-8 text-center space-y-5 shadow-2xl border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <Flame className="w-8 h-8 fill-emerald-600" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Shabash! Workout Completed
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
                {activeRoutine.title}
              </h3>
              <p className="text-xs text-stone-600 mt-2">
                Great commitment! Your effort has been logged to your daily streak and calorie burn counter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100 text-center">
              <div>
                <span className="text-xs text-stone-500 font-medium">Session Duration</span>
                <p className="text-xl font-bold font-mono text-stone-900 mt-0.5">
                  {Math.max(1, Math.round(totalSecondsElapsed / 60))} mins
                </p>
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium">Est. Calories Burned</span>
                <p className="text-xl font-bold font-mono text-emerald-800 mt-0.5">
                  {activeRoutine.estCalories} kcal
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  handleClosePlayer();
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                type="button"
                onClick={onOpenPremium}
                className="w-full py-2.5 px-4 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Unlock Custom Workout Generator with Sehat+</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
