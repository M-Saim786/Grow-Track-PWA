import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HabitCard } from '@/components/HabitCard';
import { AddHabitForm } from '@/components/AddHabitForm';
import { Habit, loadHabits, saveHabits, getTodayString, isCompletedToday } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadedHabits = loadHabits();
    setHabits(loadedHabits);
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);


  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      completedDates: []
    };
    setHabits([...habits, newHabit]);
    toast({
      title: "Habit added! 🌱",
      description: `"${name}" is ready to grow with you.`,
    });
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prevHabits => {
      const habitToDelete = prevHabits.find(h => h.id === habitId);
      const filtered = prevHabits.filter(h => h.id !== habitId);
      
      if (habitToDelete) {
        toast({
          title: "Habit deleted",
          description: `"${habitToDelete.name}" has been removed.`,
          variant: "destructive"
        });
      }
      
      return filtered;
    });
  };

  const toggleHabit = (habitId: string) => {
    const today = getTodayString();
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isCurrentlyCompleted = habit.completedDates.includes(today);
          let newCompletedDates;
          
          if (isCurrentlyCompleted) {
            newCompletedDates = habit.completedDates.filter(date => date !== today);
            toast({
              title: "Habit unmarked",
              description: `"${habit.name}" marked as not done for today.`,
              variant: "destructive"
            });
          } else {
            newCompletedDates = [...habit.completedDates, today];
            toast({
              title: "Great job! 🎉",
              description: `"${habit.name}" completed for today!`,
            });
          }
          
          return {
            ...habit,
            completedDates: newCompletedDates
          };
        }
        return habit;
      })
    );
  };

  const completedToday = habits.filter(habit => isCompletedToday(habit)).length;
  const incompleteHabits = habits.filter(habit => !isCompletedToday(habit));
  const completedHabits = habits.filter(habit => isCompletedToday(habit));

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Header totalHabits={habits.length} completedToday={completedToday} />
        
        <div className="space-y-4">
          <AddHabitForm onAdd={addHabit} />
          
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Start your growth journey</h3>
              <p className="text-muted-foreground">Add your first habit above and begin tracking your progress!</p>
            </div>
          ) : (
            <>
              {/* Incomplete Habits */}
              {incompleteHabits.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Today's Habits</h3>
                  {incompleteHabits.map(habit => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggle={toggleHabit}
                      onDelete={deleteHabit}
                    />
                  ))}
                </div>
              )}

              {/* Completed Habits */}
              {completedHabits.length > 0 && (
                <div className="space-y-3 mt-8">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Completed Today ({completedHabits.length})
                  </h3>
                  <div className="space-y-3">
                    {completedHabits.map(habit => (
                      <HabitCard
                        key={habit.id}
                        habit={habit}
                        onToggle={toggleHabit}
                        onDelete={deleteHabit}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
