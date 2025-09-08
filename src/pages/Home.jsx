import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      {/* <section className="flex flex-col items-center justify-center flex-1 text-center py-20 bg-gray-50">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Ledacap</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          Building smart solutions for people and businesses with modern
          technology. Join us today to explore innovation and growth.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </section> */}

      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-4">
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Ledacap</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            Building smart solutions for people and businesses with modern
            technology.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-6">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Link to="/login">Get Started</Link>
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="/hero-image.svg"
            alt="Ledacap"
            className="w-3/4 md:w-full"
          />
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ledacap is committed to driving digital transformation by providing
          innovative tools, research support, and collaboration opportunities.
          Learn more about how we empower businesses and individuals.
        </p>
        <Link
          to="/about"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Learn more →
        </Link>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          Have questions or want to work with us? We’d love to hear from you.
        </p>
        <Link
          to="/contact"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
