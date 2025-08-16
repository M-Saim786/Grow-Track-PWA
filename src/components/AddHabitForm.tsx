import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddHabitFormProps {
  onAdd: (name: string) => void;
}

export const AddHabitForm = ({ onAdd }: AddHabitFormProps) => {
  const [name, setName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Card className="p-4 border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setIsExpanded(true)}>
        <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add new habit</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-primary/30 shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Enter habit name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          className="border-none bg-muted/50 focus:bg-background transition-colors"
        />
        <div className="flex gap-2">
          <Button 
            type="submit" 
            disabled={!name.trim()}
            className="flex-1 bg-growth-gradient hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Habit
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setIsExpanded(false);
              setName('');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};