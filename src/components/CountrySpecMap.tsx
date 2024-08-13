import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Make sure to import your custom icon if you are using a local asset or a library
import customIconUrl from "../images/marker.png"; // Example path

// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Popup anchor
});
type Props = {};

const CountrySpecMap = (props: Props) => {
  const { data: countryData } = useQuery({
    queryKey: ["countryData"],
    queryFn: () =>
      axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.data),
  });

  // Handle loading and error states

  return (
    <div>
      <div>
        <MapContainer
          className="h-screen"
          center={[18.6436724,84.7145372]}
          zoom={5}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countryData &&
            countryData.map((country: any) => (
              <Marker
                key={country.country}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{country.country}</strong>
                  <br />
                  Active: {country.active}
                  <br />
                  Recovered: {country.recovered}
                  <br />
                  Deaths: {country.deaths}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CountrySpecMap;
