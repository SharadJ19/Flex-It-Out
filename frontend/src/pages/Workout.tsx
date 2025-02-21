import { useState } from "react";
import PushupsTracker from "../components/PushupsTracker";
import SquatsTracker from "../components/SquatsTracker";
import CrunchesTracker from "../components/CrunchesTracker";

const Workout = () => {
  const [activeExercise, setActiveExercise] = useState<"pushups" | "squats" | "crunches" | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-blue-600 p-6">
      <h1 className="text-4xl font-bold mb-8">AI Workout Tracker</h1>

      {/* Exercise Selection Buttons */}
      <div className="flex gap-4 mb-6">
        {["pushups", "squats", "crunches"].map((exercise) => (
          <button
            key={exercise}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              activeExercise === exercise
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setActiveExercise(exercise as "pushups" | "squats" | "crunches")}
          >
            {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
          </button>
        ))}
      </div>

      {/* Conditionally Render the Selected Exercise Tracker */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg text-center">
        {!activeExercise && <p className="text-lg text-gray-500">Select an exercise to begin.</p>}
        {activeExercise === "pushups" && <PushupsTracker />}
        {activeExercise === "squats" && <SquatsTracker />}
        {activeExercise === "crunches" && <CrunchesTracker />}
      </div>
    </div>
  );
};

export default Workout;
