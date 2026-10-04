import { WorkoutRoutine } from '../types';

export const WORKOUT_ROUTINES: WorkoutRoutine[] = [
  // 1. Beginner - Full Body: Ghar Ki Buniyaad (Home Foundation)
  {
    id: 'beg-full-body-1',
    title: 'Ghar Ki Buniyaad: Low-Impact Full Body',
    subtitle: 'Gentle on joints, zero equipment, perfect for starting your fitness journey',
    intensity: 'beginner',
    muscleGroup: 'full_body',
    totalDurationMin: 15,
    estCalories: 110,
    equipmentNeeded: 'None (Bodyweight / Living room floor)',
    description: 'A welcoming, zero-impact routine to awaken your cardiovascular system, core, and posture without jumping or stressing knees.',
    exercises: [
      {
        id: 'b1-1',
        name: 'Warmup Shoulder Rolls & Arm Reaches',
        urduName: 'Kandhon Ka Warmup',
        targetMuscle: 'Shoulders & Upper Back',
        durationSeconds: 45,
        restSeconds: 15,
        instructions: 'Stand tall with feet shoulder-width apart. Roll shoulders back in slow circles for 20 seconds, then reach overhead alternating arms.',
        romanUrduTip: 'Gardan ko aaraam se seedha rakhein aur gehra saans lein.',
        formCues: ['Keep spine tall', 'Do not shrug neck', 'Breathe through nose']
      },
      {
        id: 'b1-2',
        name: 'Chair Squats / Box Squats',
        urduName: 'Kursi Wali Baithak',
        targetMuscle: 'Quads & Glutes',
        durationSeconds: 45,
        reps: 12,
        restSeconds: 20,
        instructions: 'Stand in front of a sofa or sturdy chair. Hinge your hips back, lower until your glutes touch the seat lightly, then press through your heels to stand.',
        romanUrduTip: 'Ghutnay aagay na le kar jayein, peeth seedhi rakhein jaisay kursi par baith rahay hoon.',
        formCues: ['Chest remains open', 'Knees track over toes', 'Squeeze glutes at top']
      },
      {
        id: 'b1-3',
        name: 'Incline Wall Pushups',
        urduName: 'Deewar Pushups',
        targetMuscle: 'Chest & Triceps',
        durationSeconds: 40,
        reps: 12,
        restSeconds: 20,
        instructions: 'Face a wall at arm\'s length. Place hands flat against the wall at shoulder height. Bend elbows at 45 degrees to bring chest towards wall, then push back smoothly.',
        romanUrduTip: 'Kohniyan 45 degree par rakhein, jism ko bilkul seedha board ki tarah rakhein.',
        formCues: ['Tighten abdominal core', 'Controlled 2-second descent', 'Full elbow extension']
      },
      {
        id: 'b1-4',
        name: 'Standing High Knees (Low Impact)',
        urduName: 'Ghutnay Upar March',
        targetMuscle: 'Hip Flexors & Core',
        durationSeconds: 45,
        restSeconds: 15,
        instructions: 'March steadily in place, driving each knee up towards hip level while pumping opposite arms. No jumping required.',
        romanUrduTip: 'Har martaba pait ko andar kheench kar ghutna upar uthayein.',
        formCues: ['Land softly on balls of feet', 'Maintain steady breathing rhythm', 'Engage lower abs']
      },
      {
        id: 'b1-5',
        name: 'Standing Good Mornings',
        urduName: 'Pusht Ka Stretch',
        targetMuscle: 'Hamstrings & Lower Back',
        durationSeconds: 40,
        reps: 10,
        restSeconds: 20,
        instructions: 'Hands behind your head, knees softly bent. Push your hips back while keeping your spine straight until you feel a gentle stretch in the backs of your thighs.',
        romanUrduTip: 'Kamar ko gol mat karein, hips peechay dhakelein.',
        formCues: ['Neutral spine', 'Weight on mid-foot to heel', 'Drive hips forward to return']
      },
      {
        id: 'b1-6',
        name: 'Bird Dog on Floor',
        urduName: 'Chahar Pai Balance',
        targetMuscle: 'Core & Glutes',
        durationSeconds: 50,
        reps: 12,
        restSeconds: 20,
        instructions: 'On hands and knees on a prayer mat or rug. Extend right arm forward and left leg straight back. Hold 2 seconds, return and alternate.',
        romanUrduTip: 'Pait ko kas kar rakhein aur balance banayein.',
        formCues: ['Keep hips level with floor', 'Do not arch lower back', 'Squeeze glute at top']
      }
    ]
  },

  // 2. Beginner - Core & Abs: Pehlwan Core Kickstart
  {
    id: 'beg-core-1',
    title: 'Safe Desi Core & Posture Strengthener',
    subtitle: 'Zero spine strain, targets lower belly and posture alignment',
    intensity: 'beginner',
    muscleGroup: 'core',
    totalDurationMin: 12,
    estCalories: 85,
    equipmentNeeded: 'None (Floor mat / Carpet)',
    description: 'Designed to eliminate the "sitting at desk / late evening slouch" by waking up your transverse abdominis and stabilizing lower back muscles.',
    exercises: [
      {
        id: 'bc1-1',
        name: 'Dead Bug Stability Holds',
        urduName: 'Dead Bug Core Balance',
        targetMuscle: 'Deep Core (Transverse Abdominis)',
        durationSeconds: 45,
        reps: 12,
        restSeconds: 15,
        instructions: 'Lie on back, arms pointing up and knees at 90 degrees. Lower opposite arm and leg slowly toward the floor without arching your lower back.',
        romanUrduTip: 'Kamar ko zameen se chipka kar rakhein, beech mein faasla na anay dein.',
        formCues: ['Lower back stays glued to floor', 'Slow tempo', 'Exhale as limb extends']
      },
      {
        id: 'bc1-2',
        name: 'Glute Bridges with 2-Sec Hold',
        urduName: 'Kamar Ka Pul (Glute Bridge)',
        targetMuscle: 'Glutes & Pelvic Floor',
        durationSeconds: 45,
        reps: 12,
        restSeconds: 15,
        instructions: 'Lie on back with knees bent and feet flat on floor. Squeeze your glutes and push through heels to lift hips until your body forms a straight line from knees to shoulders.',
        romanUrduTip: 'Upar aakar 2 second ke liye rokein aur pait sakht rakhein.',
        formCues: ['Drive through heels', 'Do not hyper-extend lumbar', 'Engage core']
      },
      {
        id: 'bc1-3',
        name: 'Modified Knee Plank',
        urduName: 'Ghutnon Ka Plank',
        targetMuscle: 'Entire Abdominal Wall',
        durationSeconds: 40,
        restSeconds: 20,
        instructions: 'Rest on forearms and knees. Keep your head, neck, hips, and knees in a clean straight plank. Brace your stomach as if expecting a gentle tap.',
        romanUrduTip: 'Kohniyan kandhon ke theek neechay hoon aur pait ko tight rakhein.',
        formCues: ['Pull belly button to spine', 'Keep neck in line with back', 'Steady breathing']
      },
      {
        id: 'bc1-4',
        name: 'Seated Torso Twists (Russian Twist Prep)',
        urduName: 'Bethay Hue Mor (Torso Twists)',
        targetMuscle: 'Obliques & Side Abs',
        durationSeconds: 40,
        reps: 16,
        restSeconds: 15,
        instructions: 'Sit tall on floor or chair with feet planted. Lean back slightly, clasp hands together and rotate your ribcage smoothly from left to right.',
        romanUrduTip: 'Hath nahi balkay poora seena ghumayein.',
        formCues: ['Keep spine long', 'Rotate from thoracic spine', 'Control the movement']
      }
    ]
  },

  // 3. Intermediate - Legs & Glutes: Traditional Desi Baithak Power
  {
    id: 'int-legs-1',
    title: 'Desi Baithak & Lower Body Stamina',
    subtitle: 'Inspired by traditional desi akhada conditioning adapted for living rooms',
    intensity: 'intermediate',
    muscleGroup: 'legs',
    totalDurationMin: 18,
    estCalories: 165,
    equipmentNeeded: 'None (Bodyweight)',
    description: 'Deep mobility, quad endurance, and athletic calf conditioning using rhythmic bodyweight squats, lunges, and tempo isometric holds.',
    exercises: [
      {
        id: 'il1-1',
        name: 'Traditional Desi Baithak (Akhada Squats)',
        urduName: 'Pehlwani Baithak',
        targetMuscle: 'Quads, Calves & Hip Flexors',
        durationSeconds: 50,
        reps: 18,
        restSeconds: 20,
        instructions: 'Feet slightly wider than shoulder width with toes turned out. Lower smoothly into a deep squat swinging arms naturally backwards, then rise powerfully onto the balls of your feet bringing arms forward.',
        romanUrduTip: 'Ghayray squat mein jayein, saans ka rhythm banayein.',
        formCues: ['Full depth if knees allow', 'Fluid circular arm motion', 'Weight on heels going down, balls of feet rising']
      },
      {
        id: 'il1-2',
        name: 'Reverse Stepping Lunges',
        urduName: 'Peechay Kadam Lunges',
        targetMuscle: 'Hamstrings & Glutes',
        durationSeconds: 45,
        reps: 14,
        restSeconds: 20,
        instructions: 'Step your right leg backwards and lower both knees toward 90-degree angles. Push through front left heel to return to standing. Alternate sides.',
        romanUrduTip: 'Aagay walay pair ki aeri par wazan rakhein.',
        formCues: ['Front knee stays behind toes', 'Chest upright', 'Soft back knee tap']
      },
      {
        id: 'il1-3',
        name: 'Desi Wall Sit Isometric Burn',
        urduName: 'Deewar Sahara Baithak',
        targetMuscle: 'Quadriceps Endurance',
        durationSeconds: 45,
        restSeconds: 25,
        instructions: 'Slide back down against a flat wall until thighs are parallel to the floor. Press lower back into wall and hold hands relaxed in front or on chest.',
        romanUrduTip: 'Deewar se pusht chipkaye rakhein, himmat karein 45 second!',
        formCues: ['Thighs parallel to floor', 'Shin vertical 90 degrees', 'Do not rest hands on knees']
      },
      {
        id: 'il1-4',
        name: 'Single-Leg Calf Raises on Floor',
        urduName: 'Pindliyon Ka Urooj',
        targetMuscle: 'Calves (Gastrocnemius & Soleus)',
        durationSeconds: 45,
        reps: 15,
        restSeconds: 20,
        instructions: 'Stand on one foot near a wall for balance. Raise heel as high as possible, hold for 1 count, lower with control. Switch legs after 25 seconds.',
        romanUrduTip: 'Aeri ko poora upar uthayein aur 1 second rokein.',
        formCues: ['Full extension at ankle', 'Controlled descent', 'Strengthens Achilles']
      },
      {
        id: 'il1-5',
        name: 'Sumo Squat Pulse',
        urduName: 'Chorha Squat Pulse',
        targetMuscle: 'Inner Thighs & Glutes',
        durationSeconds: 40,
        restSeconds: 25,
        instructions: 'Wide stance with toes angled at 45 degrees. Lower down into squat, pulse up and down 3 inches without coming fully up to maintain continuous tension.',
        romanUrduTip: 'Ghutnay bahar ki taraf rakhein aur musalsal dabao banayein.',
        formCues: ['Knees over toes', 'Torso upright', 'Keep continuous tension']
      }
    ]
  },

  // 4. Intermediate - Full Body: Chahal Qadmi HIIT Burn
  {
    id: 'int-full-1',
    title: 'Ghar Ka Desi Fat Burner (No Jumping)',
    subtitle: 'High cardiovascular burn, apartment friendly with zero neighbor disturbance',
    intensity: 'intermediate',
    muscleGroup: 'full_body',
    totalDurationMin: 20,
    estCalories: 190,
    equipmentNeeded: 'None',
    description: 'Designed specifically for home apartments: quiet, non-jarring movements that torch calories and boost metabolism using continuous compound rhythms.',
    exercises: [
      {
        id: 'if1-1',
        name: 'Speed Skater Cross Taps (Low Impact)',
        urduName: 'Skater Steps',
        targetMuscle: 'Glutes, Quads & Cardio',
        durationSeconds: 45,
        restSeconds: 15,
        instructions: 'Step wide to the right, sweeping left leg diagonally behind you while tapping the floor or right knee. Swiftly shift to the left side.',
        romanUrduTip: 'Tezi se kadam badlein magar paon ko narmi se zameen par rakhein.',
        formCues: ['Stay low in athletic stance', 'Continuous lateral tempo', 'Cardio elevation']
      },
      {
        id: 'if1-2',
        name: 'Hindu Dand (Desi Dive-Bomber Pushup)',
        urduName: 'Pehlwani Dand',
        targetMuscle: 'Chest, Shoulders, Core & Spine',
        durationSeconds: 45,
        reps: 10,
        restSeconds: 25,
        instructions: 'Start in a downward dog (V-shape). Swoop your chest down skimming the floor, arch up into upward dog, then push your hips back up to downward dog in reverse or direct reset.',
        romanUrduTip: 'Seena zameen ke qareeb se guzarein, reerh ki haddi lachakdar banayein.',
        formCues: ['Shoulder stability', 'Graceful fluid curve', 'Drive hips up to finish']
      },
      {
        id: 'if1-3',
        name: 'Tempo Air Squats with Overhead Clap',
        urduName: 'Squat Baithak Ba-Awaaz Taali',
        targetMuscle: 'Lower Body & Upper Back',
        durationSeconds: 45,
        reps: 16,
        restSeconds: 20,
        instructions: 'Descend into a standard squat, then explode to standing and clap hands cleanly overhead. Focus on speed and full hip extension.',
        romanUrduTip: 'Upar aate waqt pait aur hips ko tight karein.',
        formCues: ['Weight balanced on whole foot', 'Full arm extension', 'Exhale at top']
      },
      {
        id: 'if1-4',
        name: 'Bicycle Crunches (Core Rotation)',
        urduName: 'Cycle Crunches',
        targetMuscle: 'Rectus Abdominis & Obliques',
        durationSeconds: 45,
        reps: 20,
        restSeconds: 20,
        instructions: 'On your back with hands behind ears. Bring right elbow to left knee while extending right leg straight. Rotate smoothly to opposite side without pulling on neck.',
        romanUrduTip: 'Kohni ko nahi, balkay pooray shaney ko ghutnay ki taraf ghumayein.',
        formCues: ['Do not wrench neck', 'Slow controlled rhythm', 'Extend opposite leg fully']
      },
      {
        id: 'if1-5',
        name: 'Plank Shoulder Taps',
        urduName: 'Plank Kandha Tap',
        targetMuscle: 'Core Anti-Rotation & Deltoids',
        durationSeconds: 45,
        restSeconds: 20,
        instructions: 'High pushup plank position with feet slightly wider for base. Tap right hand to left shoulder with minimal hip swaying. Alternate hands.',
        romanUrduTip: 'Hips ko hilnay na dein, bilkul seedha rakhein.',
        formCues: ['Feet wide for stability', 'Hands beneath shoulders', 'Resist torso rotation']
      }
    ]
  },

  // 5. Advanced - Full Body: Rustam-e-Zaman Akhada Endurance
  {
    id: 'adv-full-1',
    title: 'Rustam Akhada: High-Intensity Calisthenics',
    subtitle: 'Tough bodyweight mastery for serious stamina, explosive power, and raw grit',
    intensity: 'advanced',
    muscleGroup: 'full_body',
    totalDurationMin: 24,
    estCalories: 260,
    equipmentNeeded: 'None (Bodyweight mastery)',
    description: 'An uncompromising routine combining explosive plyometrics, deep pehlwani strength movements, and relentless core bracing.',
    exercises: [
      {
        id: 'af1-1',
        name: 'Burpee to Broad Step (Akhada Leap)',
        urduName: 'Akhada Burpee Jump',
        targetMuscle: 'Full Body & Explosive Cardio',
        durationSeconds: 45,
        reps: 12,
        restSeconds: 20,
        instructions: 'Drop hands to floor, kick feet back into full pushup plank, drop chest to floor, push up, jump feet back to hands, and jump upwards with arms overhead.',
        romanUrduTip: 'Har jump par poori taqat lagayein, saans ko control karein.',
        formCues: ['Smooth transition from plank to feet', 'Soft cushioned landing', 'Explosive hip drive']
      },
      {
        id: 'af1-2',
        name: 'Classic Full Hindu Dand',
        urduName: 'Kamil Pehlwani Dand',
        targetMuscle: 'Pectorals, Anterior Deltoids & Triceps',
        durationSeconds: 50,
        reps: 14,
        restSeconds: 25,
        instructions: 'High pike position. Bend elbows deeply as forehead, nose, and chest dive under an imaginary bar, then press up into full cobra extension before reversing the dive back to pike.',
        romanUrduTip: 'Poora dive karein, shana aur seena mazboot hoga.',
        formCues: ['Dive forwards and push backwards through shoulders', 'Do not drop knees', 'Keep core braced']
      },
      {
        id: 'af1-3',
        name: 'Jump Squats (Power Baithak)',
        urduName: 'Jumping Baithak',
        targetMuscle: 'Fast-Twitch Leg Muscle & Glutes',
        durationSeconds: 45,
        reps: 16,
        restSeconds: 25,
        instructions: 'Sink into parallel squat, then violently press through the floor to launch vertically into the air. Land softly on toes-to-heels and immediately absorb into next squat.',
        romanUrduTip: 'Zameen par aatay waqt aawaz na aaye, ghutnay mod kar jhatka lein.',
        formCues: ['Absorb landing through knees & hips', 'Explode from floor', 'Chest high']
      },
      {
        id: 'af1-4',
        name: 'Mountain Climbers (Rapid Cross-Body)',
        urduName: 'Tez Mountain Climber',
        targetMuscle: 'Core & Cardiovascular Engine',
        durationSeconds: 45,
        restSeconds: 20,
        instructions: 'Pushup plank position. Rapidly sprint knees towards opposite elbows alternating legs in a steady piston-like rhythm.',
        romanUrduTip: 'Hips ko upar hawa mein na uthayein, plank seedha rakhein.',
        formCues: ['Shoulders pinned over wrists', 'Flat back', 'Piston legs']
      },
      {
        id: 'af1-5',
        name: 'Hollow Body Rocker',
        urduName: 'Hollow Body Rocker',
        targetMuscle: 'Deep Core Armor & Lat Tightness',
        durationSeconds: 40,
        restSeconds: 25,
        instructions: 'Lie on back, press lower back to floor, arms extended overhead by ears and legs hovering 6 inches off ground. Gently rock forward and back like a banana without losing dish shape.',
        romanUrduTip: 'Pusht ka nichla hissa zameen se judaa na ho.',
        formCues: ['Toes pointed', 'Biceps glued to ears', 'Zero arch in lumbar']
      },
      {
        id: 'af1-6',
        name: 'Pistol Squat Prep / Archer Squat',
        urduName: 'Ek Taang Ki Baithak (Archer Squat)',
        targetMuscle: 'Unilateral Quads & Adductors',
        durationSeconds: 45,
        reps: 12,
        restSeconds: 20,
        instructions: 'Take an extra wide stance. Shift your weight to your right side and sink deep into a single-leg squat while keeping the left leg completely straight. Push back to center and switch.',
        romanUrduTip: 'Ek taang par poora wazan daalein aur aahista neechay jayein.',
        formCues: ['Heel stays planted on working leg', 'Torso stays proud', 'Opposite toe points up']
      }
    ]
  },

  // 6. Advanced - Upper Body: Ghar Pe Chhati & Bazoo (Living Room Calisthenics)
  {
    id: 'adv-upper-1',
    title: 'Desi Upper Body Armor: Chest & Arms',
    subtitle: 'Sculpt chest, triceps, and shoulders with mechanical drop-sets using bodyweight',
    intensity: 'advanced',
    muscleGroup: 'upper_body',
    totalDurationMin: 18,
    estCalories: 180,
    equipmentNeeded: 'None (Floor only)',
    description: 'A muscle-building protocol utilizing varied pushup angles, isometric pauses, and diamond grip mechanical drop sets.',
    exercises: [
      {
        id: 'au1-1',
        name: 'Diamond Pushups (Tricep Focus)',
        urduName: 'Heera (Diamond) Pushups',
        targetMuscle: 'Triceps & Inner Chest',
        durationSeconds: 45,
        reps: 12,
        restSeconds: 25,
        instructions: 'Place hands directly under chest with index fingers and thumbs touching to form a diamond. Lower chest to hands, keeping elbows close to your ribs, then press back up.',
        romanUrduTip: 'Kohniyan bahar na phailayein, pehlu ke qareeb rakhein.',
        formCues: ['Elbows tucked to 30 degrees', 'Full chest-to-hand depth', 'Lock out triceps']
      },
      {
        id: 'au1-2',
        name: 'Pike Pushups (Deltoid Press)',
        urduName: 'Pike Kandha Pushups',
        targetMuscle: 'Anterior & Lateral Deltoids',
        durationSeconds: 45,
        reps: 10,
        restSeconds: 25,
        instructions: 'Assume downward dog position with hips high in the air. Look towards feet, lower top of head diagonally forward between hands, then press back and up.',
        romanUrduTip: 'Kandhon par poora wazan laayein jaisay overhead press ho.',
        formCues: ['Forearms stay vertical', 'Head reaches ahead of fingertips', 'Hips remain high']
      },
      {
        id: 'au1-3',
        name: 'Wide Stance Pushup with 3-Sec Pause',
        urduName: 'Wide Pushup Ba-Waqfa Hold',
        targetMuscle: 'Pectoralis Major (Outer Chest)',
        durationSeconds: 45,
        reps: 10,
        restSeconds: 25,
        instructions: 'Place hands 6 inches wider than shoulders. Lower in 3 seconds, hold 1 inch off the carpet for 3 full seconds, then explode up to full lockout.',
        romanUrduTip: 'Neechay 3 second rokay rakhein, seena khul kar stretch hoga.',
        formCues: ['3-sec isometric pause at bottom', 'No sagging in hips', 'Violent lockout']
      },
      {
        id: 'au1-4',
        name: 'Floor Prone Y-T-W Back Flies',
        urduName: 'Farshi Pusht Flies (Y-T-W)',
        targetMuscle: 'Rhomboids & Rear Delts (Posture)',
        durationSeconds: 50,
        reps: 15,
        restSeconds: 20,
        instructions: 'Lie face down on the floor. Raise arms into Y shape with thumbs pointing up and squeeze shoulder blades for 5 reps, move to T shape for 5 reps, then bend elbows to W shape for 5 reps.',
        romanUrduTip: 'Kandhon ki pusht ko kas kar dabayein, jhuki kamar seedhi hogi.',
        formCues: ['Thumbs point to ceiling', 'Squeeze blades together', 'Do not arch neck']
      }
    ]
  },

  // 7. Mobility & Elders/Desk Workers: Asan Jor & Chahal Qadmi Flow
  {
    id: 'mob-joints-1',
    title: 'Desi Joint Relief & Posture Mobility',
    subtitle: 'For desk workers, parents, and seniors — unlocks stiff knees, back & neck',
    intensity: 'beginner',
    muscleGroup: 'mobility',
    totalDurationMin: 14,
    estCalories: 60,
    equipmentNeeded: 'None (Prayer mat / Chair optional)',
    description: 'Inspired by traditional daily mobility and prayer posture relief. Gently lubricates knee synovial fluid, frees tight lower back discs, and restores neck mobility.',
    exercises: [
      {
        id: 'm1-1',
        name: 'Cat-Cow Spinal Flow',
        urduName: 'Reerh Ki Haddi Ka Flex',
        targetMuscle: 'Spine & Thoracic Cage',
        durationSeconds: 50,
        reps: 10,
        restSeconds: 15,
        instructions: 'On hands and knees. Inhale, drop belly down, lift chest and look up gently (Cow). Exhale, round spine upwards like a cat, tucking chin to chest.',
        romanUrduTip: 'Saans ke sath reerh ki haddi ko aahista modain.',
        formCues: ['Synchronize with breath', 'Gentle non-strained movement', 'Full spinal ripple']
      },
      {
        id: 'm1-2',
        name: 'Desi Malasana (Deep Yogi / Namaz Squat Stretch)',
        urduName: 'Desi Baithak Stretch',
        targetMuscle: 'Hips, Ankles & Pelvic Basin',
        durationSeconds: 45,
        restSeconds: 15,
        instructions: 'Squat down with heels on floor (or roll a towel under heels if tight). Bring palms together at chest, gently pressing knees open with elbows. Breathe deeply.',
        romanUrduTip: 'Hips ko khol kar aaraam se 45 second baithein.',
        formCues: ['Heels down', 'Chest proud', 'Lengthen lower spine']
      },
      {
        id: 'm1-3',
        name: '90-90 Hip Rotations',
        urduName: 'Kulaah Lachak (90-90 Hip)',
        targetMuscle: 'Hip Internal & External Rotation',
        durationSeconds: 50,
        reps: 10,
        restSeconds: 15,
        instructions: 'Sit on floor with both knees bent at 90 degrees, one in front and one to the side. Smoothly pivot both knees side-to-side without hands touching if possible.',
        romanUrduTip: 'Ghutnon ko baari baari dayen aur bayen farsh par lagayein.',
        formCues: ['Keep spine tall', 'Gentle hip socket rotation', 'Control the pivot']
      },
      {
        id: 'm1-4',
        name: 'Neck & Upper Trapezius Release',
        urduName: 'Gardan Ka Sukoon Stretch',
        targetMuscle: 'Cervical Spine & Upper Traps',
        durationSeconds: 40,
        restSeconds: 15,
        instructions: 'Sit or stand tall. Gently drop right ear toward right shoulder. Place right hand softly on left temple for slight passive weight (do not yank). Hold 20s, switch sides.',
        romanUrduTip: 'Zor mat lagayein, sirf haath ka wazan rehne dein.',
        formCues: ['Relax opposite shoulder down', 'Deep steady breathing', 'Zero yanking']
      },
      {
        id: 'm1-5',
        name: 'Post-Meal Chahal Qadmi Gentle Pace',
        urduName: 'Khane Ke Baad Chahal Qadmi',
        targetMuscle: 'Digestive Motility & Blood Sugar Balance',
        durationSeconds: 60,
        restSeconds: 10,
        instructions: 'A light, rhythmic walking flow inside your corridor or room. Swing arms naturally and focus on deep rhythmic nasal inhales.',
        romanUrduTip: 'Yeh 100 kadam hazmay aur sugar ko qaboo mein rakhne ke liye behtareen hain.',
        formCues: ['Relaxed shoulders', 'Even stride', 'Nasal breathing']
      }
    ]
  }
];
