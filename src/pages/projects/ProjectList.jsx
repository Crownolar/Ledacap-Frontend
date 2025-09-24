import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, Plus } from "lucide-react";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded hover:bg-gray-200"
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <Link
          to="/projects/new"
          className="p-2 rounded hover:bg-blue-200"
          title="Add Project"
        >
          <Plus className="w-6 h-6 text-blue-600" />
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Projects</h1>

      <div className="bg-white rounded-xl shadow divide-y">
        {projects.length === 0 ? (
          <p className="p-4 text-gray-500">No projects yet. Create one!</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between">
              {/* Project text */}
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.description}</p>
                <p className="text-gray-400 text-xs">
                  Created by: {p.createdBy}
                </p>
              </div>

              <Link
                to={`/projects/${p.id}`}
                className="ml-3 p-2 hover:bg-gray-100 rounded"
                title="View Project"
              >
                <Eye className="w-5 h-5 text-blue-600" />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
