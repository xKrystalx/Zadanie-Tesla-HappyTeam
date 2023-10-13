import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import IconExit from "../assets/images/icons/x-lg.svg";
import { Calendar } from "./Calendar";
import { CarSelection } from "./CarSelection";

export function ReservationView({ location, setLocation }) {
  const [currentView, setCurrentView] = useState("calendar");
  const [reservationDetails, setReservationDetails] = useImmer({
    location: location,
    pickupDate: null,
    returnDate: null,
    carId: null,
    clientDetails: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
    },
    total: 0,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  function handleCalendarStepCompleted(pickupDate, returnDate) {
    console.log("Hiii");
    setReservationDetails(draft => {
      draft.pickupDate = pickupDate;
      draft.returnDate = returnDate;
    });

    setCurrentView("car_select");
  }

  return (
    <div className="fixed top-0 right-0 bg-white w-[60%] h-screen overflow-scroll drop-shadow-lg">
      <button
        className="absolute top-4 left-4 px-3 py-2"
        onClick={() => setLocation(null)}
      >
        <img src={IconExit} className="w-12 h-12" />
      </button>
      {currentView == "calendar" && (
        <Calendar
          location={location}
          handleNext={handleCalendarStepCompleted}
        />
      )}
      {currentView == "car_select" && <CarSelection />}
    </div>
  );
}
