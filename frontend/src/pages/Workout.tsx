import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WorkoutTracker from "../components/WorkoutTracker";

const Workout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <WorkoutTracker />
      </div>
      <Footer />
    </div>
  );
};

export default Workout;
