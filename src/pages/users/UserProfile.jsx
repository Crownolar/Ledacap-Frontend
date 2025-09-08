import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();

  const user = {
    id,
    username: "researcher1",
    role: "Researcher",
    email: "res1@example.com",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={user.username}
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            defaultValue={user.email}
          />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={user.role}
            readOnly
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
