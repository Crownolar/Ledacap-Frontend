import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function ProjectForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (id) {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const projectToEdit = storedProjects.find(
        (p) => String(p.id) === String(id)
      );

      if (projectToEdit) {
        setName(projectToEdit.name);
        setDescription(projectToEdit.description);
        setEditing(true);
      }
    }
  }, [id]);

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        🚫 Access Denied — Only Admins can create/edit projects.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

    if (editing) {
      const updatedProjects = existingProjects.map((p) =>
        String(p.id) === String(id) ? { ...p, name, description } : p
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      toast.success("✅ Project updated successfully!");
    } else {
      const newProject = {
        id: Date.now(),
        name,
        description,
        createdBy: user.username,
      };
      localStorage.setItem(
        "projects",
        JSON.stringify([...existingProjects, newProject])
      );
      toast.success("✅ Project created successfully!");
    }

    navigate("/projects");
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
      >
        ← Back
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        {editing ? "Edit Project" : "Create Project"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="4"
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-white py-3 border-t shadow-md flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            {editing ? "Update Project" : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
