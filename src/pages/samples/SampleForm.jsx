// export default function SampleForm() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Add / Edit Sample</h1>
//       <form className="bg-white p-6 shadow rounded-lg space-y-4">
//         <div>
//           <label className="block font-medium">Site ID</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             placeholder="Enter site ID"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Type</label>
//           <select className="w-full border p-2 rounded">
//             <option>Soil</option>
//             <option>Water</option>
//             <option>Air</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium">Status</label>
//           <select className="w-full border p-2 rounded">
//             <option>Pending</option>
//             <option>Reviewed</option>
//             <option>Analyzed</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium">Notes</label>
//           <textarea className="w-full border p-2 rounded" rows="3"></textarea>
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Save Sample
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function SampleForm() {
//   const { id } = useParams(); // if editing, id will exist
//   const navigate = useNavigate();

//   // Mock data if editing
//   const existingSample = {
//     id: 1,
//     site_id: "Site A",
//     sample_type: "Soil",
//     status: "pending",
//     collected_by: "Yusuf",
//     date_collected: "2025-08-15",
//     lead_level: "45 ppm",
//     notes: "Collected near school compound",
//     gps: { lat: "8.4956", lng: "4.5503" },
//   };

//   const [formData, setFormData] = useState({
//     site_id: "",
//     sample_type: "Soil",
//     status: "pending",
//     collected_by: "Current User",
//     date_collected: "",
//     lead_level: "",
//     notes: "",
//     gps_lat: "",
//     gps_lng: "",
//   });

//   useEffect(() => {
//     if (id) {
//       // Editing case → load sample (mock for now)
//       setFormData({
//         site_id: existingSample.site_id,
//         sample_type: existingSample.sample_type,
//         status: existingSample.status,
//         collected_by: existingSample.collected_by,
//         date_collected: existingSample.date_collected,
//         lead_level: existingSample.lead_level,
//         notes: existingSample.notes,
//         gps_lat: existingSample.gps.lat,
//         gps_lng: existingSample.gps.lng,
//       });
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (id) {
//       console.log("Updating sample:", formData);
//     } else {
//       console.log("Creating new sample:", formData);
//     }

//     // Redirect back to samples list
//     navigate("/samples");
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">
//         {id ? "Edit Sample" : "Add New Sample"}
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow rounded-lg p-6 space-y-4"
//       >
//         <div>
//           <label className="block text-gray-700">Site ID</label>
//           <input
//             type="text"
//             name="site_id"
//             value={formData.site_id}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">Sample Type</label>
//           <select
//             name="sample_type"
//             value={formData.sample_type}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option value="Soil">Soil</option>
//             <option value="Water">Water</option>
//             <option value="Paint">Paint</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option value="pending">Pending</option>
//             <option value="analyzed">Analyzed</option>
//             <option value="reviewed">Reviewed</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700">Date Collected</label>
//           <input
//             type="date"
//             name="date_collected"
//             value={formData.date_collected}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">Lead Level (ppm)</label>
//           <input
//             type="text"
//             name="lead_level"
//             value={formData.lead_level}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//             placeholder="e.g. 45 ppm"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">Notes</label>
//           <textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//             rows="3"
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700">GPS Latitude</label>
//             <input
//               type="text"
//               name="gps_lat"
//               value={formData.gps_lat}
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">GPS Longitude</label>
//             <input
//               type="text"
//               name="gps_lng"
//               value={formData.gps_lng}
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {id ? "Update Sample" : "Create Sample"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SampleForm() {
  const { id } = useParams(); // if editing, id will exist
  const navigate = useNavigate();

  // Mock data if editing
  const existingSample = {
    id: 1,
    site_id: "Site A",
    sample_type: "Soil",
    status: "pending",
    collected_by: "Yusuf",
    date_collected: "2025-08-15",
    lead_level: "45 ppm",
    notes: "Collected near school compound",
    gps: { lat: "8.4956", lng: "4.5503" },
  };

  const [formData, setFormData] = useState({
    site_id: "",
    sample_type: "Soil",
    status: "pending",
    collected_by: "Current User",
    date_collected: "",
    lead_level: "",
    notes: "",
    gps_lat: "",
    gps_lng: "",
  });

  useEffect(() => {
    if (id) {
      setFormData({
        site_id: existingSample.site_id,
        sample_type: existingSample.sample_type,
        status: existingSample.status,
        collected_by: existingSample.collected_by,
        date_collected: existingSample.date_collected,
        lead_level: existingSample.lead_level,
        notes: existingSample.notes,
        gps_lat: existingSample.gps.lat,
        gps_lng: existingSample.gps.lng,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log("Updating sample:", formData);
    } else {
      console.log("Creating new sample:", formData);
    }
    navigate("/samples");
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="sticky top-0 z-10 bg-gray-50 py-2">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        {id ? "Edit Sample" : "Add New Sample"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-4 sm:p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site ID
          </label>
          <input
            type="text"
            name="site_id"
            value={formData.site_id}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm sm:text-base"
            placeholder="Enter site ID"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sample Type
          </label>
          <select
            name="sample_type"
            value={formData.sample_type}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm sm:text-base"
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
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm sm:text-base"
          >
            <option value="pending">Pending</option>
            <option value="analyzed">Analyzed</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Collected
          </label>
          <input
            type="date"
            name="date_collected"
            value={formData.date_collected}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Level (ppm)
          </label>
          <input
            type="text"
            name="lead_level"
            value={formData.lead_level}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm sm:text-base"
            placeholder="e.g. 45 ppm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm sm:text-base"
            rows="3"
            placeholder="Extra details about the sample..."
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
              value={formData.gps_lat}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm sm:text-base"
              placeholder="e.g. 8.4956"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Longitude
            </label>
            <input
              type="text"
              name="gps_lng"
              value={formData.gps_lng}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm sm:text-base"
              placeholder="e.g. 4.5503"
            />
          </div>
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-white py-3 border-t shadow-md flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            {id ? "Update Sample" : "Create Sample"}
          </button>
        </div>
      </form>
    </div>
  );
}
