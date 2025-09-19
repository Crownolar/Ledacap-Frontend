import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const STORAGE_KEY = "samples";

export default function SampleList() {
  const [samples, setSamples] = useState([]);
  const location = useLocation();
  const { projectId } = useParams();

  const loadSamples = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (projectId) {
      setSamples(stored.filter((s) => String(s.site_id) === String(projectId)));
    } else {
      setSamples(stored);
    }
  };

  useEffect(() => {
    loadSamples();

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        loadSamples();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [projectId]);

  useEffect(() => {
    loadSamples();
  }, [location, projectId]);

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">
        {projectId ? `Samples for Project ${projectId}` : "All Samples"}
      </h1>

      {samples.length === 0 ? (
        <p className="text-gray-600">No samples yet. Add one!</p>
      ) : (
        <ul className="space-y-3">
          {samples.map((s) => (
            <li
              key={s.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Site: {s.site_id}</p>
                <p className="text-sm text-gray-500">
                  {s.sample_type} — {s.status}
                </p>
              </div>
              <Link
                to={`/samples/${s.id}`}
                className="text-blue-600 hover:underline"
              >
                View →
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={projectId ? `/projects/${projectId}/samples/new` : "/samples/new"}
        className="mt-6 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        ➕ Add Sample
      </Link>
    </div>
  );
}
