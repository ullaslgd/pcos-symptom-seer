
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
