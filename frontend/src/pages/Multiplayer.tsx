import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Multiplayer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-blue-600">Multiplayer Challenges</h1>
          <p className="text-gray-500 mt-2 text-lg">Compete with friends and the global leaderboard!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Multiplayer;
