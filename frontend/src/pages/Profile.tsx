import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-blue-600">Profile</h1>
          <p className="text-gray-500 mt-2 text-lg">Track your progress and achievements.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
