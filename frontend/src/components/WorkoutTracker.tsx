const WorkoutTracker = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Workout Tracker</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="text-center">
          <p className="text-xl">AI-Powered Pose Detection</p>
          <div className="mt-4">
            <video
              autoPlay
              className="w-full h-96 bg-gray-200 rounded-lg"
            ></video>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;