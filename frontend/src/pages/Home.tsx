import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-blue-600">Welcome to FLEX-IT-OUT</h1>
          <p className="text-gray-500 mt-4 text-lg">Your AI-powered fitness companion!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
