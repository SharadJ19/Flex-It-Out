import { useState } from "react";
import PushupsTracker from "../components/PushupsTracker";
import SquatsTracker from "../components/SquatsTracker";
import CrunchesTracker from "../components/CrunchesTracker";

const Workout = () => {
  const [activeExercise, setActiveExercise] = useState<"pushups" | "squats" | "crunches" | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-blue-600">
      <h1 className="text-3xl font-bold mb-6">AI Workout Tracker</h1>

      {/* Exercise Selection Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeExercise === "pushups" ? "bg-white text-blue-600" : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => setActiveExercise("pushups")}
        >
          Pushups
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeExercise === "squats" ? "bg-white text-blue-600" : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => setActiveExercise("squats")}
        >
          Squats
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeExercise === "crunches" ? "bg-white text-blue-600" : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => setActiveExercise("crunches")}
        >
          Crunches
        </button>
      </div>

      {/* Conditionally Render the Selected Exercise Tracker */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {activeExercise === "pushups" && <PushupsTracker />}
        {activeExercise === "squats" && <SquatsTracker />}
        {activeExercise === "crunches" && <CrunchesTracker />}
      </div>
    </div>
  );
};

export default Workout;
