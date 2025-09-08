import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fake user data (in real case, you'd fetch from backend)
      const fakeUser = {
        username: email.split("@")[0], // just take part of email
        email,
        role: `researcher` || `reviewer`, // 👈 you can later detect real role from backend
      };
      const fakeToken = "dummy-token";

      login(fakeUser, fakeToken);

      // redirect by role
      navigate(`/dashboard/${fakeUser.role}`);
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // Call backend API → adjust URL based on backend team deployment
  //     const res = await fetch("https://your-api.com/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!res.ok) throw new Error("Invalid credentials");

  //     const data = await res.json();

  //     // Expecting backend returns { user: {...}, token: "..." }
  //     login(data.user, data.token); // ✅ save user + token in context
  //   } catch (err) {
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter your email"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//   const [role, setRole] = useState("admin"); // default role
//   const { login } = useAuth(); // ✅ get login from context

//   const handleLogin = (e) => {
//     e.preventDefault();
//     login("Abu-Muhammad", role); // ✅ update context + localStorage
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-lg shadow-md w-80"
//       >
//         <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           Select Role
//         </label>
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full border rounded px-3 py-2 mb-4"
//         >
//           <option value="admin">Admin</option>
//           <option value="researcher">Researcher</option>
//           <option value="reviewer">Reviewer</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
