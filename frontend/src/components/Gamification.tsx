const Gamification = () => {
  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-4">Gamification</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold">Score</p>
            <p className="text-2xl">1500</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">Streak</p>
            <p className="text-2xl">7 Days</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">Badges</p>
            <p className="text-2xl">🏅 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;