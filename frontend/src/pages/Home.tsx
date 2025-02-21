import { useState } from "react";
import PushupsTracker from "../components/PushupsTracker";
import SquatsTracker from "../components/SquatsTracker";
import CrunchesTracker from "../components/CrunchesTracker";
import Gamification from "../components/Gamification";

const Home = () => {
  const [activeExercise, setActiveExercise] = useState<"pushups" | "squats" | "crunches" | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-600">
      <h1 className="text-3xl font-bold mb-6">Choose Your Workout</h1>

      {/* Exercise Selection Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-6 py-3 rounded-lg font-semibold border border-blue-600 transition ${
            activeExercise === "pushups" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white"
          }`}
          onClick={() => setActiveExercise("pushups")}
        >
          Pushups
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold border border-blue-600 transition ${
            activeExercise === "squats" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white"
          }`}
          onClick={() => setActiveExercise("squats")}
        >
          Squats
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold border border-blue-600 transition ${
            activeExercise === "crunches" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white"
          }`}
          onClick={() => setActiveExercise("crunches")}
        >
          Crunches
        </button>
      </div>

      {/* Conditionally Render the Selected Exercise Tracker */}
      <div className="w-full max-w-lg bg-gray-100 p-4 rounded-lg shadow-md">
        {activeExercise === null && <p className="text-center text-lg">Select an exercise to begin.</p>}
        {activeExercise === "pushups" && <PushupsTracker />}
        {activeExercise === "squats" && <SquatsTracker />}
        {activeExercise === "crunches" && <CrunchesTracker />}
      </div>

      {/* Gamification Component (If needed) */}
      <div className="mt-6">
        <Gamification />
      </div>
    </div>
  );
};

export default Home;
