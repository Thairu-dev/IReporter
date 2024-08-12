import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14090/14090313.png",
  iconSize: [38, 38]
});

function Redflagsmap({ interventions, redflags }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Clear existing markers and set new markers based on the props
    const records = interventions.length > 0 ? interventions : redflags;
    const newMarkers = records
      .filter(record => record.geolocation)
      .map((record, index) => {
        const [latitude, longitude] = record.geolocation
          .split(",")
          .map(coord => parseFloat(coord.trim()));

        if (isNaN(latitude) || isNaN(longitude)) return null;

        return (
          <Marker key={index} position={[latitude, longitude]} icon={customIcon}>
            <Popup>
              <h3>Title: {record.intervention || record.redflag}</h3>
              <p>Description: {record.description}</p>
              <p>Status: {record.status}</p>
            </Popup>
          </Marker>
        );
      });

    setMarkers(newMarkers);
  }, [interventions, redflags]); // Trigger re-render when either interventions or redflags change

  return (
    <MapContainer
      center={[1.2921, 36.8219]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }} // Ensure the map has a height
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

export default Redflagsmap;
