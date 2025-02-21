const WorkoutTracker = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-blue-600">Workout Tracker</h2>
      <p className="text-gray-500 mt-2">AI-powered pose detection coming soon!</p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
        Start Workout
      </button>
    </div>
  );
};

export default WorkoutTracker;
