import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export function Calendar({ location, handleNext }) {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  return (
    <div className="Calendar w-full h-full flex justify-center items-center">
      <div className="relative flex flex-col justify-center">
        <p className="mb-4">{location.name}</p>
        <p className="font-semibold text-4xl">Select your reservation period</p>
        <div className="flex gap-x-4 my-20">
          <DatePicker
            disablePast
            maxDate={returnDate}
            label="Pickup day"
            onChange={(date, context) => {
              if (context.validationError) {
                setPickupDate(null);
                return;
              }
              setPickupDate(date);
            }}
          />
          <DatePicker
            disablePast
            minDate={pickupDate}
            label="Return day"
            onChange={(date, context) => {
              if (context.validationError) {
                setReturnDate(null);
                return;
              }
              setReturnDate(date);
            }}
          />
        </div>
        <button
          onClick={() => {
            if (!pickupDate || !returnDate) {
              return;
            }
            handleNext(pickupDate, returnDate);
          }}
          className="custom-button-red absolute right-0 -bottom-16 px-8"
        >
          Next
        </button>
      </div>
    </div>
  );
}
