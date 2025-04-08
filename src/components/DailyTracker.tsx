
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { UtensilsCrossed, Dumbbell, Plus, X, CheckCircle, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TrackerItem {
  id: string;
  date: string;
  content: string;
  completed: boolean;
}

interface TrackerProps {
  type: 'diet' | 'exercise';
}

const DailyTracker: React.FC<TrackerProps> = ({ type }) => {
  const [items, setItems] = useState<TrackerItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem(`pcos-${type}-tracker`);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, [type]);
  
  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`pcos-${type}-tracker`, JSON.stringify(items));
  }, [items, type]);
  
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD format
  };
  
  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    
    const newTrackerItem: TrackerItem = {
      id: Date.now().toString(),
      date: getCurrentDate(),
      content: newItem,
      completed: false
    };
    
    setItems(prev => [...prev, newTrackerItem]);
    setNewItem('');
    
    toast({
      title: `${type === 'diet' ? 'Meal' : 'Exercise'} added`,
      description: `Your ${type} plan has been updated.`,
    });
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleToggleComplete = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };
  
  const todayItems = items.filter(item => item.date === getCurrentDate());
  const previousItems = items.filter(item => item.date !== getCurrentDate());
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {type === 'diet' ? (
            <UtensilsCrossed className="h-5 w-5 text-pcos-600" />
          ) : (
            <Dumbbell className="h-5 w-5 text-pcos-600" />
          )}
          {type === 'diet' ? 'Daily Diet Tracker' : 'Daily Exercise Tracker'}
        </CardTitle>
        <CardDescription>
          {type === 'diet' 
            ? 'Track your daily meals and nutrition goals' 
            : 'Log your daily workouts and physical activities'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-grow">
            <Label htmlFor={`${type}-item`} className="sr-only">
              Add new {type === 'diet' ? 'meal' : 'exercise'}
            </Label>
            <Input 
              id={`${type}-item`}
              placeholder={`Add ${type === 'diet' ? 'a meal or nutrition goal' : 'an exercise or workout'}`}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
            />
          </div>
          <Button 
            onClick={handleAddItem}
            size="icon" 
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {todayItems.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Today's Tracking
            </h4>
            <div className="space-y-2">
              {todayItems.map(item => (
                <div 
                  key={item.id}
                  className={`flex items-center justify-between p-2 rounded-md border ${
                    item.completed ? 'bg-pcos-50 border-pcos-200' : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-6 w-6 ${item.completed ? 'text-pcos-600' : 'text-muted-foreground'}`} 
                      onClick={() => handleToggleComplete(item.id)}
                    >
                      <CheckCircle className={`h-4 w-4 ${item.completed ? 'fill-current' : ''}`} />
                    </Button>
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>{item.content}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => handleDeleteItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {previousItems.length > 0 && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Previous Entries</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <span className="sr-only">Toggle history</span>
                  {isOpen ? (
                    <span className="text-xs">Hide</span>
                  ) : (
                    <span className="text-xs">Show</span>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 mt-2">
              {previousItems.map(item => (
                <div 
                  key={item.id}
                  className={`flex items-center justify-between p-2 rounded-md border text-sm ${
                    item.completed ? 'bg-secondary/50 border-secondary' : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground text-xs whitespace-nowrap mt-0.5">{item.date}</span>
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>{item.content}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => handleDeleteItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      
      {todayItems.length === 0 && (
        <CardFooter className="text-center text-sm text-muted-foreground pt-0">
          No {type === 'diet' ? 'meals' : 'exercises'} tracked today. Add your first one!
        </CardFooter>
      )}
    </Card>
  );
};

export default DailyTracker;
