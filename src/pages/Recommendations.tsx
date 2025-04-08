
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InfoIcon, UtensilsCrossed, Dumbbell, ArrowLeftIcon, CheckCircle } from 'lucide-react';
import { DietRecommendation, ExerciseRecommendation, getDietRecommendations, getExerciseRecommendations } from '@/utils/pcosModel';
import { Separator } from '@/components/ui/separator';

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

const Recommendations = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [dietPlan, setDietPlan] = useState<DietRecommendation | null>(null);
  const [exercisePlan, setExercisePlan] = useState<ExerciseRecommendation | null>(null);
  
  useEffect(() => {
    // Load assessment data from session storage
    const savedAssessment = sessionStorage.getItem('pcosAssessment');
    
    if (!savedAssessment) {
      navigate('/assessment');
      return;
    }
    
    const assessmentData = JSON.parse(savedAssessment);
    setAssessment(assessmentData);
    
    // Generate personalized recommendations based on assessment
    const diet = getDietRecommendations(
      assessmentData.riskLevel, 
      assessmentData.keyFactors,
      assessmentData.personalInfo.age
    );
    
    const exercise = getExerciseRecommendations(
      assessmentData.riskLevel, 
      assessmentData.keyFactors,
      assessmentData.personalInfo.age
    );
    
    setDietPlan(diet);
    setExercisePlan(exercise);
  }, [navigate]);
  
  if (!assessment || !dietPlan || !exercisePlan) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-10 flex items-center justify-center">
          <p>Loading your personalized recommendations...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10 bg-gradient-to-b from-pcos-50 to-white">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6 flex items-center gap-2" 
              onClick={() => navigate('/results')}
            >
              <ArrowLeftIcon size={16} /> Back to Results
            </Button>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 gradient-text">Your Personalized Recommendations</h1>
              <p className="text-muted-foreground">
                Tailored diet and exercise plans based on your PCOS assessment results
              </p>
            </div>
            
            <Tabs defaultValue="diet" className="animate-fadeIn">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="diet" className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Diet Plan</span>
                </TabsTrigger>
                <TabsTrigger value="exercise" className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  <span>Exercise Plan</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="diet">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>{dietPlan.title}</CardTitle>
                    <CardDescription>{dietPlan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Alert className="mb-6">
                      <InfoIcon className="h-4 w-4" />
                      <AlertDescription>
                        This is a general recommendation based on your assessment. 
                        Always consult with a healthcare provider before making significant dietary changes.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Recommended Food Groups</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dietPlan.foods.map((foodGroup, index) => (
                            <div key={index} className="bg-secondary/40 p-4 rounded-md">
                              <h4 className="font-medium text-pcos-700 mb-2">{foodGroup.category}</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {foodGroup.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Sample Meal Plan</h3>
                        <div className="space-y-4">
                          {dietPlan.mealPlan.map((meal, index) => (
                            <div key={index}>
                              <h4 className="font-medium text-pcos-700 mb-2">{meal.mealTime}</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {meal.suggestions.map((suggestion, i) => (
                                  <li key={i}>{suggestion}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Nutrition Tips</h3>
                        <div className="bg-pcos-50 p-4 rounded-md">
                          <ul className="space-y-2">
                            {dietPlan.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-pcos-600 shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="exercise">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>{exercisePlan.title}</CardTitle>
                    <CardDescription>{exercisePlan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Alert className="mb-6">
                      <InfoIcon className="h-4 w-4" />
                      <AlertDescription>
                        This exercise plan is customized based on your assessment results. 
                        Please consult with a healthcare provider before starting any new exercise regimen.
                      </AlertDescription>
                    </Alert>
                    
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-6">
                        {exercisePlan.routines.map((routine, index) => (
                          <div key={index} className="bg-secondary/30 p-4 rounded-md">
                            <h3 className="text-lg font-semibold text-pcos-700">{routine.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{routine.description}</p>
                            <p className="text-sm font-medium mb-3">Frequency: {routine.frequency}</p>
                            
                            <div className="space-y-3">
                              {routine.exercises.map((exercise, i) => (
                                <div key={i} className="bg-background p-3 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium">{exercise.name}</h4>
                                    <span className="text-xs bg-pcos-100 text-pcos-700 px-2 py-1 rounded-full">
                                      {exercise.intensity}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {exercise.duration}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Exercise Tips</h3>
                          <div className="bg-pcos-50 p-4 rounded-md">
                            <ul className="space-y-2">
                              {exercisePlan.tips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-pcos-600 shrink-0 mt-0.5" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Remember that these recommendations are personalized based on your assessment results 
                but should not replace professional medical advice.
              </p>
              <Button onClick={() => navigate('/results')}>
                Return to Assessment Results
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
