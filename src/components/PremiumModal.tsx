import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, HeartHandshake, PhoneCall } from 'lucide-react';
import { UserSubscription } from '../types';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: UserSubscription;
  onUpdateSubscription: (sub: UserSubscription) => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  subscription,
  onUpdateSubscription
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'card'>('jazzcash');
  const [accountNumber, setAccountNumber] = useState('0300 1234567');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpdateSubscription({
        isPremium: true,
        plan: selectedPlan,
        renewalDate: selectedPlan === 'yearly' ? '2027-10-04' : '2026-11-04'
      });
      setSuccessMsg('Welcome to Sehat+! All premium features & ad-free experience unlocked.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1400);
    }, 900);
  };

  const handleCancelSubscription = () => {
    onUpdateSubscription({ isPremium: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-stone-200">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Sehat+ Member Club
          </div>
          <h3 className="text-2xl font-bold font-display tracking-tight text-white">Upgrade to Sehat+</h3>
          <p className="text-xs text-emerald-100 max-w-xs mx-auto mt-1">
            Empower your health with zero distractions, personalized Desi nutrition, and expert guidance.
          </p>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {successMsg ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <p className="text-base font-bold text-stone-900">{successMsg}</p>
            </div>
          ) : (
            <>
              {/* Status if already active */}
              {subscription.isPremium && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Active Plan</span>
                    <p className="text-sm font-semibold text-emerald-800">
                      Sehat+ {subscription.plan === 'yearly' ? 'Annual (Rs. 4,990/yr)' : 'Monthly (Rs. 890/mo)'}
                    </p>
                    <p className="text-xs text-emerald-600">Renews on {subscription.renewalDate}</p>
                  </div>
                  <button
                    onClick={handleCancelSubscription}
                    className="text-xs text-rose-600 hover:text-rose-800 underline font-medium"
                  >
                    Switch to Free
                  </button>
                </div>
              )}

              {/* Feature list */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Everything in Sehat+</h4>
                <div className="grid grid-cols-1 gap-2 text-xs text-stone-700">
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>100% Ad-Free Experience:</strong> Clean, distraction-free health dashboard</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Desi AI Nutritionist & Dietitian:</strong> Real-time meal reviews, healthy salan modifications</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Ramadan Fasting Tracker:</strong> Sehri & Iftar hydration timers, energy sustaining plans</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Weekly Bazaar Grocery Exporter:</strong> Automatically compiles clean produce list</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Unlimited Streak Shield:</strong> 3 monthly streak freezes so life events don't break your flame</span>
                  </div>
                </div>
              </div>

              {/* Plan selection */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Choose Billing Cycle</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('yearly')}
                    className={`relative p-4 rounded-2xl border text-left transition-all ${
                      selectedPlan === 'yearly'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Save 53%
                    </span>
                    <span className="block text-xs font-semibold text-stone-500">Yearly Best Value</span>
                    <span className="block text-xl font-bold text-stone-900 mt-1">Rs. 4,990</span>
                    <span className="block text-[11px] text-stone-500 mt-0.5">Rs. 415 / month, billed annually</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('monthly')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPlan === 'monthly'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-stone-500">Monthly Flexible</span>
                    <span className="block text-xl font-bold text-stone-900 mt-1">Rs. 890</span>
                    <span className="block text-[11px] text-stone-500 mt-0.5">Billed monthly, cancel anytime</span>
                  </button>
                </div>
              </div>

              {/* Payment methods */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Local Pakistani Payment</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    JazzCash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === 'easypaisa'
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Easypaisa
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Cards / PayPak
                  </button>
                </div>

                <div className="mt-3">
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    {paymentMethod === 'card' ? 'Card Number' : `${paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} Mobile Number`}
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    placeholder="03XX XXXXXXX"
                  />
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing securely...</span>
                  ) : (
                    <>
                      <span>{subscription.isPremium ? 'Update Sehat+ Subscription' : `Activate Sehat+ (${selectedPlan === 'yearly' ? 'Rs. 4,990/yr' : 'Rs. 890/mo'})`}</span>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    100% Secure Checkout
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                    Cancel Anytime
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
