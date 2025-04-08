
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import SymptomCard from './SymptomCard';
import ProgressBar from './ProgressBar';

// Define the symptom data
const commonSymptoms = [
  { 
    id: 'irregular-periods', 
    title: 'Irregular Periods', 
    description: 'Infrequent, absent, or unpredictable menstrual cycles',
    weight: 3
  },
  { 
    id: 'weight-gain', 
    title: 'Unexplained Weight Gain', 
    description: 'Especially around the waist area',
    weight: 2
  },
  { 
    id: 'hair-growth', 
    title: 'Excess Hair Growth', 
    description: 'On face, chest, back, or other unusual places',
    weight: 3
  },
  { 
    id: 'acne', 
    title: 'Acne', 
    description: 'Persistent acne that doesn\'t respond well to treatment',
    weight: 1
  },
  { 
    id: 'hair-loss', 
    title: 'Hair Loss or Thinning', 
    description: 'Male-pattern baldness or thinning hair on scalp',
    weight: 2
  },
  { 
    id: 'skin-tags', 
    title: 'Skin Tags', 
    description: 'Small excess flaps of skin in the armpits or neck area',
    weight: 1
  }
];

const additionalSymptoms = [
  { 
    id: 'fatigue', 
    title: 'Fatigue', 
    description: 'Constant or overwhelming tiredness',
    weight: 1
  },
  { 
    id: 'mood-changes', 
    title: 'Mood Changes', 
    description: 'Including depression or mood swings',
    weight: 1
  },
  { 
    id: 'pelvic-pain', 
    title: 'Pelvic Pain', 
    description: 'During periods or at other times',
    weight: 2
  },
  { 
    id: 'headaches', 
    title: 'Headaches', 
    description: 'Related to hormonal changes',
    weight: 1
  },
  { 
    id: 'sleep-problems', 
    title: 'Sleep Problems', 
    description: 'Insomnia or poor sleep quality',
    weight: 1
  },
  { 
    id: 'infertility', 
    title: 'Difficulty Getting Pregnant', 
    description: 'Trouble conceiving when trying to get pregnant',
    weight: 3
  }
];

// Define the assessment steps
type Step = 'personal' | 'common' | 'additional';

const AssessmentForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [personalInfo, setPersonalInfo] = useState({
    age: '',
    hasRegularPeriods: '',
    hasBeenDiagnosed: 'no',
    familyHistory: 'no'
  });
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({});
  
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value
    });
  };
  
  const handleSymptomToggle = (symptomId: string, checked: boolean) => {
    setSelectedSymptoms({
      ...selectedSymptoms,
      [symptomId]: checked
    });
  };
  
  const handleNext = () => {
    if (currentStep === 'personal') {
      // Validate personal info
      if (!personalInfo.age || !personalInfo.hasRegularPeriods) {
        toast.error("Please fill all required fields");
        return;
      }
      
      setCurrentStep('common');
    } else if (currentStep === 'common') {
      // Move to additional symptoms
      setCurrentStep('additional');
    } else {
      // Calculate result and navigate
      calculateAndSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'common') {
      setCurrentStep('personal');
    } else if (currentStep === 'additional') {
      setCurrentStep('common');
    }
  };
  
  const calculateAndSubmit = () => {
    // Create results object
    const results = {
      personalInfo,
      symptoms: selectedSymptoms
    };
    
    // Calculate risk score
    let riskScore = 0;
    let symptomCount = 0;
    
    // Add points for family history
    if (personalInfo.familyHistory === 'yes') {
      riskScore += 2;
    }
    
    // Add points for irregular periods
    if (personalInfo.hasRegularPeriods === 'no') {
      riskScore += 3;
    }
    
    // Add points for each selected symptom based on weight
    [...commonSymptoms, ...additionalSymptoms].forEach(symptom => {
      if (selectedSymptoms[symptom.id]) {
        riskScore += symptom.weight;
        symptomCount++;
      }
    });
    
    // Store results in session storage
    sessionStorage.setItem('pcosAssessment', JSON.stringify({
      riskScore,
      symptomCount,
      personalInfo,
      selectedSymptoms
    }));
    
    // Navigate to results page
    navigate('/results');
  };
  
  // Calculate current step number for progress bar
  let stepNumber = 1;
  if (currentStep === 'common') stepNumber = 2;
  if (currentStep === 'additional') stepNumber = 3;
  
  return (
    <div>
      <div className="mb-6">
        <ProgressBar currentStep={stepNumber} totalSteps={3} />
      </div>
      
      <Card className="animate-fadeIn">
        <CardHeader>
          <CardTitle>
            {currentStep === 'personal' && "Personal Information"}
            {currentStep === 'common' && "Common PCOS Symptoms"}
            {currentStep === 'additional' && "Additional Symptoms"}
          </CardTitle>
          <CardDescription>
            {currentStep === 'personal' && "Please provide some basic information about yourself"}
            {currentStep === 'common' && "Select any symptoms you're currently experiencing"}
            {currentStep === 'additional' && "Select any additional symptoms you may have"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {currentStep === 'personal' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter your age" 
                  value={personalInfo.age}
                  onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Do you have regular menstrual cycles?</Label>
                <RadioGroup 
                  value={personalInfo.hasRegularPeriods}
                  onValueChange={(value) => handlePersonalInfoChange('hasRegularPeriods', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="regular-yes" />
                    <Label htmlFor="regular-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="regular-no" />
                    <Label htmlFor="regular-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Have you been diagnosed with PCOS before?</Label>
                <RadioGroup 
                  value={personalInfo.hasBeenDiagnosed}
                  onValueChange={(value) => handlePersonalInfoChange('hasBeenDiagnosed', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="diagnosed-yes" />
                    <Label htmlFor="diagnosed-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="diagnosed-no" />
                    <Label htmlFor="diagnosed-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Do you have a family history of PCOS?</Label>
                <RadioGroup 
                  value={personalInfo.familyHistory}
                  onValueChange={(value) => handlePersonalInfoChange('familyHistory', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="family-yes" />
                    <Label htmlFor="family-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="family-no" />
                    <Label htmlFor="family-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          
          {currentStep === 'common' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonSymptoms.map((symptom) => (
                <SymptomCard
                  key={symptom.id}
                  id={symptom.id}
                  title={symptom.title}
                  description={symptom.description}
                  checked={!!selectedSymptoms[symptom.id]}
                  onToggle={(checked) => handleSymptomToggle(symptom.id, checked)}
                />
              ))}
            </div>
          )}
          
          {currentStep === 'additional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalSymptoms.map((symptom) => (
                <SymptomCard
                  key={symptom.id}
                  id={symptom.id}
                  title={symptom.title}
                  description={symptom.description}
                  checked={!!selectedSymptoms[symptom.id]}
                  onToggle={(checked) => handleSymptomToggle(symptom.id, checked)}
                />
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 'personal'}
          >
            Back
          </Button>
          
          <Button onClick={handleNext}>
            {currentStep === 'additional' ? 'Submit' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssessmentForm;
