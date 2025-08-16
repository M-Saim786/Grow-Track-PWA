import { Leaf, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  totalHabits: number;
  completedToday: number;
}

export const Header = ({ totalHabits, completedToday }: HeaderProps) => {
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="text-center space-y-4 mb-8">
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-growth-gradient flex items-center justify-center">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-growth-gradient bg-clip-text text-transparent">
          GrowTrack
        </h1>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">{today}</span>
      </div>

      {totalHabits > 0 && (
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            {completedToday} of {totalHabits} completed
          </Badge>
          <Badge 
            variant={completionRate === 100 ? "default" : "outline"}
            className={completionRate === 100 ? "bg-success text-success-foreground" : ""}
          >
            {completionRate}%
          </Badge>
        </div>
      )}
    </header>
  );
};