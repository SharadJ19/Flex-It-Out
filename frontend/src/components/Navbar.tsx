import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth-status", { withCredentials: true })
      .then((response) => setIsAuthenticated(response.data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
    navigate("/auth");
  };

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
      <div className="space-x-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        ) : (
          <>
            <Link to="/auth">
              <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                Login
              </button>
            </Link>
            <Link to="/auth">
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
