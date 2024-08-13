import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14090/14090313.png",
  iconSize: [38, 38]
});

function UserRedflagsmap({ interventions = [], redflags = [] }) {
  const markers = [...interventions, ...redflags]; // Combine interventions and redflags

  return (
    <MapContainer
      center={[1.2921, 36.8219]} // Center at a general location
      zoom={2}
      style={{ height: "100vh", width: "100%" }} // Ensure the map has a height
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.length === 0 && (
        <p>No data available for the map.</p>
      )}
      {markers.map((item, index) => {
        if (!item.geolocation) return null;
        const [latitude, longitude] = item.geolocation
          .split(",")
          .map((coord) => parseFloat(coord.trim()));

        if (isNaN(latitude) || isNaN(longitude)) return null;

        return (
          <Marker
            key={index}
            position={[latitude, longitude]}
            icon={customIcon}
          >
            <Popup>
              <h3>{item.intervention ? item.intervention : item.redflag}</h3>
              <p>Description:{item.description}</p>
              <p>Status: {item.status}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default UserRedflagsmap;

