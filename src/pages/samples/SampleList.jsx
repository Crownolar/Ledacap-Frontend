import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { ArrowLeft, Eye, Plus } from "lucide-react";

const STORAGE_KEY = "samples";
const PROJECT_KEY = "projects";

export default function SampleList() {
  const [samples, setSamples] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const loadSamples = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (projectId) {
      setSamples(stored.filter((s) => String(s.site_id) === String(projectId)));
    } else {
      setSamples(stored);
    }
  };

  const loadProjects = () => {
    const storedProjects = JSON.parse(
      localStorage.getItem(PROJECT_KEY) || "[]"
    );
    setProjects(storedProjects);
  };

  useEffect(() => {
    loadSamples();
    loadProjects();

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY || e.key === PROJECT_KEY) {
        loadSamples();
        loadProjects();
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

  const handleAddSampleClick = () => {
    setIsModalOpen(true);
  };

  const handleChoose = (choice) => {
    setIsModalOpen(false);
    if (choice === "createProject") {
      navigate("/projects/new");
    } else if (choice === "chooseProject") {
      navigate("/projects");
    } else if (choice === "currentProject" && projectId) {
      navigate(`/projects/${projectId}/samples/new`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 rounded hover:bg-gray-200 text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5 text-black" title="Go Back" />
        </button>

        <button
          onClick={handleAddSampleClick}
          className="px-4 py-2 rounded-lg hover:bg-green-200"
        >
          <Plus className="w-5 h-5 text-green-600" />
        </button>
      </div>
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
                <Eye className="w-5 h-5 text-blue-600" title="View Sample" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative z-10">
          <Dialog.Title className="text-lg font-bold mb-2">
            Add a Sample
          </Dialog.Title>
          <p className="text-gray-600 mb-4">
            To create a sample, you need to either select an existing project or
            create a new one.
          </p>

          <div className="space-y-3">
            {projectId && (
              <button
                onClick={() => handleChoose("currentProject")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-7 h-7 text-blue-600" /> Add to Current
                Project
              </button>
            )}
            {projects.length > 0 && (
              <button
                onClick={() => handleChoose("chooseProject")}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                📂 Choose Exisiting Project
              </button>
            )}
            <button
              onClick={() => handleChoose("createProject")}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              🆕 Create New Project
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
}
