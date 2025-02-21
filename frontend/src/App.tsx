import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Multiplayer from "./pages/Multiplayer";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen text-black">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<Home />} />
            <Route path="/workout" element={isAuthenticated ? <Workout /> : <Navigate to="/auth" />} />
            <Route path="/multiplayer" element={isAuthenticated ? <Multiplayer /> : <Navigate to="/auth" />} />
            <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
