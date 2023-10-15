import moment from "moment";
import { useState } from "react";

export function ReservationSummary({ reservationDetails }) {
  //sending, error, success
  const [reservationState, setReservationState] = useState(null);

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
            {moment(reservationDetails.pickupDate).format("L")}
          </p>
          <p className="flex flex-col">
            <span className="font-semibold text-sm">Return Date</span>
            {moment(reservationDetails.returnDate).format("L")}
          </p>
        </div>
        <div className="flex gap-x-8">
          <p className="flex flex-col">
            <span className="font-semibold text-sm">First Name</span>
            {reservationDetails.clientDetails.firstName}
          </p>
          <p className="flex flex-col">
            <span className="font-semibold text-sm">Last Name</span>
            {reservationDetails.clientDetails.lastName}
          </p>
        </div>
        <p className="flex flex-col">
          <span className="font-semibold text-sm">E-mail</span>
          {reservationDetails.clientDetails.email}
        </p>
        <p className="flex flex-col">
          <span className="font-semibold text-sm">Phone</span>
          {reservationDetails.clientDetails.phone}
        </p>
        <hr />
        <div className="flex">
          <p className="flex flex-col text-2xl">
            <span className="font-semibold">Total:</span>$
            {reservationDetails.total}
          </p>
          <button
            onClick={() => {
              /*TODO Send reservation details to DB*/
            }}
            className="custom-button-red ml-auto"
          >
            Place reservation
          </button>
        </div>
      </div>
    </div>
  );
}
