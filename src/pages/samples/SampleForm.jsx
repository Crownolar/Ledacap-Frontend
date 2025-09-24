import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

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
    date_collected: new Date().toISOString().split("T")[0],
    lead_level: "",
    notes: "",
    gps_lat: "",
    gps_lng: "",
  });

  useEffect(() => {
    if (!id) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            gps_lat: pos.coords.latitude.toFixed(6),
            gps_lng: pos.coords.longitude.toFixed(6),
          }));
        },
        (err) => {
          console.warn("GPS not available:", err.message);
        }
      );
    }
  }, [id]);

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
          date_collected:
            found.date_collected || new Date().toISOString().split("T")[0],
          lead_level: found.lead_level || "",
          notes: found.notes || "",
          gps_lat: found.gps?.lat?.toString() || "",
          gps_lng: found.gps?.lng?.toString() || "",
        });

        if (!found.gps?.lat || !found.gps?.lng) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setForm((prev) => ({
                ...prev,
                gps_lat: pos.coords.latitude.toFixed(6),
                gps_lng: pos.coords.longitude.toFixed(6),
              }));
            },
            (err) => {
              console.warn("GPS not available:", err.message);
            }
          );
        }
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.site_id || !form.collected_by || !form.date_collected) {
      toast.error(
        "Please fill all required fields (Site ID, Collected By, Date)."
      );
      return;
    }

    let samples = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (id) {
      samples = samples.map((s) =>
        String(s.id) === id
          ? {
              ...s,
              ...form,
              projectId: s.projectId || projectId || null,
              gps: {
                lat: parseFloat(form.gps_lat) || null,
                lng: parseFloat(form.gps_lng) || null,
              },
            }
          : s
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
      toast.success("Sample updated successfully!");
      navigate(`/samples/${id}`);
    } else {
      const newSample = {
        id: Date.now().toString(),
        projectId: projectId || null,
        ...form,
        gps: {
          lat: parseFloat(form.gps_lat) || null,
          lng: parseFloat(form.gps_lng) || null,
        },
      };
      samples.push(newSample);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
      toast.success("Sample created successfully!");
      if (projectId) {
        navigate(`/projects/${projectId}`);
      } else {
        navigate(`/samples/${newSample.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 gap-3">
      <div className="w-full max-w-2xl h-9 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className=" px-3 py-2 rounded hover:bg-gray-200 text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5 text-black" title="Go Back" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {id ? "Edit Sample" : "New Sample"}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="site_id"
            placeholder="Enter Site ID"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.site_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sample Type
          </label>
          <select
            name="sample_type"
            value={form.sample_type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Soil">Soil</option>
            <option value="Water">Water</option>
            <option value="Paint">Paint</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="cleared">Cleared</option>
            <option value="high-risk">High Risk</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collected By <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="collected_by"
              placeholder="Name of collector"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.collected_by}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Collected <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date_collected"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.date_collected}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Level
          </label>
          <input
            type="text"
            name="lead_level"
            placeholder="Enter lead level"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.lead_level}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Additional notes..."
            rows={3}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Latitude
            </label>
            <input
              type="text"
              name="gps_lat"
              placeholder="Latitude"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.gps_lat}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Longitude
            </label>
            <input
              type="text"
              name="gps_lng"
              placeholder="Longitude"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.gps_lng}
              onChange={handleChange}
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
