import WorkoutTracker from "../components/WorkoutTracker";
import Gamification from "../components/Gamification";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <WorkoutTracker />
      <Gamification />
    </div>
  );
};

export default Home;