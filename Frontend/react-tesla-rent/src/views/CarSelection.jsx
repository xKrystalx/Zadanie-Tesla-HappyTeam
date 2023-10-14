import Cars from "../assets/cars/cars.json";
import { useState } from "react";

export function CarSelection({ handleNext }) {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="CarSelection h-full py-24 px-8 flex flex-col">
      <div className="flex flex-wrap gap-6 justify-center h-fit">
        {Cars.map(car => {
          let isAvailable = car.available > 0;
          let isSelected =
            car.id === selectedCar?.id
              ? "bg-gray-200 border-2 border-red-600"
              : "";
          return (
            <div
              key={car.id}
              className={`w-56 h-fit border-2 shadow-lg rounded-lg p-4 flex flex-col ${isSelected}`}
            >
              <img src={`/images/${car.id}.png`} className="" />
              <div className="flex flex-col gap-y-2 justify-start w-full mt-2">
                <p className="">
                  <span className="font-semibold text-lg "> {car.name}</span>
                </p>
                <p className="flex flex-col text-sm text-gray-600">
                  Range:
                  <span className="font-semibold text-md text-black">
                    {" "}
                    {car.details.range} km
                  </span>
                </p>
              </div>
              <hr className="mb-2 w-full border-gray-300 mt-8 shadow-lg" />
              <div className="flex items-center gap-x-4 w-full">
                <p className="flex flex-col text-gray-600">
                  Price:
                  <span className="font-semibold text-xl text-black">
                    {" "}
                    ${car.price}/day
                  </span>
                </p>
                <button
                  onClick={() => {
                    setSelectedCar(car);
                  }}
                  className="custom-button-red px-3 py-2 text-sm mr-0 ml-auto"
                >
                  Select
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => handleNext(selectedCar)}
        className="custom-button-red w-fit mt-16 self-end mr-8 px-8"
      >
        Next
      </button>
    </div>
  );
}
