import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setIsAuthenticated }: { setIsAuthenticated: (auth: boolean) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin ? "http://localhost:3000/login" : "http://localhost:3000/signup";
      await axios.post(url, formData, { withCredentials: true });

      setIsAuthenticated(true);
      navigate("/"); // Redirect after login
    } catch (err) {
      setError("Invalid credentials or user exists");
    }
  };

  // Auto-check authentication
  useEffect(() => {
    axios.get("http://localhost:3000/auth-status", { withCredentials: true })
      .then(response => setIsAuthenticated(response.data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-blue-600 text-white rounded-lg">
        <h2 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 rounded bg-white text-black"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-white text-black"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-white text-black"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full py-2 bg-white text-blue-600 font-bold rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
