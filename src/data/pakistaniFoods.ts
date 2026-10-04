import { PakistaniFoodItem, DesiDietPlan, DesiSmartSwap } from '../types';

export const PAKISTANI_FOOD_DATABASE: PakistaniFoodItem[] = [
  // Roti & Grains
  {
    id: 'food-roti-1',
    name: 'Gandum Ki Roti (Whole Wheat Chapati)',
    urduName: 'گندم کی روٹی',
    category: 'roti_grains',
    defaultServing: '1 medium roti (approx 45g dry flour)',
    servingUnit: 'roti',
    macros: { calories: 120, carbs: 24, protein: 3.8, fat: 0.8 },
    isDesiSuperfood: true,
    glycemicIndex: 'Medium',
    desiTip: 'Rich in dietary fiber; pair with daal or lean meat to keep glycemic response low.'
  },
  {
    id: 'food-roti-tandoori',
    name: 'Tandoori Roti (Clay Oven Plain)',
    urduName: 'تندوری روٹی',
    category: 'roti_grains',
    defaultServing: '1 large tandoori roti',
    servingUnit: 'roti',
    macros: { calories: 160, carbs: 32, protein: 4.8, fat: 1.0 },
    glycemicIndex: 'Medium',
    desiTip: 'Ask tandoor master for "chokar aata" (wheat bran) without ghee brushing.'
  },
  {
    id: 'food-paratha-plain',
    name: 'Plain Paratha (Pan Fried in Ghee/Oil)',
    urduName: 'سادہ پراٹھا',
    category: 'roti_grains',
    defaultServing: '1 standard paratha',
    servingUnit: 'paratha',
    macros: { calories: 290, carbs: 31, protein: 4.2, fat: 16.5 },
    glycemicIndex: 'High',
    desiTip: 'Heavy in hydrogenated oils or ghee; consider switching to a dry phulka lightly rubbed with 1 tsp desi ghee.'
  },
  {
    id: 'food-paratha-aloo',
    name: 'Aloo Paratha (Stuffed Potato Paratha)',
    urduName: 'آلو کا پراٹھا',
    category: 'roti_grains',
    defaultServing: '1 medium stuffed paratha',
    servingUnit: 'paratha',
    macros: { calories: 340, carbs: 46, protein: 5.5, fat: 14.8 },
    glycemicIndex: 'High',
    desiTip: 'High in dense carbs and fats; pair with mint raita instead of achaar to reduce sodium.'
  },
  {
    id: 'food-rice-boiled',
    name: 'Basmati Chawal (Boiled/Steamed White Rice)',
    urduName: 'ابلے ہوئے چاول',
    category: 'roti_grains',
    defaultServing: '1 standard katori / cup (150g cooked)',
    servingUnit: 'cup',
    macros: { calories: 195, carbs: 43, protein: 4.1, fat: 0.6 },
    glycemicIndex: 'High',
    desiTip: 'Drain excess starch water while boiling for a lighter, fluffy texture.'
  },
  {
    id: 'food-biryani-chicken',
    name: 'Sindhi Chicken Biryani (With Potato)',
    urduName: 'سندھی چکن بریانی',
    category: 'roti_grains',
    defaultServing: '1 medium plate (approx 300g)',
    servingUnit: 'plate',
    macros: { calories: 430, carbs: 54, protein: 22.0, fat: 14.5 },
    glycemicIndex: 'High',
    desiTip: 'Enjoy in moderation; fill half your plate with raw kachumber cucumber salad first!'
  },

  // Salan & Curries
  {
    id: 'food-chicken-karahi',
    name: 'Desi Chicken Karahi (Home-Style Tomato Gravy)',
    urduName: 'چکن کڑاہی',
    category: 'salan_curries',
    defaultServing: '1 cup curry (approx 200g with 2 pieces chicken)',
    servingUnit: 'cup',
    macros: { calories: 280, carbs: 6.5, protein: 28.0, fat: 15.5 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Cooked with tomatoes, ginger, and garlic; limit floating oil ("tari") spooned onto your plate.'
  },
  {
    id: 'food-mutton-korma',
    name: 'Mutton Korma (Degi Style with Fried Onion)',
    urduName: 'مٹن قورمہ',
    category: 'salan_curries',
    defaultServing: '1 cup (approx 220g)',
    servingUnit: 'cup',
    macros: { calories: 375, carbs: 9.0, protein: 25.0, fat: 27.0 },
    glycemicIndex: 'Low',
    desiTip: 'Rich in saturated fats from fried onions and oil. Best reserved for cheat meals or active days.'
  },
  {
    id: 'food-beef-nihari',
    name: 'Beef Shank Nihari',
    urduName: 'بیف نہاری',
    category: 'salan_curries',
    defaultServing: '1 medium bowl (approx 250g with gravy)',
    servingUnit: 'bowl',
    macros: { calories: 460, carbs: 14.0, protein: 34.0, fat: 30.0 },
    glycemicIndex: 'Low',
    desiTip: 'Very high protein but flour-thickened and oily; avoid adding extra fried ginger/tarka garnish.'
  },
  {
    id: 'food-haleem',
    name: 'Shahi Beef / Chicken Haleem (Lentil Wheat Stew)',
    urduName: 'حلیم / دلیم',
    category: 'salan_curries',
    defaultServing: '1 medium bowl (approx 250g)',
    servingUnit: 'bowl',
    macros: { calories: 360, carbs: 41.0, protein: 26.0, fat: 10.5 },
    isDesiSuperfood: true,
    glycemicIndex: 'Medium',
    desiTip: 'Super nutrient-dense blend of barley, broken wheat, and 4 lentils. Skip fried onion topping to save 80 kcal.'
  },

  // BBQ & Kababs
  {
    id: 'food-chicken-tikka',
    name: 'Chicken Tikka (Charcoal Grilled Breast Quarter)',
    urduName: 'چکن تکہ (سینہ)',
    category: 'bbq_kababs',
    defaultServing: '1 breast quarter piece (approx 180g)',
    servingUnit: 'piece',
    macros: { calories: 230, carbs: 2.0, protein: 39.0, fat: 7.0 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'The ultimate Desi fitness staple! Lean protein, marinated in yogurt, lemon, and spices with minimal added oil.'
  },
  {
    id: 'food-seekh-kabab',
    name: 'Chicken / Beef Seekh Kabab',
    urduName: 'سیخ کباب',
    category: 'bbq_kababs',
    defaultServing: '2 skewers (approx 140g total)',
    servingUnit: 'servings (2 skewers)',
    macros: { calories: 220, carbs: 4.0, protein: 25.0, fat: 11.5 },
    glycemicIndex: 'Low',
    desiTip: 'Opt for chicken or lean mince without heavy fat fillings. Delicious with pudina (mint) chutney.'
  },
  {
    id: 'food-chapli-kabab',
    name: 'Peshawari Chapli Kabab (Pan Seared)',
    urduName: 'چپلی کباب',
    category: 'bbq_kababs',
    defaultServing: '1 medium kabab (approx 120g)',
    servingUnit: 'kabab',
    macros: { calories: 250, carbs: 5.0, protein: 18.0, fat: 17.5 },
    glycemicIndex: 'Low',
    desiTip: 'Often fried in animal fat; ask for pan-grilling with light oil or air-fry at home.'
  },

  // Lentils & Sabzi
  {
    id: 'food-daal-chana',
    name: 'Daal Chana (Yellow Split Chickpea Curry)',
    urduName: 'دال چنا',
    category: 'lentils_sabzi',
    defaultServing: '1 standard cup / katori (200g)',
    servingUnit: 'cup',
    macros: { calories: 215, carbs: 32.0, protein: 11.5, fat: 4.8 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Outstanding source of plant protein and resistant starch for gut microbiome health.'
  },
  {
    id: 'food-daal-mash',
    name: 'Daal Mash / Urad (White Lentil Dhaba Style)',
    urduName: 'دال ماش فرائی',
    category: 'lentils_sabzi',
    defaultServing: '1 cup / katori (200g)',
    servingUnit: 'cup',
    macros: { calories: 235, carbs: 33.0, protein: 12.5, fat: 6.0 },
    glycemicIndex: 'Low',
    desiTip: 'Substantial protein and iron content; garnish with fresh ginger matchsticks to support digestion.'
  },
  {
    id: 'food-aloo-palak',
    name: 'Palak / Saag with Aloo (Spinach Curry)',
    urduName: 'آلو پالک / ساگ',
    category: 'lentils_sabzi',
    defaultServing: '1 cup (approx 180g)',
    servingUnit: 'cup',
    macros: { calories: 165, carbs: 21.0, protein: 4.8, fat: 6.8 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Spinach provides magnesium, folate, and potassium. Reduce the potato ratio to lower calories further.'
  },
  {
    id: 'food-bhindi-masala',
    name: 'Bhindi Masala (Stir-Fried Okra with Onions)',
    urduName: 'بھنڈی مصالحہ',
    category: 'lentils_sabzi',
    defaultServing: '1 cup (approx 160g)',
    servingUnit: 'cup',
    macros: { calories: 135, carbs: 14.0, protein: 3.2, fat: 7.2 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Soluble mucilage fiber in okra helps regulate post-meal blood sugar levels.'
  },

  // Drinks & Chai
  {
    id: 'food-doodh-patti',
    name: 'Traditional Doodh Patti Chai (Full Milk + 1.5 tsp Sugar)',
    urduName: 'دودھ پتی چائے (چینی کے ساتھ)',
    category: 'drinks_chai',
    defaultServing: '1 standard teacup (180ml)',
    servingUnit: 'cup',
    macros: { calories: 135, carbs: 16.0, protein: 4.2, fat: 6.2 },
    glycemicIndex: 'High',
    desiTip: 'Full-cream milk and refined white sugar add up quickly if drinking 3-4 cups a day.'
  },
  {
    id: 'food-green-chai',
    name: 'Sabz Chai / Kashmiri Kehwa (Cardamom & Cinnamon)',
    urduName: 'سبز قہوہ (الائچی دارچینی)',
    category: 'drinks_chai',
    defaultServing: '1 cup (200ml)',
    servingUnit: 'cup',
    macros: { calories: 8, carbs: 1.5, protein: 0.2, fat: 0.1 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Natural thermogenic; rich in catechins and polyphenols without caffeine crashes.'
  },
  {
    id: 'food-lassi-namkeen',
    name: 'Namkeen Zeera Lassi (Salted Cumin Buttermilk)',
    urduName: 'نمکین زیرہ لسی',
    category: 'drinks_chai',
    defaultServing: '1 tall glass (250ml)',
    servingUnit: 'glass',
    macros: { calories: 95, carbs: 8.0, protein: 5.2, fat: 4.2 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Traditional probiotic digestif; roasted cumin (bhuna zeera) soothes bloating and acid reflux.'
  },
  {
    id: 'food-lassi-meethi',
    name: 'Meethi Malai Lassi (Sweetened Yogurt Drink)',
    urduName: 'میٹھی ملائی دار لسی',
    category: 'drinks_chai',
    defaultServing: '1 tall glass (300ml)',
    servingUnit: 'glass',
    macros: { calories: 275, carbs: 42.0, protein: 7.5, fat: 8.8 },
    glycemicIndex: 'High',
    desiTip: 'Contains 6-8 teaspoons of sugar and heavy clotted cream (malai). Best swapped for namkeen or mint lassi.'
  },

  // Snacks & Dairy
  {
    id: 'food-boiled-egg',
    name: 'Ubla Hua Anda (Hard Boiled Egg)',
    urduName: 'ابلا ہوا انڈہ',
    category: 'snacks_dairy',
    defaultServing: '1 large egg',
    servingUnit: 'egg',
    macros: { calories: 74, carbs: 0.4, protein: 6.3, fat: 5.0 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Complete amino acid profile; quick nashta staple with black pepper and pinch of pink salt.'
  },
  {
    id: 'food-kachumber-salad',
    name: 'Fresh Desi Kachumber Salad (Cucumber, Tomato, Onion, Lemon)',
    urduName: 'کچومبر سلاد',
    category: 'snacks_dairy',
    defaultServing: '1 medium bowl (150g)',
    servingUnit: 'bowl',
    macros: { calories: 42, carbs: 8.5, protein: 1.8, fat: 0.4 },
    isDesiSuperfood: true,
    glycemicIndex: 'Low',
    desiTip: 'Zero oil, high water content, loaded with vitamin C from fresh squeezed leemo.'
  },
  {
    id: 'food-khajoor-dates',
    name: 'Pakistani Aseel / Medjool Dates (Khajoor)',
    urduName: 'کھجور',
    category: 'snacks_dairy',
    defaultServing: '2 medium dates (approx 35g)',
    servingUnit: 'servings (2 dates)',
    macros: { calories: 105, carbs: 27.0, protein: 1.0, fat: 0.2 },
    isDesiSuperfood: true,
    glycemicIndex: 'Medium',
    desiTip: 'Natural potassium, fiber and iron booster. Perfect pre-workout fuel or Sehri/Iftar staple.'
  },
  {
    id: 'food-samosa-aloo',
    name: 'Aloo Samosa (Deep Fried Bakery/Street Style)',
    urduName: 'آلو سموسہ',
    category: 'snacks_dairy',
    defaultServing: '1 standard samosa',
    servingUnit: 'samosa',
    macros: { calories: 260, carbs: 32.0, protein: 4.5, fat: 13.0 },
    glycemicIndex: 'High',
    desiTip: 'Deep fried in reheated commercial oil. Swap for air-fried or home baked patties.'
  }
];

export const DESI_DIET_PLANS: DesiDietPlan[] = [
  {
    id: 'plan-fat-loss',
    name: 'Desi Calorie Deficit (Weight Loss)',
    targetCal: 1550,
    tagline: 'Lose belly fat without giving up home cooked roti, salan, and evening chai',
    description: 'A scientifically structured Pakistani home meal plan designed for sustainable fat loss while maintaining muscle mass and steady energy throughout busy workdays.',
    macrosSplit: { carbs: 45, protein: 30, fat: 25 },
    sampleMenu: {
      breakfast: '1 Gandum Ki Roti (no ghee) + 2 Boiled Eggs with black pepper + 1 cup Elaichi Green Chai',
      lunch: '1 cup Daal Chana or Mash + 1 Roti + 1 bowl Fresh Kachumber Salad with lemon',
      dinner: '1 Breast piece Chicken Tikka or 1 cup Chicken Karahi (skimming excess oil) + 1 Roti or 1 cup Brown Rice',
      snack: '1 cup Doodh Patti (using low-fat milk & no sugar) + 10 Almonds (Badaam)'
    },
    desiSecrets: [
      'Replace fried morning paratha with whole wheat phulka + eggs to immediately eliminate 220 empty calories.',
      'Sip 2 glasses of water 15 minutes before lunch and dinner to prevent overeating salan gravy.',
      'Enjoy evening chai at 5 PM without refined sugar by adding crushed green cardamom and cinnamon quill for natural sweetness.'
    ]
  },
  {
    id: 'plan-high-protein',
    name: 'High-Protein Pehlwani Strength Plan',
    targetCal: 2150,
    tagline: 'Desi muscle builder using lean chicken, lentils, eggs, and dairy',
    description: 'Designed for men and women doing home strength workouts who want toned muscle, power recovery, and sustained metabolic rate using accessible Pakistani ingredients.',
    macrosSplit: { carbs: 40, protein: 35, fat: 25 },
    sampleMenu: {
      breakfast: '3 Eggs (2 whole + 1 white) scrambled with tomatoes & green chillies + 1 Whole Wheat Roti + 1 glass Skim Milk',
      lunch: '1.5 cups Shahi Haleem or Daal + 1 Chicken Seekh Kabab + Kachumber Salad',
      dinner: '200g Charcoal Chicken Tikka Boti + 1 Tandoori Roti (no butter) + Fresh Mint Raita',
      snack: '1 glass Namkeen Zeera Lassi + 2 Khajoor (Dates) + 15 Roasted Chickpeas (Bhuna Chana)'
    },
    desiSecrets: [
      'Bhuna Chana (roasted black gram) is one of the highest protein-per-rupee snacks in Pakistan (approx 20g protein per 100g).',
      'Haleem and Daal provide slow-digesting complex carbs and amino acids that feed muscles overnight.',
      'Keep chicken breast cuts stocked for quick tawa stir-fries with garlic and crushed red pepper.'
    ]
  },
  {
    id: 'plan-diabetic-friendly',
    name: 'Diabetic & Insulin Health Desi Plate',
    targetCal: 1650,
    tagline: 'Stabilize blood glucose with high-fiber chokar roti, okra, and fenugreek',
    description: 'Tailored to combat the high prevalence of Type-2 diabetes and insulin resistance in South Asian families. Emphasizes low-glycemic carbs, soluble fiber, and herbal glucose regulators.',
    macrosSplit: { carbs: 35, protein: 30, fat: 35 },
    sampleMenu: {
      breakfast: 'Besan Ka Chilla (Gram flour savory pancake) with chopped onions & coriander + 1 boiled egg + unsweetened black tea',
      lunch: '1 cup Bhindi Masala (Okra) or Karela Gosht + 1 Multigrain Bran Roti + Cucumbers',
      dinner: '1 cup Palak Gosht (Spinach & Lean Mutton) + 1/2 cup Daal + Big fresh salad',
      snack: '1 cup Methi Daana (fenugreek) warm tea or Green tea + handful of walnuts (Akhroot)'
    },
    desiSecrets: [
      'Add 25% barley or chickpea (besan) flour to regular whole wheat flour to slash the glycemic index of your daily roti.',
      'Include Karela (Bitter Gourd) and Bhindi (Okra) twice a week; both contain compounds that mimic insulin activity.',
      'Take a 10-minute "Chahal Qadmi" (brisk walk) immediately following dinner to blunt postprandial glucose spikes.'
    ]
  },
  {
    id: 'plan-ramadan-fasting',
    name: 'Ramadan / Roza Healthy Fasting Plan',
    targetCal: 1800,
    tagline: 'Maintain energy, avoid lethargy, and prevent post-Iftar acidity during fasts',
    description: 'Formulated for Ramadan or Sunnah fasting. Prevents dehydration, gastric bloating from pakoras, and provides sustained slow-release energy from Sehri to Iftar.',
    macrosSplit: { carbs: 45, protein: 25, fat: 30 },
    sampleMenu: {
      breakfast: 'SEHRI: 1 Wheat Roti with 1 tsp Desi Ghee + 2 Eggs + 1 bowl Sweetened Yogurt / Curd + 3 glasses of Water',
      lunch: 'FASTING PERIOD: Rest and deep breathing during midday heat',
      dinner: 'IFTAR: 1 Date (Khajoor) + 2 glasses Lemon-Mint Water + Fresh Fruit Chaat (no sugar) + 1 Grilled Chicken Tikka + 1 Roti',
      snack: 'POST-TARAWIH: 1 glass Namkeen Lassi or warm Cinnamon Milk + 5-6 Almonds'
    },
    desiSecrets: [
      'Dahi (Plain Yogurt) at Sehri holds water in your digestive tract and prevents thirst during hot afternoon hours.',
      'Avoid commercial syrupy red drinks (Rooh Afza) which cause severe reactive hypoglycemia 1 hour into your fast.',
      'Limit deep-fried pakoras to 1-2 pieces max, and bake or air-fry samosa sheets instead of deep swimming them in oil.'
    ]
  }
];

export const DESI_SMART_SWAPS: DesiSmartSwap[] = [
  {
    id: 'swap-1',
    originalFood: '2 Fried Ghee Parathas at Nashta',
    originalCalories: 580,
    healthySwap: '2 Whole Wheat Phulkas + 1 tsp Pure Desi Ghee',
    swapCalories: 275,
    savedCalories: 305,
    benefit: 'Saves 305 kcal and 20g of hydrogenated vegetable fats while giving you clean whole grain fiber.'
  },
  {
    id: 'swap-2',
    originalFood: '3 Cups Doodh Patti Chai with 2 tsp Sugar',
    originalCalories: 450,
    healthySwap: 'Sabz Elaichi Chai or Skim Milk Chai (Zero Sugar)',
    swapCalories: 90,
    savedCalories: 360,
    benefit: 'Eliminates 6 teaspoons of refined sucrose daily, reversing fatty liver risk and curbing insulin spikes.'
  },
  {
    id: 'swap-3',
    originalFood: 'Chicken Karahi with 1 inch Floating Oil ("Tari")',
    originalCalories: 440,
    healthySwap: 'Home Tawa Bhuna Chicken Tikka Boti',
    swapCalories: 230,
    savedCalories: 210,
    benefit: 'Doubles the protein-to-fat ratio; zero oily heaviness or evening acidity.'
  },
  {
    id: 'swap-4',
    originalFood: 'Tall Glass of Commercial Sweet Malai Lassi',
    originalCalories: 290,
    healthySwap: 'Chilled Namkeen Zeera & Pudina (Mint) Buttermilk',
    swapCalories: 85,
    savedCalories: 205,
    benefit: 'Natural cooling electrolytes and live probiotic cultures for digestive comfort without sugar spikes.'
  },
  {
    id: 'swap-5',
    originalFood: 'Plate of Deep Fried Samosas & Pakoras',
    originalCalories: 520,
    healthySwap: 'Spiced Air-Fried Chickpeas (Chole) & Kachumber',
    swapCalories: 190,
    savedCalories: 330,
    benefit: 'Loaded with plant protein and fiber, completely eliminating trans-fat grease.'
  }
];
