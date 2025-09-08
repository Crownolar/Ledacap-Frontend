import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons (otherwise they won’t show in React)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  // Mock samples with GPS
  const samples = [
    {
      id: 1,
      site_id: "Site A",
      type: "Soil",
      lead_level: "45 ppm",
      status: "pending",
      gps: { lat: 8.4956, lng: 4.5503 },
    },
    {
      id: 2,
      site_id: "Site B",
      type: "Water",
      lead_level: "80 ppm",
      status: "reviewed",
      gps: { lat: 8.5001, lng: 4.5525 },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sample Map</h1>

      <MapContainer
        center={[8.4956, 4.5503]} // default center (Ilorin example)
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {samples.map((sample) => (
          <Marker key={sample.id} position={[sample.gps.lat, sample.gps.lng]}>
            <Popup>
              <div>
                <h2 className="font-semibold">{sample.site_id}</h2>
                <p>Type: {sample.type}</p>
                <p>Lead: {sample.lead_level}</p>
                <p>Status: {sample.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
