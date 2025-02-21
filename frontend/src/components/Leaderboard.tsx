const Leaderboard = () => {
  const users = [
    { name: "Alice", score: 1200 },
    { name: "Bob", score: 1100 },
    { name: "Charlie", score: 1000 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Leaderboard</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Rank</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;