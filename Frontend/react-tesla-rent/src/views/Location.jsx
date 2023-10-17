import MallorcaMap from "../assets/images/mallorca.svg";
import RentLocations from "../assets/locations/locations.json";
import { Marker } from "../components/Marker";
import { useEffect, useState, useContext } from "react";
import { ReservationView } from "./ReservationView";
import { ApiEndpoints } from "../helpers/ApiEndpoints";

export function Location() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locations, setLocations] = useState(null);

  //Load locations
  useEffect(() => {
    const fetchLocations = async () => {
      console.log(ApiEndpoints.apiLocationsUrl);
      return await fetch(ApiEndpoints.apiLocationsUrl);
    };

    fetchLocations()
      .then(response => {
        return response.json();
      })
      .then(data => setLocations(data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="Location" id="Location">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="relative w-fit h-fit">
            <img src={MallorcaMap} className="opacity-[0.35] w-[100vmin]" />
            {locations &&
              locations.map(loc => {
                let markerData = RentLocations.find(i => i.id == loc.id);
                if (!markerData) return;
                return (
                  <Marker
                    id={loc.id}
                    name={loc.name}
                    position={markerData.position}
                    key={loc.id}
                    selectCallback={() => {
                      setCurrentLocation(loc);
                    }}
                  />
                );
              })}
          </div>
        </div>
        {currentLocation && (
          <ReservationView
            location={currentLocation}
            setLocation={setCurrentLocation}
          />
        )}
      </div>
    </>
  );
}
