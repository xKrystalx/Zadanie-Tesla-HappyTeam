import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useImmer } from "use-immer";

export function ReservationDetails({ handleNext }) {
  const [clientDetails, setClientDetails] = useImmer({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  function handleFormChange(e) {
    setClientDetails(draft => {
      draft[e.target.name] = e.target.value;
    });
    for (let detail in clientDetails) {
      if (detail.length < 0) {
        setIsFormValid(false);
        return;
      }
    }
    setIsFormValid(true);
  }

  return (
    <div className="ReservationDetails h-full w-full flex items-center justify-center">
      <div id="details_form" className="flex flex-col w-fit gap-y-3">
        <p className="text-center text-6xl mb-8">Your details</p>
        <div className="flex gap-x-3">
          <TextField
            required
            error={clientDetails.firstName.length <= 0}
            helperText={
              clientDetails.firstName.length <= 0
                ? "Field cannot be empty"
                : null
            }
            name="firstName"
            id="outlined-required"
            label="First Name"
            defaultValue=""
            onChange={handleFormChange}
          />
          <TextField
            required
            error={clientDetails.lastName.length <= 0}
            helperText={
              clientDetails.lastName.length <= 0
                ? "Field cannot be empty"
                : null
            }
            name="lastName"
            id="outlined-required"
            label="Last Name"
            defaultValue=""
            onChange={handleFormChange}
          />
        </div>
        <TextField
          required
          error={clientDetails.email.length <= 0}
          helperText={
            clientDetails.email.length <= 0 ? "Field cannot be empty" : null
          }
          name="email"
          id="outlined-required"
          label="E-mail"
          defaultValue=""
          onChange={handleFormChange}
        />
        <TextField
          required
          error={clientDetails.phone.length <= 0}
          helperText={
            clientDetails.phone.length <= 0 ? "Field cannot be empty" : null
          }
          name="phone"
          id="outlined-required"
          label="Phone"
          defaultValue=""
          onChange={handleFormChange}
        />
        <button
          onClick={() => {
            if (!isFormValid) return;
            handleNext(clientDetails);
          }}
          className="custom-button-red self-end mt-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}
