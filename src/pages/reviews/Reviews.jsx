import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, CheckCircle, Search } from "lucide-react";

const STORAGE_KEY = "samples";

export default function Reviews() {
  const [samples, setSamples] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setSamples(data);
  }, []);

  const handleReview = (id) => {
    navigate(`/samples/${id}`);
  };

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = sample.site_id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || sample.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Reviews</h1>
      <p className="text-gray-600 mb-4">
        Here reviewers can see projects assigned to them for evaluation.
      </p>

      <div className="flex flex-col items-center justify-between sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by project/site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-40">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Filter by status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="cleared">Cleared</option>
            <option value="high-risk">High-Risk</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border-b">Project</th>
              <th className="p-3 border-b">Sample Type</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSamples.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No matching samples found
                </td>
              </tr>
            )}
            {filteredSamples.map((sample) => (
              <tr
                key={sample.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 border-b">{sample.site_id}</td>
                <td className="p-3 border-b">{sample.sample_type}</td>
                <td
                  className={`p-3 border-b capitalize font-medium ${
                    sample.status === "pending"
                      ? "text-yellow-600"
                      : sample.status === "cleared"
                      ? "text-green-600"
                      : sample.status === "high-risk"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {sample.status}
                </td>
                <td className="p-3 border-b">
                  {sample.status === "pending" ? (
                    <Eye
                      onClick={() => handleReview(sample.id)}
                      className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
                    />
                  ) : (
                    <CheckCircle
                      className="w-6 h-6 text-gray-400"
                      aria-label="Reviewed"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
