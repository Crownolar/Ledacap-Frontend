import { useState } from "react";
import emailjs from "@emailjs/browser"; // ✅ use the correct package
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: "Ledacap Support Team",
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          message: formData.message,
          logo_url: "https://i.imgur.com/Oc2Wb1r.png",
          current_year: new Date().getFullYear(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setFormData({ from_name: "", reply_to: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("❌ Failed to send message. Please try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch with <span className="text-yellow-300">Ledacap</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto md:mx-0 text-gray-100 leading-relaxed">
            Have questions, feedback, or want to collaborate? We’d love to hear
            from you. Reach out today and let’s make innovation happen together.
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
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Contact Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Our support team is always ready to help you with inquiries, technical
          support, and partnership opportunities.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Email</h3>
            <p className="text-gray-600">support@ledacap.com</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Phone</h3>
            <p className="text-gray-600">+234 9155046279</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Office</h3>
            <p className="text-gray-600">University, Ilorin, Nigeria</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Send Us a Message
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6 text-left"
        >
          <input
            type="text"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
            required
          />
          <input
            type="email"
            name="reply_to"
            value={formData.reply_to}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
            required
          />
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-300 transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Ledacap. All rights reserved.</p>
      </footer>
    </div>
  );
}
