const Leaderboard = () => {
  const players = [
    { id: 1, name: "John Doe", score: 1200 },
    { id: 2, name: "Jane Smith", score: 1100 },
    { id: 3, name: "Alice Johnson", score: 1050 },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Leaderboard</h2>
      <ul className="space-y-3">
        {players.map((player, index) => (
          <li key={player.id} className="flex justify-between p-3 rounded-md bg-gray-50">
            <span className="text-lg">{index + 1}. {player.name}</span>
            <span className="text-blue-600 font-semibold">{player.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
