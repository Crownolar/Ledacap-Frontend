import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("admin");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login("Abu-Muhammad", role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
      >
        ← Back
      </button>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
