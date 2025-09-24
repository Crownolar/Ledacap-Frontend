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
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 hover:bg-gray-200 text-sm sm:text-base"
      >
        <ArrowLeft className="w-5 h-5 text-black" title="Go Back" />
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
        <Link
          to="/projects/new"
          className=" px-4 py-2 rounded-lg hover:bg-blue-200 text-sm sm:text-base text-center"
        >
          <Plus className="w-7 h-7 text-blue-600" />
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {projects.length === 0 ? (
          <p className="p-4 text-gray-500">No projects yet. Create one!</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.description}</p>
                <p className="text-gray-400 text-xs">
                  Created by: {p.createdBy}
                </p>
              </div>
              <Link
                to={`/projects/${p.id}`}
                className="text-blue-600 hover:underline text-sm sm:text-base"
              >
                <Eye className="w-5 h-5 text-blue-600" title="View Project" />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
