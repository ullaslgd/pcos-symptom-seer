
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, BarChart3, UtensilsCrossed, Dumbbell } from 'lucide-react';

interface AssessmentData {
  riskScore: number;
  riskPercentage: number;
  confidenceScore: number;
  keyFactors: string[];
  riskLevel: string;
  symptomCount: number;
  personalInfo: {
    age: string;
    hasRegularPeriods: string;
    hasBeenDiagnosed: string;
    familyHistory: string;
  };
  selectedSymptoms: Record<string, boolean>;
}

const getRiskLevel = (level: string): { level: string; color: string } => {
  switch (level) {
    case "High":
      return { level: "High", color: "bg-red-500" };
    case "Moderate":
      return { level: "Moderate", color: "bg-amber-500" };
    default:
      return { level: "Low", color: "bg-green-500" };
  }
};

// Function to map symptom IDs to readable names
const getSymptomName = (symptomId: string): string => {
  const symptomMap: Record<string, string> = {
    'irregular-periods': 'Irregular Periods',
    'hair-growth': 'Excess Hair Growth',
    'weight-gain': 'Unexplained Weight Gain',
    'acne': 'Acne',
    'hair-loss': 'Hair Loss or Thinning',
    'skin-tags': 'Skin Tags',
    'fatigue': 'Fatigue',
    'mood-changes': 'Mood Changes',
    'pelvic-pain': 'Pelvic Pain',
    'headaches': 'Headaches',
    'sleep-problems': 'Sleep Problems',
    'infertility': 'Difficulty Getting Pregnant',
    'family-history': 'Family History of PCOS',
    'age-factor': 'Age Range (20-39)',
  };
  
  return symptomMap[symptomId] || symptomId;
};

const Results = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  
  useEffect(() => {
    const savedAssessment = sessionStorage.getItem('pcosAssessment');
    
    if (!savedAssessment) {
      navigate('/assessment');
      return;
    }
    
    setAssessment(JSON.parse(savedAssessment));
  }, [navigate]);
  
  if (!assessment) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-10 flex items-center justify-center">
          <p>Loading your results...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { riskScore, riskPercentage, confidenceScore, keyFactors, riskLevel } = assessment;
  const risk = getRiskLevel(riskLevel);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10 bg-gradient-to-b from-pcos-50 to-white">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6 animate-fadeIn">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your PCOS Assessment Results</CardTitle>
                <CardDescription>
                  Based on the information you provided, our model has generated the following assessment
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">PCOS Risk Assessment</h3>
                    <div className="bg-secondary/60 px-3 py-1 rounded-full text-xs">
                      Model Confidence: {confidenceScore}%
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Risk Level: {risk.level}</span>
                      <span className="text-sm">{riskPercentage}%</span>
                    </div>
                    
                    <Progress value={riskPercentage} className="h-3" />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low Risk (0-39%)</span>
                      <span>Moderate Risk (40-69%)</span>
                      <span>High Risk (70-100%)</span>
                    </div>
                  </div>
                </div>
                
                {risk.level === "High" && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-start">
                    <AlertCircle className="text-red-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800">High Risk Indicators</h4>
                      <p className="text-red-700 text-sm mt-1">
                        Our model indicates a higher likelihood of PCOS based on your symptoms and risk factors. 
                        It's recommended that you consult with a healthcare provider who can provide proper evaluation and diagnosis.
                      </p>
                    </div>
                  </div>
                )}
                
                {risk.level === "Moderate" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex items-start">
                    <AlertCircle className="text-amber-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800">Moderate Risk Indicators</h4>
                      <p className="text-amber-700 text-sm mt-1">
                        The model analysis shows some symptoms consistent with PCOS. Consider discussing these symptoms 
                        with your healthcare provider at your next visit.
                      </p>
                    </div>
                  </div>
                )}
                
                {risk.level === "Low" && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-start">
                    <CheckCircle className="text-green-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">Low Risk Indicators</h4>
                      <p className="text-green-700 text-sm mt-1">
                        Based on our model analysis, your symptoms suggest lower likelihood of PCOS. However, if you have specific health concerns, 
                        it's always appropriate to discuss them with your healthcare provider.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="mr-2 text-pcos-600" />
                    <h3 className="text-lg font-semibold">Key Factors in Your Assessment</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {keyFactors.map((factor, index) => (
                      <div key={index} className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">{getSymptomName(factor)}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {factor === 'irregular-periods' && 'Irregular menstrual cycles are one of the primary indicators of PCOS.'}
                          {factor === 'family-history' && 'Having family members with PCOS increases your risk of developing the condition.'}
                          {factor === 'hair-growth' && 'Excess hair growth on the face or body (hirsutism) is often linked to elevated androgen levels in PCOS.'}
                          {factor === 'weight-gain' && 'Weight gain, particularly around the abdomen, is common in women with PCOS due to insulin resistance.'}
                          {factor === 'acne' && 'Persistent acne can be related to hormonal imbalances associated with PCOS.'}
                          {factor === 'hair-loss' && 'Hair thinning or loss on the scalp can be a sign of elevated androgens in PCOS.'}
                          {factor === 'infertility' && 'Difficulty conceiving is a common concern for women with PCOS due to irregular ovulation.'}
                          {factor === 'age-factor' && 'PCOS is most commonly diagnosed during reproductive years, especially in the 20s and 30s.'}
                        </p>
                      </div>
                    ))}
                    
                    {assessment.symptomCount >= 3 && !keyFactors.includes('multiple-symptoms') && (
                      <div className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">Multiple Symptoms</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You've reported {assessment.symptomCount} symptoms that may be associated with PCOS. Multiple symptoms increase the likelihood of the condition.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <Separator />
              
              <CardFooter className="flex flex-col p-6">
                <div className="bg-pcos-50 border border-pcos-100 rounded-md p-4 mb-6 w-full">
                  <div className="flex items-center mb-3">
                    <div className="flex mr-3">
                      <UtensilsCrossed className="h-5 w-5 text-pcos-600 mr-1" />
                      <Dumbbell className="h-5 w-5 text-pcos-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Personalized Recommendations</h3>
                  </div>
                  <p className="text-sm mb-3">
                    Get personalized diet and exercise recommendations based on your assessment results to help manage your symptoms.
                  </p>
                  <Button 
                    onClick={() => navigate('/recommendations')}
                    className="w-full sm:w-auto"
                  >
                    View Personalized Plan
                  </Button>
                </div>
                
                <h3 className="text-lg font-semibold self-start mb-4">Recommended Next Steps</h3>
                
                <div className="space-y-4 w-full mb-6">
                  <div className="flex items-start">
                    <div className="bg-pcos-100 p-2 rounded-full mr-3">
                      <div className="bg-pcos-500 w-4 h-4 rounded-full text-white flex items-center justify-center text-xs">1</div>
                    </div>
                    <div>
                      <p className="font-medium">Consult with a Healthcare Provider</p>
                      <p className="text-sm text-muted-foreground">
                        Share your symptoms and this assessment with a gynecologist, endocrinologist, or primary care physician.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-pcos-100 p-2 rounded-full mr-3">
                      <div className="bg-pcos-500 w-4 h-4 rounded-full text-white flex items-center justify-center text-xs">2</div>
                    </div>
                    <div>
                      <p className="font-medium">Learn More About PCOS</p>
                      <p className="text-sm text-muted-foreground">
                        Educate yourself about symptoms, treatment options, and lifestyle management for PCOS.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-pcos-100 p-2 rounded-full mr-3">
                      <div className="bg-pcos-500 w-4 h-4 rounded-full text-white flex items-center justify-center text-xs">3</div>
                    </div>
                    <div>
                      <p className="font-medium">Track Your Symptoms</p>
                      <p className="text-sm text-muted-foreground">
                        Keep a record of your symptoms, their frequency, and severity to share with your healthcare provider.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button onClick={() => navigate('/information')} variant="outline" className="flex-1">
                    Learn About PCOS
                  </Button>
                  <Button onClick={() => navigate('/assessment')} className="flex-1">
                    Retake Assessment
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Disclaimer: This assessment is based on a simulated model and is for informational purposes only. 
                It should not replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
