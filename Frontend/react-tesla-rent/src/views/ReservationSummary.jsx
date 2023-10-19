import dayjs from "dayjs";
import { useEffect, useState } from "react";
import loadingSVG from "../assets/images/icons/loading.svg";
import { ApiEndpoints } from "../helpers/ApiEndpoints";

export function ReservationSummary({ reservationDetails }) {
  //sending, error, success
  const [reservationState, setReservationState] = useState("");

  //Preload the loading SVG
  useEffect(() => {
    const loadingImg = new Image();
    loadingImg.src = loadingSVG;
  }, []);

  function handlePlaceReservation() {
    const placeReservation = async () => {
      return await fetch(ApiEndpoints.apiReservationsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //API data
        body: JSON.stringify({
          firstName: reservationDetails.firstName,
          lastName: reservationDetails.lastName,
          email: reservationDetails.email,
          phoneNumber: reservationDetails.phone,
          pickupDate: reservationDetails.pickupDate,
          returnDate: reservationDetails.returnDate,
          carId: reservationDetails.carId,
          locationId: reservationDetails.location.id,
        }),
      });
    };

    setTimeout(() => {
      placeReservation()
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          setReservationState("success");
        })
        .catch(error => {
          console.log(error);
          setReservationState("error");
        });
    }, 2000);
  }

  let buttonState = getButtonState();

  function getButtonState() {
    switch (reservationState) {
      case "sending": {
        return <img src={loadingSVG} className="h-full w-[48px]" />;
      }
      case "success": {
        return <p>Success</p>;
      }
      default: {
        return <p>Place Reservation</p>;
      }
    }
  }

  return (
    <div className="ReservationSummary w-full h-full flex justify-center items-center">
      <div
        id="reservation_summary"
        className="flex flex-col gap-y-6 w-full px-24"
      >
        <p className="text-center font-semibold text-4xl mb-8">
          Reservation Summary
        </p>
        <p className="flex flex-col">
          <span className="font-semibold text-sm">Car</span>
          {reservationDetails.carName}
        </p>
        <p className="flex flex-col">
          <span className="font-semibold text-sm">Location</span>
          {reservationDetails.location.name}
        </p>
        <div className="flex gap-x-8">
          <p className="flex flex-col">
            <span className="font-semibold text-sm">Pickup Date</span>
            {dayjs(reservationDetails.pickupDate).format("DD/MM/YYYY")}
          </p>
          <p className="flex flex-col">
            <span className="font-semibold text-sm">Return Date</span>
            {dayjs(reservationDetails.returnDate).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex gap-x-8">
          <p className="flex flex-col">
            <span className="font-semibold text-sm">First Name</span>
            {reservationDetails.firstName}
          </p>
          <p className="flex flex-col">
            <span className="font-semibold text-sm">Last Name</span>
            {reservationDetails.lastName}
          </p>
        </div>
        <p className="flex flex-col">
          <span className="font-semibold text-sm">E-mail</span>
          {reservationDetails.email}
        </p>
        <p className="flex flex-col">
          <span className="font-semibold text-sm">Phone</span>
          {reservationDetails.phone}
        </p>
        <hr />
        <div className="flex">
          <p className="flex flex-col text-2xl">
            <span className="font-semibold">Total:</span>$
            {reservationDetails.total}
          </p>
          <div className="flex flex-col ml-auto relative items-center">
            <button
              onClick={() => {
                setReservationState("sending");
                handlePlaceReservation();
              }}
              disabled={
                reservationState == "sending" || reservationState == "success"
              }
              className={`custom-button-red h-full px-12 py-0 ${
                reservationState == "sending" || reservationState == "success"
                  ? "bg-red-400"
                  : ""
              }`}
            >
              {buttonState ?? null}
            </button>
            {reservationState == "error" && (
              <p className="text-red-400 text-xs absolute -bottom-8">
                Please try again or refresh
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
