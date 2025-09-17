import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const STORAGE_KEY = "samples";

export default function SampleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sample, setSample] = useState(null);

  useEffect(() => {
    const samples = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const found = samples.find((s) => String(s.id) === id);
    setSample(found || null);
  }, [id]);

  if (!sample) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-500">❌ Sample not found</h1>
        <button
          onClick={() => navigate("/samples")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Samples
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Sample #{sample.id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailCard label="Site ID" value={sample.site_id} />
        <DetailCard label="Type" value={sample.sample_type} />
        <DetailCard label="Status" value={sample.status} />
        <DetailCard label="Date Collected" value={sample.date_collected} />
        <DetailCard label="Collected By" value={sample.collected_by} />
        <DetailCard label="Lead Level" value={sample.lead_level} />
        <DetailCard label="Notes" value={sample.notes || "—"} />
        <DetailCard
          label="GPS"
          value={
            sample.gps ? `${sample.gps.lat}, ${sample.gps.lng}` : "Not provided"
          }
        />
      </div>

      <button
        onClick={() => navigate(`/samples/${id}/edit`)}
        className="mt-8 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
      >
        ✏️ Edit Sample
      </button>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
