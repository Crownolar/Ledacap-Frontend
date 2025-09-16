import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
            src="/hero-image.svg"
            alt="Ledacap"
            className="w-3/4 md:w-full animate-bounce-slow"
          />
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          At <span className="font-semibold text-indigo-600">Ledacap</span>, we
          are committed to driving digital transformation by creating
          cutting-edge solutions for administrators, researchers, and reviewers.
          <br />
          <br />
          <strong>Our Mission:</strong> Empower innovation through technology.{" "}
          <br />
          <strong>Our Vision:</strong> Build a future where collaboration fuels
          progress. <br />
          <strong>Our Values:</strong> Integrity, Growth, and Excellence.
        </p>
        <Link
          to="/about"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Discover more →
        </Link>
      </section>

      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          Have questions or want to collaborate with us? We’d love to hear from
          you.
        </p>
        <Link
          to="/contact"
          className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Contact Us
        </Link>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Ledacap. All rights reserved.</p>
      </footer>
    </div>
  );
}
