import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const STORAGE_KEY = "samples";

export default function SampleForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    site_id: "",
    sample_type: "Soil",
    status: "pending",
    collected_by: "",
    date_collected: "",
    lead_level: "",
    notes: "",
    gps_lat: "",
    gps_lng: "",
  });

  useEffect(() => {
    if (id) {
      const samples = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const found = samples.find((s) => String(s.id) === id);
      if (found) {
        setForm({
          site_id: found.site_id || "",
          sample_type: found.sample_type || "Soil",
          status: found.status || "pending",
          collected_by: found.collected_by || "",
          date_collected: found.date_collected || "",
          lead_level: found.lead_level || "",
          notes: found.notes || "",
          gps_lat: found.gps?.lat || "",
          gps_lng: found.gps?.lng || "",
        });
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let samples = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (id) {
      samples = samples.map((s) =>
        String(s.id) === id
          ? { ...s, ...form, gps: { lat: form.gps_lat, lng: form.gps_lng } }
          : s
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
      alert("✅ Sample updated successfully!");
      navigate(`/samples/${id}`);
    } else {
      const newSample = {
        id: Date.now().toString(),
        projectId: projectId || null,
        ...form,
        gps: { lat: form.gps_lat, lng: form.gps_lng },
      };
      samples.push(newSample);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
      alert("✅ Sample created successfully!");
      if (projectId) {
        navigate(`/projects/${projectId}`);
      } else {
        navigate(`/samples/${newSample.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {id ? "Edit Sample" : "New Sample"}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site ID
          </label>
          <input
            type="text"
            placeholder="Enter Site ID"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.site_id}
            onChange={(e) => setForm({ ...form, site_id: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sample Type
          </label>
          <select
            value={form.sample_type}
            onChange={(e) => setForm({ ...form, sample_type: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Soil">Soil</option>
            <option value="Water">Water</option>
            <option value="Paint">Paint</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collected By
            </label>
            <input
              type="text"
              placeholder="Name of collector"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.collected_by}
              onChange={(e) =>
                setForm({ ...form, collected_by: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Collected
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.date_collected}
              onChange={(e) =>
                setForm({ ...form, date_collected: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Level
          </label>
          <input
            type="text"
            placeholder="Enter lead level"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.lead_level}
            onChange={(e) => setForm({ ...form, lead_level: e.target.value })}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            placeholder="Additional notes..."
            rows={3}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Latitude
            </label>
            <input
              type="text"
              placeholder="Latitude"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.gps_lat}
              onChange={(e) => setForm({ ...form, gps_lat: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Longitude
            </label>
            <input
              type="text"
              placeholder="Longitude"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.gps_lng}
              onChange={(e) => setForm({ ...form, gps_lng: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/samples")}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            {id ? "Update Sample" : "Save Sample"}
          </button>
        </div>
      </form>
    </div>
  );
}
