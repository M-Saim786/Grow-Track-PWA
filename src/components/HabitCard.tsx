import { useState } from 'react';
import { Check, Flame, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Habit, isCompletedToday, getCurrentStreak } from '@/utils/localStorage';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export const HabitCard = ({ habit, onToggle, onDelete }: HabitCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isCompleted = isCompletedToday(habit);
  const streak = getCurrentStreak(habit);

  const handleToggle = () => {
    if (!isCompleted) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
    onToggle(habit.id);
  };

  return (
    <Card className={cn(
      "p-4 transition-all duration-300 hover:shadow-grow cursor-pointer",
      isCompleted && "bg-growth-gradient text-white",
      isAnimating && "animate-complete"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant={isCompleted ? "secondary" : "outline"}
            size="sm"
            className={cn(
              "w-10 h-10 rounded-full transition-all duration-300",
              isCompleted && "bg-white text-success hover:bg-white/90",
              isAnimating && "animate-grow"
            )}
            onClick={handleToggle}
          >
            <Check className={cn(
              "w-5 h-5 transition-all duration-300",
              isCompleted ? "scale-100" : "scale-0"
            )} />
          </Button>
          
          <div>
            <h3 className={cn(
              "font-medium transition-all duration-300",
              isCompleted && "text-white"
            )}>
              {habit.name}
            </h3>
            {streak > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <Flame className="w-4 h-4 text-accent" />
                <span className={cn(
                  "text-sm font-medium",
                  isCompleted ? "text-white/90" : "text-accent"
                )}>
                  {streak} day{streak !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
              isCompleted && "text-white/70 hover:text-white hover:bg-white/10"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(habit.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Badge variant={isCompleted ? "secondary" : "outline"} className={cn(
            "transition-all duration-300",
            isCompleted && "bg-white/20 text-white border-white/30"
          )}>
            {isCompleted ? 'Done' : 'Pending'}
          </Badge>
        </div>
      </div>
    </Card>
  );
};