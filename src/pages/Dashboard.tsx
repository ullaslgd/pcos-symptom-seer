
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardCard from '@/components/DashboardCard';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Utensils, 
  Dumbbell, 
  Calendar, 
  LineChart, 
  Clock, 
  BarChart3, 
  AlertCircle,
  FileText,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import UpcomingAppointments from '@/components/UpcomingAppointments';
import RecentActivity from '@/components/RecentActivity';
import HealthMetrics from '@/components/HealthMetrics';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Import recharts components for the assessment chart
import { ChartContainer } from "@/components/ui/chart";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [lastAssessmentDate, setLastAssessmentDate] = useState<string | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [savedAssessments, setSavedAssessments] = useState<any[]>([]);
  const [isLoadingAssessments, setIsLoadingAssessments] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('pcosUserName') || 'User';
    setUserName(storedName);

    // Get last assessment from sessionStorage
    const savedAssessment = sessionStorage.getItem('pcosAssessment');
    if (savedAssessment) {
      const assessment = JSON.parse(savedAssessment);
      setAssessmentResults(assessment);
      setLastAssessmentDate(new Date().toLocaleDateString());
    }
    
    // Fetch user's assessments from Supabase if logged in
    if (user) {
      fetchUserAssessments();
    }
  }, [user]);

  const fetchUserAssessments = async () => {
    if (!user) return;
    
    setIsLoadingAssessments(true);
    try {
      const { data, error } = await supabase
        .from('pcos_assessments')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching assessments:', error);
        toast({
          title: "Error",
          description: "Failed to fetch your assessment history.",
        });
      } else if (data && data.length > 0) {
        setSavedAssessments(data);
        
        // Set the most recent assessment
        setAssessmentResults({
          riskScore: data[0].risk_score,
          riskPercentage: data[0].risk_percentage,
          confidenceScore: data[0].confidence_score,
          riskLevel: data[0].risk_level,
          keyFactors: data[0].key_factors,
          symptomCount: data[0].symptom_count
        });
        
        setLastAssessmentDate(new Date(data[0].created_at).toLocaleDateString());
        
        // Prepare chart data from assessment history
        const chartData = data
          .slice()
          .reverse()
          .map(assessment => ({
            date: format(new Date(assessment.created_at), 'MMM d'),
            riskPercentage: assessment.risk_percentage,
          }));
        
        setChartData(chartData);
      }
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setIsLoadingAssessments(false);
    }
  };

  const handleTakeAssessment = () => {
    navigate('/assessment');
  };

  const showTip = () => {
    toast({
      title: "Daily PCOS Tip",
      description: "Regular exercise can help manage insulin levels, which may reduce PCOS symptoms.",
    });
  };
  
  const loadAssessment = (assessment: any) => {
    const assessmentData = {
      riskScore: assessment.risk_score,
      riskPercentage: assessment.risk_percentage,
      confidenceScore: assessment.confidence_score,
      riskLevel: assessment.risk_level,
      keyFactors: assessment.key_factors,
      symptomCount: assessment.symptom_count,
      personalInfo: assessment.personal_info,
      selectedSymptoms: assessment.selected_symptoms
    };
    
    // Save to session storage
    sessionStorage.setItem('pcosAssessment', JSON.stringify(assessmentData));
    navigate('/results');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-6 bg-gradient-to-b from-pcos-50 to-white">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, {userName}</h1>
              <p className="text-muted-foreground">
                {lastAssessmentDate ? 
                  `Last assessment: ${lastAssessmentDate}` : 
                  'Take your first assessment to personalize your dashboard'}
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={showTip}>Daily Tip</Button>
              <Button onClick={handleTakeAssessment}>
                {lastAssessmentDate ? 'Retake Assessment' : 'Take Assessment'}
              </Button>
            </div>
          </div>

          {!assessmentResults && (
            <Card className="mb-8 animate-fadeIn">
              <CardHeader className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-pcos-500 mb-2" />
                <CardTitle>No Assessment Data Found</CardTitle>
                <CardDescription>
                  Take your first assessment to unlock personalized insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center pt-0">
                <Button onClick={handleTakeAssessment}>Take Assessment Now</Button>
              </CardFooter>
            </Card>
          )}

          {assessmentResults && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard 
                title="PCOS Risk Level" 
                icon={<Activity className="h-5 w-5 text-pcos-600" />}
                value={`${assessmentResults.riskPercentage}%`}
                status={assessmentResults.riskLevel}
                actionText="View Details"
                actionHref="/results"
              />
              <DashboardCard 
                title="Symptom Tracking" 
                icon={<LineChart className="h-5 w-5 text-pcos-600" />}
                value={`${assessmentResults.symptomCount} Symptoms`}
                status="Active tracking"
                actionText="Track Symptoms"
                actionHref="#"
              />
              <DashboardCard 
                title="Next Appointment" 
                icon={<Clock className="h-5 w-5 text-pcos-600" />}
                value="None scheduled"
                status="Schedule one now"
                actionText="Schedule"
                actionHref="/appointments"
              />
            </div>
          )}

          <Tabs defaultValue="activity" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
              <TabsTrigger value="assessments">Assessment History</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <RecentActivity />
            </TabsContent>
            <TabsContent value="appointments">
              <UpcomingAppointments />
            </TabsContent>
            <TabsContent value="metrics">
              <HealthMetrics />
            </TabsContent>
            <TabsContent value="assessments">
              {isLoadingAssessments ? (
                <div className="flex justify-center py-10">
                  <p>Loading your assessment history...</p>
                </div>
              ) : savedAssessments.length > 0 ? (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-pcos-600" />
                        Risk Assessment History
                      </CardTitle>
                      <CardDescription>
                        Track how your risk assessment has changed over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] mt-4">
                        {chartData.length > 1 ? (
                          <ChartContainer
                            config={{
                              risk: {
                                color: "#7c3aed"
                              },
                            }}
                          >
                            <RechartsLineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="riskPercentage"
                                name="Risk %"
                                stroke="var(--color-risk, #7c3aed)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </RechartsLineChart>
                          </ChartContainer>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-muted-foreground">
                              Take more assessments to see your risk trend over time
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-pcos-600" />
                        Assessment Records
                      </CardTitle>
                      <CardDescription>
                        All your saved assessment records
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead>Risk Score</TableHead>
                            <TableHead>Symptoms</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {savedAssessments.map((assessment) => (
                            <TableRow key={assessment.id}>
                              <TableCell>
                                {formatDate(assessment.created_at)}
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  assessment.risk_level === 'High' ? 'bg-red-100 text-red-800' : 
                                  assessment.risk_level === 'Moderate' ? 'bg-amber-100 text-amber-800' : 
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {assessment.risk_level}
                                </span>
                              </TableCell>
                              <TableCell>{assessment.risk_percentage}%</TableCell>
                              <TableCell>{assessment.symptom_count}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => loadAssessment(assessment)}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Assessments Found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't saved any assessments yet. Take an assessment to track your PCOS risk over time.
                  </p>
                  <Button onClick={handleTakeAssessment}>Take Assessment</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-pcos-600" />
                  Daily Nutrition
                </CardTitle>
                <CardDescription>Track your nutrition goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Balanced Meals</span>
                    <span className="text-sm">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Low Sugar Goal</span>
                    <span className="text-sm">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Water Intake</span>
                    <span className="text-sm">1.5/2L</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/recommendations')}>
                  View Diet Recommendations
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-pcos-600" />
                  Exercise Tracking
                </CardTitle>
                <CardDescription>Your weekly exercise progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Weekly Goal</span>
                    <span className="text-sm">2/4 days</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Minutes Active</span>
                    <span className="text-sm">75/150 min</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Intensity Balance</span>
                    <span className="text-sm">Good</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/recommendations')}>
                  View Exercise Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
