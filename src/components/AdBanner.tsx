import React, { useState } from 'react';
import { Sparkles, X, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  isPremium: boolean;
  onUpgradeClick: () => void;
  variant?: 'banner' | 'card';
}

const SPONSORS = [
  {
    brand: 'Tapal Green Tea',
    tagline: 'Pure Elaichi & Jasmine Detox · 0 Calories',
    description: 'Boost your metabolism after heavy meals with authentic whole leaf green tea.',
    cta: 'Explore Wellness Blends',
    badge: 'Health Partner'
  },
  {
    brand: 'Mehran Himalayan Pink Salt',
    tagline: '84 Trace Minerals for Natural Hydration',
    description: 'Replace processed table salt with unrefined mineral salt for cellular hydration.',
    cta: 'Learn Mineral Benefits',
    badge: 'Nutrition Sponsor'
  },
  {
    brand: 'Khaadi Activewear',
    tagline: 'Breathable Pakistani Home Workout Essentials',
    description: 'Lightweight stretch fabrics engineered for humid climates and living room mobility.',
    cta: 'View Collection',
    badge: 'Fitness Partner'
  },
  {
    brand: 'Shangrila Apple Cider Vinegar',
    tagline: 'Traditional Raw Mother Vinegar for Digestion',
    description: 'A morning spoonful in warm water helps balance post-meal blood sugar levels.',
    cta: 'Healthy Living Guide',
    badge: 'Wellness Sponsor'
  }
];

export const AdBanner: React.FC<AdBannerProps> = ({ isPremium, onUpgradeClick, variant = 'banner' }) => {
  const [dismissed, setDismissed] = useState(false);
  const [sponsorIndex, setSponsorIndex] = useState(0);

  if (isPremium || dismissed) {
    return null;
  }

  const sponsor = SPONSORS[sponsorIndex];

  const handleNextSponsor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSponsorIndex((prev) => (prev + 1) % SPONSORS.length);
  };

  if (variant === 'card') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 to-stone-100 p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="uppercase text-[10px] tracking-wider text-stone-500 font-semibold">Sponsored</span>
            <span aria-hidden="true">·</span>
            <span>{sponsor.badge}</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-stone-400 hover:text-stone-600 p-1 -mr-1"
            title="Dismiss ad"
            aria-label="Dismiss ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h4 className="text-base font-bold text-stone-900 tracking-tight">{sponsor.brand}</h4>
        <p className="text-xs font-semibold text-emerald-800 mt-0.5">{sponsor.tagline}</p>
        <p className="text-xs text-stone-600 mt-2 leading-relaxed">{sponsor.description}</p>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-200">
          <button
            onClick={handleNextSponsor}
            className="text-xs text-stone-600 hover:text-stone-900 underline font-medium"
          >
            Next Partner
          </button>
          <button
            onClick={onUpgradeClick}
            className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold hover:text-amber-800"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Remove Ads with Sehat+</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Sponsored wellness recommendations" className="w-full bg-stone-100 border-b border-stone-200 py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap text-stone-700">
          <span className="font-semibold text-[10px] tracking-wider uppercase text-stone-500 bg-stone-200 px-1.5 py-0.5 rounded">
            Partner
          </span>
          <span className="font-bold text-stone-900">{sponsor.brand}:</span>
          <span className="text-stone-600 hidden md:inline">{sponsor.tagline}</span>
          <span className="text-emerald-700 font-medium cursor-pointer hover:underline inline-flex items-center gap-0.5" onClick={handleNextSponsor}>
            <span>{sponsor.cta}</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        <div className="flex items-center gap-4 text-stone-500">
          <button
            onClick={onUpgradeClick}
            className="text-stone-700 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Go Ad-Free with Sehat+</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-stone-400 hover:text-stone-700 p-0.5"
            title="Dismiss ad"
            aria-label="Dismiss ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
