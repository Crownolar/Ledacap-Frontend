import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  return (
    <div className="p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
      >
        ← Back
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{project.name}</h1>
        <div className="flex gap-2">
          <Link
            to={`/projects/${id}/edit`}
            className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm sm:text-base"
          >
            Edit
          </Link>
        </div>
      </div>

      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        {project.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h2 className="text-lg sm:text-xl font-semibold">Samples</h2>
        <Link
          to={`/samples/new?projectId=${id}`} // <-- pass projectId
          className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base text-center"
        >
          + Add Sample
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {samples.length > 0 ? (
          samples.map((s) => (
            <div
              key={s.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
            >
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
                View
              </Link>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 text-sm">No samples yet.</p>
        )}
      </div>
    </div>
  );
}
