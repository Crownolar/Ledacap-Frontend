import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const STORAGE_KEY = "samples";

export default function SampleList() {
  const [samples, setSamples] = useState([]);
  const location = useLocation();

  const loadSamples = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setSamples(stored);
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
  }, []);

  useEffect(() => {
    loadSamples();
  }, [location]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Samples</h1>

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
        to="/samples/new"
        className="mt-6 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        ➕ Add Sample
      </Link>
    </div>
  );
}
