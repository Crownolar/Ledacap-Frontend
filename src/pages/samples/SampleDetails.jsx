// import { useParams } from "react-router-dom";

// export default function SampleDetails() {
//   const { id } = useParams();

//   const sample = {
//     id,
//     site_id: "S001",
//     type: "Soil",
//     status: "Pending",
//     lead_level: "High",
//     collected_by: "John Doe",
//     notes: "Near school area",
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Sample Details</h1>
//       <div className="bg-white shadow p-6 rounded-lg">
//         <p>
//           <strong>Site ID:</strong> {sample.site_id}
//         </p>
//         <p>
//           <strong>Type:</strong> {sample.type}
//         </p>
//         <p>
//           <strong>Status:</strong> {sample.status}
//         </p>
//         <p>
//           <strong>Lead Level:</strong> {sample.lead_level}
//         </p>
//         <p>
//           <strong>Collected By:</strong> {sample.collected_by}
//         </p>
//         <p>
//           <strong>Notes:</strong> {sample.notes}
//         </p>
//       </div>
//     </div>
//   );
// }

import { useParams, Link } from "react-router-dom";

export default function SampleDetails() {
  const { id } = useParams();

  // Mock sample (later replace with API)
  const sample = {
    id,
    site_id: "Site A",
    sample_type: "Soil",
    status: "pending",
    collected_by: "Yusuf",
    date_collected: "2025-08-15",
    lead_level: "45 ppm",
    notes: "Collected near school compound",
    gps: { lat: "8.4956", lng: "4.5503" },
    photo: "https://via.placeholder.com/300x200.png?text=Sample+Photo",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sample Details</h1>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Top Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">Site ID</p>
            <h2 className="text-lg font-semibold">{sample.site_id}</h2>
          </div>
          <div>
            <p className="text-gray-600">Sample Type</p>
            <h2 className="text-lg font-semibold">{sample.sample_type}</h2>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <span
              className={`px-3 py-1 rounded text-sm ${
                sample.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : sample.status === "reviewed"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {sample.status}
            </span>
          </div>
          <div>
            <p className="text-gray-600">Collected By</p>
            <h2 className="text-lg font-semibold">{sample.collected_by}</h2>
          </div>
          <div>
            <p className="text-gray-600">Date Collected</p>
            <h2 className="text-lg font-semibold">{sample.date_collected}</h2>
          </div>
          <div>
            <p className="text-gray-600">Lead Level</p>
            <h2 className="text-lg font-semibold">{sample.lead_level}</h2>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <p className="text-gray-600">Notes</p>
          <p className="text-gray-800">{sample.notes}</p>
        </div>

        {/* GPS */}
        <div className="mt-6">
          <p className="text-gray-600">GPS Coordinates</p>
          <p className="text-gray-800">
            Lat: {sample.gps.lat}, Lng: {sample.gps.lng}
          </p>
        </div>

        {/* Photo */}
        <div className="mt-6">
          <p className="text-gray-600 mb-2">Photo</p>
          <img
            src={sample.photo}
            alt="Sample"
            className="rounded-lg shadow-md w-full md:w-1/2"
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            to={`/samples/${sample.id}/edit`}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit Sample
          </Link>
          <Link
            to="/samples"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}
