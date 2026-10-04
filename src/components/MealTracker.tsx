import React, { useState } from 'react';
import { 
  Plus, Trash2, Search, Sparkles, Check, 
  ArrowRight, ShieldCheck, Flame, Utensils
} from 'lucide-react';
import { PakistaniFoodItem, LoggedMealItem, DesiDietPlan } from '../types';
import { PAKISTANI_FOOD_DATABASE, DESI_DIET_PLANS, DESI_SMART_SWAPS } from '../data/pakistaniFoods';
import { APP_IMAGES } from '../assets/images';

interface MealTrackerProps {
  mealLogs: LoggedMealItem[];
  onAddMeal: (item: LoggedMealItem) => void;
  onRemoveMeal: (id: string) => void;
  onOpenPremium: () => void;
  isPremium: boolean;
}

export const MealTracker: React.FC<MealTrackerProps> = ({
  mealLogs,
  onAddMeal,
  onRemoveMeal,
  onOpenPremium
}) => {
  const [activeTab, setActiveTab] = useState<'log' | 'plans' | 'swaps'>('log');
  const [activeMealType, setActiveMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<PakistaniFoodItem | null>(null);
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);

  // Target macros (default or customized by diet plan)
  const [targetCalories, setTargetCalories] = useState<number>(1750);
  const [targetCarbs, setTargetCarbs] = useState<number>(190);
  const [targetProtein, setTargetProtein] = useState<number>(100);
  const [targetFat, setTargetFat] = useState<number>(55);
  const [appliedPlanName, setAppliedPlanName] = useState<string>('Custom Pakistani Balanced');

  // Custom food creator state
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCal, setCustomCal] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customFat, setCustomFat] = useState('');

  // Calculate totals
  const totalCalories = mealLogs.reduce((acc, m) => acc + m.macros.calories, 0);
  const totalCarbs = Math.round(mealLogs.reduce((acc, m) => acc + m.macros.carbs, 0));
  const totalProtein = Math.round(mealLogs.reduce((acc, m) => acc + m.macros.protein, 0));
  const totalFat = Math.round(mealLogs.reduce((acc, m) => acc + m.macros.fat, 0));

  // Filtered foods for modal
  const filteredFoods = PAKISTANI_FOOD_DATABASE.filter((food) => {
    if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      food.name.toLowerCase().includes(q) ||
      (food.urduName && food.urduName.includes(q)) ||
      (food.desiTip && food.desiTip.toLowerCase().includes(q))
    );
  });

  const handleOpenAddModal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setActiveMealType(mealType);
    setSelectedFood(null);
    setServingMultiplier(1);
    setIsAddModalOpen(true);
  };

  const handleConfirmAddFood = () => {
    if (!selectedFood) return;
    const newItem: LoggedMealItem = {
      id: 'meal-' + Date.now(),
      foodId: selectedFood.id,
      name: selectedFood.name,
      mealType: activeMealType,
      servings: servingMultiplier,
      servingText: `${servingMultiplier}x ${selectedFood.defaultServing}`,
      macros: {
        calories: Math.round(selectedFood.macros.calories * servingMultiplier),
        carbs: Math.round(selectedFood.macros.carbs * servingMultiplier),
        protein: Math.round(selectedFood.macros.protein * servingMultiplier),
        fat: Math.round(selectedFood.macros.fat * servingMultiplier)
      },
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onAddMeal(newItem);
    setIsAddModalOpen(false);
    setSelectedFood(null);
  };

  const handleCreateCustomFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customCal) return;
    const newItem: LoggedMealItem = {
      id: 'custom-meal-' + Date.now(),
      foodId: 'custom-' + Date.now(),
      name: customName,
      mealType: activeMealType,
      servings: 1,
      servingText: '1 custom serving',
      macros: {
        calories: Number(customCal) || 0,
        carbs: Number(customCarbs) || 0,
        protein: Number(customProtein) || 0,
        fat: Number(customFat) || 0
      },
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onAddMeal(newItem);
    setIsCustomModalOpen(false);
    setCustomName('');
    setCustomCal('');
    setCustomCarbs('');
    setCustomProtein('');
    setCustomFat('');
  };

  const handleApplyDietPlan = (plan: DesiDietPlan) => {
    setTargetCalories(plan.targetCal);
    // calculate targets based on split
    const carbCals = (plan.targetCal * plan.macrosSplit.carbs) / 100;
    const proteinCals = (plan.targetCal * plan.macrosSplit.protein) / 100;
    const fatCals = (plan.targetCal * plan.macrosSplit.fat) / 100;
    setTargetCarbs(Math.round(carbCals / 4));
    setTargetProtein(Math.round(proteinCals / 4));
    setTargetFat(Math.round(fatCals / 9));
    setAppliedPlanName(plan.name);
    setActiveTab('log');
  };

  const renderMealSlot = (
    title: string,
    subtitle: string,
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ) => {
    const items = mealLogs.filter((m) => m.mealType === type);
    const slotCal = items.reduce((acc, m) => acc + m.macros.calories, 0);

    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h4 className="text-base font-bold text-stone-900">{title}</h4>
            <p className="text-xs text-stone-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-700 tabular-nums">
              {slotCal} kcal
            </span>
            <button
              type="button"
              onClick={() => handleOpenAddModal(type)}
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Food</span>
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-xs text-stone-400 italic py-2">Nothing logged yet for this meal.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100/80 transition-colors text-xs"
              >
                <div>
                  <p className="font-semibold text-stone-900">{item.name}</p>
                  <p className="text-[11px] text-stone-500">
                    {item.servingText} · C: {item.macros.carbs}g · P: {item.macros.protein}g · F: {item.macros.fat}g
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-stone-800 tabular-nums">
                    {item.macros.calories} kcal
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveMeal(item.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="space-y-8">
      {/* Visual Subheader Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-6 md:p-8 shadow-lg">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            <span>Pakistani Nutrition</span>
            <span aria-hidden="true">·</span>
            <span>Accurate Desi Macros</span>
            <span aria-hidden="true">·</span>
            <span>Real Local Diets</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">
            Desi Meals & Diet Plans: Eat Clean Without Starving
          </h2>
          <p className="mt-2 text-stone-300 text-xs md:text-sm leading-relaxed">
            No need to switch to plain boiled salads. Track real Pakistani home cooking — Roti, Daal, Karahi, Tikka, and Chai — with localized portion calibrations and healthy swap alternatives.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden md:block">
          <img
            src={APP_IMAGES.healthyFood}
            alt="Pakistani healthy meal"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-stone-200/70 rounded-xl self-start max-w-md">
        <button
          onClick={() => setActiveTab('log')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'log' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Today's Meal Log
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'plans' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Desi Diet Plans
        </button>
        <button
          onClick={() => setActiveTab('swaps')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'swaps' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Smart Swaps
        </button>
      </div>

      {/* TAB 1: MEAL LOG */}
      {activeTab === 'log' && (
        <div className="space-y-6">
          {/* Daily Nutrition Gauge Card */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Target: {appliedPlanName}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                    {totalCalories}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">/ {targetCalories} kcal</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCustomModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium"
                >
                  + Add Custom Dish
                </button>
                <button
                  onClick={onOpenPremium}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI Dietitian Advice</span>
                </button>
              </div>
            </div>

            {/* Macro bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              {/* Carbs */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Carbohydrates</span>
                  <span className="tabular-nums text-stone-500">
                    {totalCarbs}g / {targetCarbs}g
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalCarbs / targetCarbs) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Protein */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Protein (Pehlwani Target)</span>
                  <span className="tabular-nums text-stone-500">
                    {totalProtein}g / {targetProtein}g
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalProtein / targetProtein) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Fats */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Fats (Ghee/Oil Control)</span>
                  <span className="tabular-nums text-stone-500">
                    {totalFat}g / {targetFat}g
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalFat / targetFat) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Meal Slots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderMealSlot('Nashta (Breakfast)', 'Whole grains, eggs, and unsweetened tea', 'breakfast')}
            {renderMealSlot('Dopahar Ka Khana (Lunch)', 'Roti, daal, fresh vegetables & salad', 'lunch')}
            {renderMealSlot('Raat Ka Khana (Dinner)', 'Lean chicken or mutton salan, light phulka', 'dinner')}
            {renderMealSlot('Asr Chai & Snacks', 'Green tea, roasted gram (bhuna chana), or fruit', 'snack')}
          </div>
        </div>
      )}

      {/* TAB 2: CURATED DESI DIET PLANS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-stone-900">Curated Pakistani Diet Frameworks</h3>
              <p className="text-xs text-stone-500">Designed by South Asian sports nutritionists for realistic daily adherence</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DESI_DIET_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider">
                      Daily Target: {plan.targetCal} kcal
                    </span>
                    <span className="tabular-nums">
                      {plan.macrosSplit.carbs}% C · {plan.macrosSplit.protein}% P · {plan.macrosSplit.fat}% F
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-display text-stone-900 mt-2">
                    {plan.name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{plan.tagline}</p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{plan.description}</p>

                  {/* Sample Menu */}
                  <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 text-xs">
                    <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block">
                      Sample Pakistani Day:
                    </span>
                    <div className="grid grid-cols-1 gap-1.5 text-stone-700">
                      <div><strong className="text-stone-900">Nashta:</strong> {plan.sampleMenu.breakfast}</div>
                      <div><strong className="text-stone-900">Lunch:</strong> {plan.sampleMenu.lunch}</div>
                      <div><strong className="text-stone-900">Dinner:</strong> {plan.sampleMenu.dinner}</div>
                      <div><strong className="text-stone-900">Sham Chai:</strong> {plan.sampleMenu.snack}</div>
                    </div>
                  </div>

                  {/* Secrets */}
                  <div className="mt-3 space-y-1 text-[11px] text-stone-600">
                    <span className="font-semibold text-stone-700">Desi Adherence Secrets:</span>
                    {plan.desiSecrets.map((secret, i) => (
                      <p key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{secret}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleApplyDietPlan(plan)}
                    className="py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Adopt This Plan</span>
                  </button>
                  <span className="text-[11px] text-stone-400">Sets your daily targets</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SMART SWAPS */}
      {activeTab === 'swaps' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900">Desi Smart Calorie Swaps</h3>
            <p className="text-xs text-stone-500">
              Small tweaks to traditional recipes that save hundreds of empty calories without giving up flavor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DESI_SMART_SWAPS.map((swap) => (
              <div
                key={swap.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Saves ~{swap.savedCalories} kcal
                  </span>
                  <Flame className="w-4 h-4 text-amber-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="text-[10px] font-bold uppercase text-rose-700">Instead of:</span>
                    <p className="font-semibold text-stone-900 mt-0.5">{swap.originalFood}</p>
                    <p className="text-stone-500 font-mono text-[11px] mt-1">{swap.originalCalories} kcal</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] font-bold uppercase text-emerald-700">Enjoy This:</span>
                    <p className="font-semibold text-stone-900 mt-0.5">{swap.healthySwap}</p>
                    <p className="text-emerald-800 font-mono text-[11px] mt-1">{swap.swapCalories} kcal</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <strong className="text-stone-800">Why it works:</strong> {swap.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOD PICKER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Log to {activeMealType.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold font-display text-stone-900">
                  Select Pakistani Food Item
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
              >
                ✕
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="py-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search (e.g. Roti, Daal, Karahi, Tikka, Chai, Biryani...)"
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {(
                  [
                    { key: 'all', label: 'All Items' },
                    { key: 'roti_grains', label: 'Roti & Grains' },
                    { key: 'salan_curries', label: 'Curries & Salan' },
                    { key: 'bbq_kababs', label: 'BBQ & Kababs' },
                    { key: 'lentils_sabzi', label: 'Daal & Sabzi' },
                    { key: 'drinks_chai', label: 'Chai & Lassi' },
                    { key: 'snacks_dairy', label: 'Eggs & Snacks' }
                  ] as const
                ).map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedCategory(c.key)}
                    className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === c.key
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Foods List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredFoods.map((food) => {
                const isSelected = selectedFood?.id === food.id;
                return (
                  <div
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-xs">{food.name}</span>
                          {food.urduName && (
                            <span className="text-xs text-stone-500 font-urdu">{food.urduName}</span>
                          )}
                          {food.isDesiSuperfood && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                              Clean
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Serving: {food.defaultServing} · C: {food.macros.carbs}g · P: {food.macros.protein}g · F: {food.macros.fat}g
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-stone-900 tabular-nums">
                          {food.macros.calories} kcal
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Serving Multiplier & Add Action */}
            {selectedFood && (
              <div className="pt-4 mt-2 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-700">Portion Size:</span>
                  <div className="flex items-center gap-1">
                    {[0.5, 1, 1.5, 2].map((mult) => (
                      <button
                        key={mult}
                        type="button"
                        onClick={() => setServingMultiplier(mult)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                          servingMultiplier === mult
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {mult}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <span className="text-xs font-bold text-stone-900 tabular-nums">
                    Total: {Math.round(selectedFood.macros.calories * servingMultiplier)} kcal
                  </span>
                  <button
                    type="button"
                    onClick={handleConfirmAddFood}
                    className="py-2 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-sm transition-colors"
                  >
                    Add to {activeMealType}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CUSTOM DISH CREATOR MODAL */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-200">
            <h3 className="text-lg font-bold font-display text-stone-900 mb-1">
              Add Custom Family Recipe
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Log your family's specific salan, tawa dish, or home preparation
            </p>

            <form onSubmit={handleCreateCustomFood} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ammi Ki Bhindi Masala"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Estimated Calories</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 240"
                    value={customCal}
                    onChange={(e) => setCustomCal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 8"
                    value={customFat}
                    onChange={(e) => setCustomFat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-semibold hover:bg-emerald-900 transition-colors"
                >
                  Save & Log Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
