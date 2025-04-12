
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for the charts
const weightData = [
  { month: 'Jan', weight: 69 },
  { month: 'Feb', weight: 68.5 },
  { month: 'Mar', weight: 69.2 },
  { month: 'Apr', weight: 68.8 },
  { month: 'May', weight: 68.3 },
  { month: 'Jun', weight: 67.9 },
];

const periodData = [
  { month: 'Jan', days: 6 },
  { month: 'Feb', days: 0 },
  { month: 'Mar', days: 5 },
  { month: 'Apr', days: 0 },
  { month: 'May', days: 6 },
  { month: 'Jun', days: 0 },
];

const symptomsData = [
  { name: 'Acne', value: 7 },
  { name: 'Fatigue', value: 12 },
  { name: 'Hair Loss', value: 5 },
  { name: 'Mood Swings', value: 9 },
  { name: 'Weight Gain', value: 6 },
];

const HealthMetrics: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue="weight">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="periods">Periods</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#8884d8" 
                    name="Weight (kg)" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Your weight has decreased by 1.1kg over the past 6 months
            </p>
          </TabsContent>
          
          <TabsContent value="periods" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={periodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="days" name="Period Duration (days)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Your cycle pattern shows irregularity typical of PCOS
            </p>
          </TabsContent>
          
          <TabsContent value="symptoms" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={symptomsData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Frequency Reported" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Fatigue and mood swings are your most frequently reported symptoms
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthMetrics;
