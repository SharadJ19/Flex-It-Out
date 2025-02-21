import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 bg-white shadow-md py-4 px-8 flex justify-between items-center z-50">
      <Link to="/" className="text-3xl font-bold text-blue-600">FLEX-IT-OUT</Link>
      <div className="space-x-8 text-lg">
        <Link to="/workout" className="text-gray-700 hover:text-blue-600 transition">Workout</Link>
        <Link to="/multiplayer" className="text-gray-700 hover:text-blue-600 transition">Multiplayer</Link>
        <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 transition">Leaderboard</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
