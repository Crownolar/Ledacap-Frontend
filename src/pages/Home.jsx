import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import About from "./About";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">Ledacap</span>
          </h2>
          <p className="text-lg max-w-lg mx-auto md:mx-0 text-gray-100">
            Building smart solutions for people and businesses with modern
            technology. Join us today to explore innovation and growth.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-6">
            {user ? (
              <>
                <Link
                  to={`/dashboard/${user.role}`}
                  className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition"
                >
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="/LedacapIcons.png"
            alt="Ledacap"
            className="w-3/4 md:w-full animate-bounce-slow"
          />
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <About />
      </section>

      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Ledacap. All rights reserved.</p>
      </footer>
    </div>
  );
}
