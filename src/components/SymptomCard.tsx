
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SymptomCardProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

const SymptomCard = ({ id, title, description, checked, onToggle }: SymptomCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer hover:border-pcos-400",
        checked && "border-pcos-500 bg-pcos-100/80"
      )}
      onClick={() => onToggle(!checked)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id={id} 
            checked={checked}
            onCheckedChange={(isChecked) => onToggle(!!isChecked)}
            className="mt-1 data-[state=checked]:bg-pcos-500 data-[state=checked]:border-pcos-500"
          />
          <div className="space-y-1">
            <Label 
              htmlFor={id} 
              className={cn(
                "text-lg font-medium",
                checked && "text-pcos-700"
              )}
            >
              {title}
            </Label>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomCard;
