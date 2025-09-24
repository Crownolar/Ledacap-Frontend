import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Eye, Pencil, Plus } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const found = storedProjects.find((p) => String(p.id) === String(id));
    setProject(found);

    const storedSamples = JSON.parse(localStorage.getItem("samples")) || [];
    const projectSamples = storedSamples.filter(
      (s) => String(s.projectId) === String(id)
    );
    setSamples(projectSamples);
  }, [id]);

  if (!project) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        🚫 Project not found.
      </div>
    );
  }

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to delete this project?</p>
        <div className="flex gap-2">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            onClick={() => {
              const storedProjects =
                JSON.parse(localStorage.getItem("projects")) || [];
              const updatedProjects = storedProjects.filter(
                (p) => String(p.id) !== String(id)
              );
              localStorage.setItem("projects", JSON.stringify(updatedProjects));

              const storedSamples =
                JSON.parse(localStorage.getItem("samples")) || [];
              const updatedSamples = storedSamples.filter(
                (s) => String(s.projectId) !== String(id)
              );
              localStorage.setItem("samples", JSON.stringify(updatedSamples));

              toast.dismiss(t.id);
              toast.success("🗑️ Project deleted successfully!");
              navigate("/projects");
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5 text-black" title="Go Back" />
        </button>
        <Link
          to={`/projects/${id}/edit`}
          className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm sm:text-base"
        >
          <Pencil className="w-5 h-5 text-white" title="Edit Project" />
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        {project.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold">Samples</h2>
        <Link
          to={`/samples/new?projectId=${id}`}
          className="p-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 text-white" />
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {samples.length > 0 ? (
          samples.map((s) => (
            <div key={s.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  {s.sample_type} — Lead: {s.lead_level}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Status: {s.status}
                </p>
              </div>
              <Link
                to={`/samples/${s.id}`}
                className="text-blue-600 hover:underline text-sm sm:text-base"
              >
                <Eye className="w-5 h-5 text-blue-600" title="View Sample" />
              </Link>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 text-sm">No samples yet.</p>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
}
