import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center font-bold">
      <div className="text-2xl font-bold">
        <Link to="/">FLEX-IT-OUT</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/workout" className="hover:text-blue-200">
            Workout
          </Link>
        </li>
        <li>
          <Link to="/multiplayer" className="hover:text-blue-200">
            Multiplayer
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="hover:text-blue-200">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-blue-200">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;