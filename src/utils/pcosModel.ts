
// This file simulates a machine learning model for PCOS prediction
// In a production environment, this would be replaced with an actual API call to a backend model

interface SymptomWeight {
  [key: string]: number;
}

// Simulated feature importance weights from a "trained model"
const symptomWeights: SymptomWeight = {
  // Primary symptoms (higher weights)
  'irregular-periods': 0.85,
  'hair-growth': 0.78,
  'weight-gain': 0.72,
  'infertility': 0.75,
  'acne': 0.65,
  
  // Secondary symptoms (moderate weights)
  'hair-loss': 0.58,
  'skin-tags': 0.45,
  'pelvic-pain': 0.52,
  
  // Associated symptoms (lower weights)
  'fatigue': 0.38,
  'mood-changes': 0.35,
  'headaches': 0.32,
  'sleep-problems': 0.30
};

// Risk factors weights
const riskFactorWeights = {
  familyHistory: 0.65,
  age: {
    // Age ranges and their weights
    teen: 0.45,      // 13-19
    twenties: 0.85,  // 20-29
    thirties: 0.62,  // 30-39
    forties: 0.40,   // 40-49
    fiftyPlus: 0.20  // 50+
  }
};

// Function to get age category
const getAgeCategory = (age: number): keyof typeof riskFactorWeights.age => {
  if (age < 20) return 'teen';
  if (age < 30) return 'twenties';
  if (age < 40) return 'thirties';
  if (age < 50) return 'forties';
  return 'fiftyPlus';
};

// Sigmoid function to normalize scores between 0 and 1
const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x));
};

interface PredictionInput {
  age: string;
  hasRegularPeriods: string;
  familyHistory: string;
  selectedSymptoms: Record<string, boolean>;
}

interface PredictionOutput {
  riskScore: number;
  riskPercentage: number;
  confidenceScore: number;
  keyFactors: string[];
  riskLevel: string;
}

export const predictPCOSRisk = (input: PredictionInput): PredictionOutput => {
  let baseScore = 0;
  const age = parseInt(input.age);
  const keyFactors: string[] = [];
  
  // Add score for irregular periods
  if (input.hasRegularPeriods === 'no') {
    baseScore += 3;
    keyFactors.push('irregular-periods');
  }
  
  // Add score for family history
  if (input.familyHistory === 'yes') {
    baseScore += riskFactorWeights.familyHistory * 3;
    keyFactors.push('family-history');
  }
  
  // Add score based on age category
  if (!isNaN(age)) {
    const ageCategory = getAgeCategory(age);
    baseScore += riskFactorWeights.age[ageCategory] * 2;
    
    // Add age as a key factor if in high-risk age range
    if (ageCategory === 'twenties' || ageCategory === 'thirties') {
      keyFactors.push('age-factor');
    }
  }
  
  // Process selected symptoms
  Object.entries(input.selectedSymptoms).forEach(([symptomId, isSelected]) => {
    if (isSelected && symptomWeights[symptomId]) {
      baseScore += symptomWeights[symptomId] * 2;
      
      // Add highest weight symptoms to key factors
      if (symptomWeights[symptomId] > 0.6 && keyFactors.length < 5) {
        keyFactors.push(symptomId);
      }
    }
  });
  
  // Apply sigmoid normalization to get a percentage
  const normalizedScore = sigmoid(baseScore / 10) * 100;
  
  // Calculate risk level
  let riskLevel = "Low";
  if (normalizedScore >= 70) {
    riskLevel = "High";
  } else if (normalizedScore >= 40) {
    riskLevel = "Moderate";
  }
  
  // Calculate confidence based on number of symptoms provided
  const symptomsCount = Object.values(input.selectedSymptoms).filter(Boolean).length;
  let confidenceScore = Math.min(symptomsCount * 8, 90);
  
  // Adjust confidence based on completeness of information
  if (input.age && input.hasRegularPeriods) {
    confidenceScore += 5;
  }
  
  // Ensure confidence stays in 0-100 range
  confidenceScore = Math.min(Math.max(confidenceScore, 50), 95);
  
  return {
    riskScore: Math.min(Math.round(baseScore), 15),
    riskPercentage: Math.round(normalizedScore),
    confidenceScore: Math.round(confidenceScore),
    keyFactors: keyFactors.slice(0, 5), // Limit to top 5 factors
    riskLevel
  };
};

// Personalized recommendation interfaces and functions
export interface DietRecommendation {
  title: string;
  description: string;
  foods: {
    category: string;
    items: string[];
  }[];
  mealPlan: {
    mealTime: string;
    suggestions: string[];
  }[];
  tips: string[];
}

export interface ExerciseRecommendation {
  title: string;
  description: string;
  routines: {
    name: string;
    description: string;
    frequency: string;
    exercises: {
      name: string;
      duration: string;
      intensity: string;
    }[];
  }[];
  tips: string[];
}

export const getDietRecommendations = (
  riskLevel: string,
  keyFactors: string[],
  age: string
): DietRecommendation => {
  // Base diet recommendation
  const baseRecommendation: DietRecommendation = {
    title: "Balanced PCOS Diet Plan",
    description: "A diet focused on managing insulin levels, reducing inflammation, and supporting hormonal balance.",
    foods: [
      {
        category: "Proteins",
        items: ["Lean chicken", "Turkey", "Fish (salmon, sardines)", "Tofu", "Tempeh", "Eggs", "Greek yogurt"]
      },
      {
        category: "Complex Carbohydrates",
        items: ["Brown rice", "Quinoa", "Sweet potatoes", "Oats", "Whole grain bread"]
      },
      {
        category: "Healthy Fats",
        items: ["Avocados", "Olive oil", "Nuts (almonds, walnuts)", "Seeds (flax, chia)", "Coconut oil"]
      },
      {
        category: "Vegetables",
        items: ["Leafy greens (spinach, kale)", "Broccoli", "Bell peppers", "Zucchini", "Cauliflower"]
      },
      {
        category: "Anti-inflammatory Foods",
        items: ["Berries", "Turmeric", "Ginger", "Cinnamon", "Green tea"]
      }
    ],
    mealPlan: [
      {
        mealTime: "Breakfast",
        suggestions: [
          "Greek yogurt with berries and flaxseeds",
          "Vegetable omelet with whole grain toast",
          "Overnight oats with cinnamon and apple"
        ]
      },
      {
        mealTime: "Lunch",
        suggestions: [
          "Grilled chicken salad with olive oil dressing",
          "Quinoa bowl with roasted vegetables and avocado",
          "Lentil soup with a side of leafy greens"
        ]
      },
      {
        mealTime: "Dinner",
        suggestions: [
          "Baked salmon with roasted sweet potatoes and broccoli",
          "Turkey and vegetable stir-fry with brown rice",
          "Tofu and vegetable curry with cauliflower rice"
        ]
      },
      {
        mealTime: "Snacks",
        suggestions: [
          "Apple slices with almond butter",
          "Small handful of mixed nuts",
          "Carrot sticks with hummus",
          "Greek yogurt with cinnamon"
        ]
      }
    ],
    tips: [
      "Aim to eat every 3-4 hours to maintain stable blood sugar levels",
      "Stay hydrated by drinking at least 8 glasses of water daily",
      "Consider reducing dairy and gluten if you notice sensitivities",
      "Limit processed foods, refined sugars, and artificial ingredients",
      "Focus on portion control rather than strict calorie counting"
    ]
  };

  // Customize based on risk level and symptoms
  if (riskLevel === "High") {
    baseRecommendation.title = "Comprehensive PCOS Management Diet";
    baseRecommendation.description = "A tailored eating plan designed to address severe PCOS symptoms and help manage insulin resistance.";
    baseRecommendation.tips.push("Consider working with a registered dietitian who specializes in PCOS");
    baseRecommendation.tips.push("Monitor your glucose levels regularly if recommended by your healthcare provider");
  } else if (riskLevel === "Moderate") {
    baseRecommendation.title = "Targeted PCOS Diet Plan";
    baseRecommendation.description = "A balanced eating approach to help manage your specific PCOS symptoms and reduce risk factors.";
  }

  // Customize based on key factors
  if (keyFactors.includes('weight-gain')) {
    baseRecommendation.foods.push({
      category: "Metabolism-Boosting Foods",
      items: ["Green tea", "Chili peppers", "Coffee (in moderation)", "Apple cider vinegar", "Lean proteins"]
    });
    baseRecommendation.tips.push("Focus on calorie-dense but nutrient-rich foods");
    baseRecommendation.tips.push("Consider intermittent fasting after consulting with your healthcare provider");
  }

  if (keyFactors.includes('irregular-periods')) {
    baseRecommendation.foods.push({
      category: "Hormone-Balancing Foods",
      items: ["Flaxseeds", "Pumpkin seeds", "Broccoli", "Kale", "Brussels sprouts"]
    });
  }

  if (keyFactors.includes('acne')) {
    baseRecommendation.tips.push("Reduce dairy consumption, which may trigger acne in some individuals with PCOS");
    baseRecommendation.tips.push("Increase zinc-rich foods like pumpkin seeds, beef, and lentils");
  }

  // Age-specific adjustments
  const ageNum = parseInt(age);
  if (!isNaN(ageNum)) {
    if (ageNum < 25) {
      baseRecommendation.tips.push("Focus on establishing healthy eating habits that will support long-term hormonal health");
    } else if (ageNum > 35) {
      baseRecommendation.foods.push({
        category: "Bone-Supporting Foods",
        items: ["Calcium-rich leafy greens", "Sardines", "Fortified plant milks", "Tofu", "Almonds"]
      });
    }
  }

  return baseRecommendation;
};

export const getExerciseRecommendations = (
  riskLevel: string,
  keyFactors: string[],
  age: string
): ExerciseRecommendation => {
  // Base exercise recommendation
  const baseRecommendation: ExerciseRecommendation = {
    title: "PCOS-Friendly Exercise Plan",
    description: "A balanced exercise regimen designed to improve insulin sensitivity, manage weight, and reduce PCOS symptoms.",
    routines: [
      {
        name: "Cardiovascular Training",
        description: "Improves heart health and helps with weight management",
        frequency: "3-5 times per week, 30-45 minutes",
        exercises: [
          {
            name: "Brisk Walking",
            duration: "30-45 minutes",
            intensity: "Moderate"
          },
          {
            name: "Swimming",
            duration: "30-45 minutes",
            intensity: "Moderate"
          },
          {
            name: "Cycling",
            duration: "30-45 minutes",
            intensity: "Moderate"
          },
          {
            name: "Dancing",
            duration: "30 minutes",
            intensity: "Moderate to High"
          }
        ]
      },
      {
        name: "Strength Training",
        description: "Builds muscle mass which improves insulin sensitivity",
        frequency: "2-3 times per week, non-consecutive days",
        exercises: [
          {
            name: "Bodyweight Squats",
            duration: "3 sets of 12-15 reps",
            intensity: "Moderate"
          },
          {
            name: "Push-ups (modified if needed)",
            duration: "3 sets of 10-12 reps",
            intensity: "Moderate"
          },
          {
            name: "Dumbbell Rows",
            duration: "3 sets of 12 reps each side",
            intensity: "Moderate"
          },
          {
            name: "Lunges",
            duration: "3 sets of 10 reps each leg",
            intensity: "Moderate"
          }
        ]
      },
      {
        name: "Low-Impact Activities",
        description: "Gentle on joints while still providing benefits",
        frequency: "Can be done daily",
        exercises: [
          {
            name: "Yoga",
            duration: "30-60 minutes",
            intensity: "Low to Moderate"
          },
          {
            name: "Pilates",
            duration: "30-45 minutes",
            intensity: "Low to Moderate"
          },
          {
            name: "Tai Chi",
            duration: "30 minutes",
            intensity: "Low"
          }
        ]
      }
    ],
    tips: [
      "Start slowly and gradually increase intensity, especially if you're new to exercise",
      "Focus on consistency rather than intensity initially",
      "Listen to your body and rest when needed",
      "Stay hydrated before, during, and after exercise",
      "Combine different types of exercise for best results"
    ]
  };

  // Customize based on risk level
  if (riskLevel === "High") {
    baseRecommendation.title = "Comprehensive PCOS Exercise Program";
    baseRecommendation.description = "A structured exercise program designed to address severe PCOS symptoms with a focus on insulin resistance and hormone balance.";
    baseRecommendation.tips.push("Consider working with a personal trainer who has experience with PCOS");
    baseRecommendation.tips.push("Monitor your response to exercise and adjust accordingly");
  } else if (riskLevel === "Moderate") {
    baseRecommendation.title = "Targeted PCOS Exercise Plan";
    baseRecommendation.description = "A balanced exercise approach to help manage your specific PCOS symptoms and improve overall health.";
  }

  // Customize based on key factors
  if (keyFactors.includes('weight-gain')) {
    baseRecommendation.routines.push({
      name: "High-Intensity Interval Training (HIIT)",
      description: "Efficient for calorie burning and improving insulin sensitivity",
      frequency: "2-3 times per week, with rest days in between",
      exercises: [
        {
          name: "Sprint Intervals",
          duration: "30 seconds sprint, 90 seconds recovery x 8 rounds",
          intensity: "High"
        },
        {
          name: "Bodyweight Circuit",
          duration: "40 seconds work, 20 seconds rest x 5 exercises, 3 rounds",
          intensity: "High"
        }
      ]
    });
    baseRecommendation.tips.push("Focus on post-exercise recovery with proper nutrition");
  }

  if (keyFactors.includes('mood-changes')) {
    baseRecommendation.routines.push({
      name: "Mind-Body Exercises",
      description: "Helps reduce stress and improve mood",
      frequency: "4-5 times per week",
      exercises: [
        {
          name: "Meditation",
          duration: "10-15 minutes",
          intensity: "Low"
        },
        {
          name: "Deep Breathing Exercises",
          duration: "5-10 minutes",
          intensity: "Low"
        },
        {
          name: "Nature Walks",
          duration: "30-45 minutes",
          intensity: "Low"
        }
      ]
    });
  }

  // Age-specific adjustments
  const ageNum = parseInt(age);
  if (!isNaN(ageNum)) {
    if (ageNum < 25) {
      baseRecommendation.tips.push("Your body typically recovers faster at this age, but don't overdo high-intensity workouts");
    } else if (ageNum > 35) {
      baseRecommendation.tips.push("Include more recovery days between intense workouts");
      baseRecommendation.tips.push("Focus on joint-friendly exercises to preserve long-term mobility");
      
      // Add specific routine for 35+
      baseRecommendation.routines.push({
        name: "Joint-Friendly Strength Training",
        description: "Focuses on maintaining muscle mass while being gentle on joints",
        frequency: "2-3 times per week",
        exercises: [
          {
            name: "Resistance Band Exercises",
            duration: "3 sets of 12-15 reps",
            intensity: "Moderate"
          },
          {
            name: "Water Aerobics",
            duration: "45 minutes",
            intensity: "Moderate"
          }
        ]
      });
    }
  }

  return baseRecommendation;
};
