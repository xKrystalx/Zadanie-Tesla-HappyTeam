import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";

export function ReservationView({ location, setLocation }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bg-white w-[60%] h-screen overflow-scroll drop-shadow-lg">
      <button
        className="absolute top-4 left-4 px-3 py-2"
        onClick={() => setLocation(null)}
      >
        Back
      </button>
      <p>Select your reservation period</p>
      <div className="mx-[160px] my-[160px]">
        <DatePicker label="Pickup day" />
        <DatePicker label="Return day" />
      </div>
    </div>
  );
}
