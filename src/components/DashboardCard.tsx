
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  status: string;
  actionText: string;
  actionHref: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  value, 
  status, 
  actionText, 
  actionHref 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-pcos-500">{icon}</div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to={actionHref}>{actionText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
