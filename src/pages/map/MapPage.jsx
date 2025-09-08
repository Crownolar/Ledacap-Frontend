import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapPage() {
  // Mocked sample locations
  const samples = [
    {
      id: 1,
      site_id: "S001",
      type: "Soil",
      coords: [8.4799, 4.5418],
      lead_level: "High",
    },
    {
      id: 2,
      site_id: "S002",
      type: "Water",
      coords: [8.4859, 4.5608],
      lead_level: "Low",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Samples Map</h1>
      <div className="h-[500px] w-full rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[8.48, 4.54]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Base tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />

          {/* Markers */}
          {samples.map((s) => (
            <Marker key={s.id} position={s.coords}>
              <Popup>
                <div>
                  <h3 className="font-bold">{s.site_id}</h3>
                  <p>Type: {s.type}</p>
                  <p>Lead Level: {s.lead_level}</p>
                  <a
                    href={`/samples/${s.id}`}
                    className="text-blue-600 underline mt-2 inline-block"
                  >
                    View Sample
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
