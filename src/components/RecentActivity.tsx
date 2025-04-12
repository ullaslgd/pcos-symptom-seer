
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Utensils, Dumbbell, CheckCircle2, Calendar, Clipboard } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'assessment' | 'diet' | 'exercise' | 'symptom' | 'appointment' | 'recommendation';
  description: string;
  date: string;
}

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  
  useEffect(() => {
    // In a real app, this would come from an API
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'assessment',
        description: 'Completed PCOS risk assessment',
        date: '2025-04-10'
      },
      {
        id: '2',
        type: 'diet',
        description: 'Added 3 new meal entries',
        date: '2025-04-11'
      },
      {
        id: '3',
        type: 'exercise',
        description: 'Completed 30 minutes of yoga',
        date: '2025-04-11'
      },
      {
        id: '4',
        type: 'symptom',
        description: 'Logged new symptom: fatigue',
        date: '2025-04-12'
      },
      {
        id: '5',
        type: 'recommendation',
        description: 'Viewed personalized recommendations',
        date: '2025-04-12'
      }
    ];
    
    setActivities(mockActivities);
  }, []);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return <Clipboard className="h-4 w-4 text-pcos-600" />;
      case 'diet':
        return <Utensils className="h-4 w-4 text-pcos-600" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4 text-pcos-600" />;
      case 'symptom':
        return <Activity className="h-4 w-4 text-pcos-600" />;
      case 'appointment':
        return <Calendar className="h-4 w-4 text-pcos-600" />;
      case 'recommendation':
        return <CheckCircle2 className="h-4 w-4 text-pcos-600" />;
      default:
        return <Activity className="h-4 w-4 text-pcos-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No recent activities to display
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="bg-pcos-100 p-2 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
