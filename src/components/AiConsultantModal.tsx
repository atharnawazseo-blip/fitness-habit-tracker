import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onOpenPremium: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

const PRESET_QUESTIONS = [
  'How to make Chicken Karahi healthy with less oil?',
  'What should I eat at Sehri so I do not feel thirsty all day?',
  'Budget high-protein Pakistani snacks (besides expensive whey)?',
  'I have stiff knees from desk work; what home moves help?'
];

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  onOpenPremium
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Assalam-o-Alaikum! I am your SehatSync Desi Nutrition & Home Fitness Advisor. Ask me anything about Pakistani food calibrations, healthy salan cooking, home bodyweight strength, or sleep hygiene!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Try Gemini API if available
      // Note: In AI studio environment, GEMINI_API_KEY is available in backend or env
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).__GEMINI_API_KEY__;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are an expert Pakistani sports nutritionist and home fitness coach named "Coach Tariq" in SehatSync. 
Provide warm, culturally accurate, actionable advice referencing authentic Pakistani foods (Roti, Daal, Karahi, Tikka, Doodh Patti, Zeera, Haldi Doodh) and zero-equipment home exercises (Baithak, Hindu Dand, Chahal Qadmi).
Keep your tone encouraging, concise, and structured with bullet points.
User question: "${textToSend}"`
        });
        const reply = response.text || 'Keep up your daily streak and drink plenty of water!';
        setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      } else {
        // Fallback intelligent domain responses
        setTimeout(() => {
          let reply = '';
          const q = textToSend.toLowerCase();

          if (q.includes('karahi') || q.includes('oil') || q.includes('salan')) {
            reply = `To make Chicken Karahi healthy without losing flavor:
1. **Reduce the Cooking Oil:** Traditional restaurants use 1/2 cup ghee. Use 1.5 tablespoons of pure olive or mustard oil.
2. **Double the Ginger & Garlic (Adrak-Lehsan):** They build a thick, flavorful masala base without needing heavy grease.
3. **Use Desi Tomatoes:** Simmer 4 ripe chopped tomatoes with cumin, crushed red pepper, and black pepper until the natural sauce thickens.
4. **Skip the "Tari" (Floating Oil):** When serving, spoon the tender chicken pieces and tomato masala, leaving the excess puddle of oil in the tawa!`;
          } else if (q.includes('sehri') || q.includes('roza') || q.includes('fasting') || q.includes('thirsty')) {
            reply = `Best Sehri Routine for Zero Thirst & High Energy:
1. **Plain Dahi (Yogurt):** Eat 1 cup of unsweetened yogurt. The slow-digesting casein protein and high moisture bind water in your digestive tract.
2. **Whole Grain Phulka + Eggs:** 1 whole wheat chapati with 2 eggs (scrambled with tomatoes & green chilies) provides 5+ hours of steady glycogen.
3. **Tukh Malanga (Chia / Basil Seeds):** Mix 1 teaspoon of soaked basil seeds in your final glass of water. They absorb 10x their weight in water for cellular release.
4. **Avoid Salty Paratha & Commercial Syrups:** High sodium and sugar pull water from your cells, causing intense thirst by 11:00 AM.`;
          } else if (q.includes('protein') || q.includes('budget') || q.includes('snack')) {
            reply = `Top Affordable Pakistani High-Protein Foods:
1. **Bhuna Chana (Roasted Black Gram):** Approx 20g protein per 100g, very inexpensive at local dry fruit / pansari shops!
2. **Whole Eggs (Anday):** 6-7g protein per boiled egg. Pair 2 boiled eggs with salt and pepper for a quick 13g protein boost.
3. **Daal Mash & Daal Chana:** Soak lentils overnight to reduce phytates and boost protein bioavailability.
4. **Namkeen Zeera Lassi:** Homemade with skim curd provides ~7g protein with cooling probiotics.
5. **Chicken Mince (Qeema):** Fast-cooking lean chicken breast mince on a dry tawa with green chillies.`;
          } else {
            reply = `Great health question! In the SehatSync philosophy:
• Consistency in 15-20 minutes of daily home bodyweight movement (Baithak squats, Incline Pushups) beats sporadic intense gym visits.
• Target 2.5 to 3 Liters of clean water daily with a pinch of Himalayan pink salt.
• Swap refined sugar in evening tea for fragrant green cardamom and cinnamon kehwa.
• Walk 100-200 steps (Chahal Qadmi) after dinner to normalize post-meal insulin.`;
          }

          setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
          setIsLoading(false);
        }, 750);
        return;
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Consistency is your greatest superpower! Focus on drinking 8 glasses of water today and finishing 15 minutes of home Baithak squats.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-stone-200 flex flex-col h-[650px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-4 px-6 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">SehatSync AI Coach</h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                  Desi Diet & Fitness
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">Culturally calibrated South Asian wellness guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.role === 'user' ? 'bg-stone-900 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-none'
                    : 'bg-stone-100 text-stone-800 border border-stone-200/80 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-stone-500 italic p-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span>Coach Tariq is preparing customized Desi advice...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-stone-100 bg-stone-50 overflow-x-auto flex gap-1.5 scrollbar-none">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium text-stone-600 bg-white hover:bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-lg whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about Desi meals, squats, or fasting..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
