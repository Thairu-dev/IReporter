import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14090/14090313.png",
  iconSize: [38, 38]
});

function Map() {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    // Fetch interventions data from the API
    fetch("https://ireporter-server.onrender.com/interventions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setInterventions(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
      {interventions.length === 0 && (
        <p>No interventions data available. Please check the API response.</p>
      )}
      {interventions.map((intervention, index) => {
        if (!intervention.geolocation) return null;
        const [latitude, longitude] = intervention.geolocation
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
              <h3>Title:{intervention.intervention}</h3>
              <p>Description:{intervention.description}</p>
              <p>Status: {intervention.status}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
