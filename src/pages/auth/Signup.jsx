import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("researcher");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fakeUser = { username, email, role };
      const fakeToken = "dummy-token";

      login(fakeUser, fakeToken);

      navigate(`/dashboard/${role}`);
    } catch (err) {
      alert("Something went wrong");
      x;
    } finally {
      setLoading(false);
    }
  };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // Call backend signup API → adjust endpoint
  //     const res = await fetch("http://194.37.81.48:8000/api/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, email, password, role }),
  //     });

  //     if (!res.ok) throw new Error("Signup failed");

  //     const data = await res.json();

  //     // Expecting backend returns { user: {...}, token: "..." }
  //     login(data.user, data.token); // directly log in after signup
  //   } catch (err) {
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter username"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter email"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter password"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="admin">Admin</option>
          <option value="researcher">Researcher</option>
          <option value="reviewer">Reviewer</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
