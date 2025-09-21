import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-yellow-300">Ledacap</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto md:mx-0 text-gray-100 leading-relaxed">
            Ledacap is a cutting-edge platform designed to empower researchers,
            reviewers, and administrators by simplifying collaboration,
            innovation, and project management. We combine technology and
            simplicity to make lead detection and research collaboration more
            effective.
          </p>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="/LedacapIcons.png"
            alt="Ledacap Icon"
            className="w-2/3 md:w-1/2 drop-shadow-xl animate-pulse"
          />
        </div>
      </section>

      <section className="py-20 bg-white text-center px-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Who We Are</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
          At <span className="font-semibold text-indigo-600">Ledacap</span>, we
          believe that technology should empower people. Our app is built to
          detect lead (Pb), promote safety, and foster collaboration between
          communities, businesses, and researchers.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Empower innovation and protect communities by using technology to
              detect harmful substances and simplify collaboration.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              Build a future where collaboration fuels progress and where safe
              environments foster innovation and growth.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600">
              Integrity, Growth, and Excellence guide everything we do, ensuring
              trust and impact in every project.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Ready to Learn More?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join us on our mission to drive innovation and create safe,
          sustainable solutions. Be part of the Ledacap journey today.
        </p>
        <Link
          to="/contact"
          className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-300 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
