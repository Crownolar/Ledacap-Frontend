// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function ProjectForm() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="p-6 text-center text-red-600 font-semibold">
//         🚫 Access Denied — Only Admins can create projects.
//       </div>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name.trim() || !description.trim()) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

//     const newProject = {
//       id: Date.now(),
//       name,
//       description,
//       createdBy: user.username,
//     };

//     localStorage.setItem(
//       "projects",
//       JSON.stringify([...existingProjects, newProject])
//     );

//     navigate("/projects");
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-2xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
//       >
//         ← Back
//       </button>
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
//         Create Project
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium mb-1">Project Name</label>
//           <input
//             type="text"
//             placeholder="Enter project name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             rows="4"
//             placeholder="Enter project description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
//           ></textarea>
//         </div>

//         <div className="sticky bottom-0 left-0 right-0 bg-white py-3 border-t shadow-md flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
//           >
//             Save Project
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProjectForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // <-- detect edit mode (if id exists)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      // Editing: load project from localStorage
      const existingProjects =
        JSON.parse(localStorage.getItem("projects")) || [];
      const found = existingProjects.find((p) => String(p.id) === String(id));

      if (found) {
        setName(found.name || "");
        setDescription(found.description || "");
      }
    }
  }, [id]);

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        🚫 Access Denied — Only Admins can create or edit projects.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    let existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

    if (id) {
      // 🔹 Update existing project
      existingProjects = existingProjects.map((p) =>
        String(p.id) === String(id) ? { ...p, name, description } : p
      );
      localStorage.setItem("projects", JSON.stringify(existingProjects));
      navigate(`/projects/${id}`); // back to details page
    } else {
      // 🔹 Create new project
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
      navigate("/projects");
    }
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
        {id ? "Edit Project" : "Create Project"}
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
            {id ? "Update Project" : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
