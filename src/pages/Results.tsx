
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AssessmentData {
  riskScore: number;
  symptomCount: number;
  personalInfo: {
    age: string;
    hasRegularPeriods: string;
    hasBeenDiagnosed: string;
    familyHistory: string;
  };
  selectedSymptoms: Record<string, boolean>;
}

const getRiskLevel = (score: number): { level: string; color: string } => {
  if (score >= 10) {
    return { level: "High", color: "bg-red-500" };
  } else if (score >= 6) {
    return { level: "Moderate", color: "bg-amber-500" };
  } else {
    return { level: "Low", color: "bg-green-500" };
  }
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
  
  const { riskScore, symptomCount } = assessment;
  const risk = getRiskLevel(riskScore);
  
  // Calculate percentage for risk visualization
  const riskPercentage = Math.min(100, (riskScore / 15) * 100);
  
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
                  Based on the information you provided, we've generated the following assessment
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">PCOS Risk Assessment</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Risk Level: {risk.level}</span>
                      <span className="text-sm">{riskScore} points</span>
                    </div>
                    
                    <Progress value={riskPercentage} className="h-3" />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>Moderate</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
                
                {risk.level === "High" && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-start">
                    <AlertCircle className="text-red-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800">High Risk Indicators</h4>
                      <p className="text-red-700 text-sm mt-1">
                        Your responses suggest a higher likelihood of PCOS. It's recommended that you consult with a healthcare 
                        provider who can provide proper evaluation and diagnosis.
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
                        Your responses indicate some symptoms consistent with PCOS. Consider discussing these symptoms 
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
                        Your responses suggest lower likelihood of PCOS. However, if you have specific health concerns, 
                        it's always appropriate to discuss them with your healthcare provider.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Key Factors in Your Assessment</h3>
                  
                  <div className="space-y-4">
                    {assessment.personalInfo.hasRegularPeriods === "no" && (
                      <div className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">Irregular Periods</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Irregular menstrual cycles are one of the primary indicators of PCOS.
                        </p>
                      </div>
                    )}
                    
                    {assessment.personalInfo.familyHistory === "yes" && (
                      <div className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">Family History</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Having family members with PCOS increases your risk of developing the condition.
                        </p>
                      </div>
                    )}
                    
                    {assessment.selectedSymptoms["hair-growth"] && (
                      <div className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">Excess Hair Growth</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Excess hair growth on the face or body (hirsutism) is often linked to elevated androgen levels in PCOS.
                        </p>
                      </div>
                    )}
                    
                    {assessment.selectedSymptoms["weight-gain"] && (
                      <div className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">Unexplained Weight Gain</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Weight gain, particularly around the abdomen, is common in women with PCOS due to insulin resistance.
                        </p>
                      </div>
                    )}
                    
                    {symptomCount >= 3 && (
                      <div className="p-3 bg-secondary rounded-md">
                        <p className="font-medium">Multiple Symptoms</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You've reported {symptomCount} symptoms that may be associated with PCOS. Multiple symptoms increase the likelihood of the condition.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <Separator />
              
              <CardFooter className="flex flex-col p-6">
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
                Disclaimer: This assessment is not a diagnostic tool. The results are for informational purposes only and 
                should not replace professional medical advice, diagnosis, or treatment.
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
