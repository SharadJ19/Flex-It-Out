import { createContext, useState, ReactNode } from "react";

interface WorkoutContextType {
  workouts: string[];
  addWorkout: (workout: string) => void;
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<string[]>([]);

  const addWorkout = (workout: string) => {
    setWorkouts([...workouts, workout]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};
