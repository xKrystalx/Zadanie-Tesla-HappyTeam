import MallorcaMap from "../assets/images/mallorca.svg";
import RentLocations from "../assets/locations/locations.json";
import { Marker } from "../components/Marker";
import { useState } from "react";
import { ReservationView } from "./ReservationView";

export function Location() {
  const [currentLocation, setCurrentLocation] = useState(null);

  return (
    <>
      <div className="Location" id="Location">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="relative w-fit h-fit">
            <img src={MallorcaMap} className="opacity-[0.35] w-[100vmin]" />
            {RentLocations.map(loc => (
              <Marker
                id={loc.id}
                name={loc.name}
                position={loc.position}
                key={loc.id}
                selectCallback={() => {
                  setCurrentLocation(loc);
                }}
              />
            ))}
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
