import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import IconExit from "../assets/images/icons/x-lg.svg";
import { Calendar } from "./Calendar";
import { CarSelection } from "./CarSelection";
import { ReservationDetails } from "./ReservationDetails";
import { ReservationSummary } from "./ReservationSummary";
import dayjs from "dayjs";

export function ReservationView({ location, setLocation }) {
  const [currentView, setCurrentView] = useState("calendar");
  const [reservationDetails, setReservationDetails] = useImmer({
    location: location,
    pickupDate: null,
    returnDate: null,
    carId: null,
    carName: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    total: 0,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  function handleCalendarStepCompleted(pickupDate, returnDate) {
    console.log(`Calendar step completed: ${pickupDate} - ${returnDate}`);
    setReservationDetails(draft => {
      draft.pickupDate = dayjs(pickupDate).format("YYYY-MM-DD");
      draft.returnDate = dayjs(returnDate).format("YYYY-MM-DD");
    });

    setCurrentView("car_select");
  }

  function handleCarSelectionStepCompleted(selectedCar) {
    console.log(`Car selecttion step completed: ${selectedCar.name}`);
    //Calculate renting days. If returning same day, count as 1, therefore adding 1 to the difference.
    let duration =
      (dayjs(reservationDetails.returnDate) -
        dayjs(reservationDetails.pickupDate)) /
        (1000 * 3600 * 24) +
      1;
    console.log(`Duration: ${duration}`);
    console.log(
      `Total: $${duration * selectedCar.price} [$${
        selectedCar.price
      } * ${duration} days]`
    );
    setReservationDetails(draft => {
      draft.carId = selectedCar.id;
      draft.carName = selectedCar.name;
      draft.total = duration * selectedCar.price;
    });
    setCurrentView("client_details");
  }

  function handleReservationDetailsStepCompleted(clientDetails) {
    console.log(
      `Reservation details step completed: ${clientDetails.firstName}\n${clientDetails.lastName}\n${clientDetails.email}\n${clientDetails.phone}`
    );
    setReservationDetails(draft => {
      //Copy client details to the reservation object
      for (var prop in clientDetails) {
        draft[prop] = clientDetails[prop];
      }
    });

    setCurrentView("reservation_summary");
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
      {currentView == "car_select" && (
        <CarSelection
          handleNext={handleCarSelectionStepCompleted}
          pickupDate={reservationDetails.pickupDate}
          returnDate={reservationDetails.returnDate}
        />
      )}
      {currentView == "client_details" && (
        <ReservationDetails
          handleNext={handleReservationDetailsStepCompleted}
        />
      )}
      {currentView == "reservation_summary" && (
        <ReservationSummary reservationDetails={reservationDetails} />
      )}
    </div>
  );
}
