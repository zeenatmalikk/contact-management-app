import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// custom icon for marker
import customIconUrl from "../images/marker.png"; // Example path

// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Popup anchor
});


const CountrySpecMap = () => {
  //fetch data from api of covid cases across all countries
  const { data: countryData } = useQuery({
    queryKey: ["countryData"],
    queryFn: () =>
      axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.data),
  });


  return (
    <div className="h-full w-full">
      <MapContainer
        className="h-full w-full rounded-lg"
        center={[18.6436724, 84.7145372]}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* /map the data over the marker to show the marker over all countries which had covid cases */}
        {countryData &&
          countryData.map((country: any) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon}
            >
              {/* click on the marker icon on map to show the popup */}
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
  );
};

export default CountrySpecMap;
