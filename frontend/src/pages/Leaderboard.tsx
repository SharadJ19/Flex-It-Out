import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10">
        <Leaderboard />
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
