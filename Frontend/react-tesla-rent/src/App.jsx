import { Home } from "./views/Home";
import { Location } from "./views/Location";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment-timezone";

function App() {
  moment.tz.setDefault("Europe/Spain");

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
      <Home />
      <Location />
    </LocalizationProvider>
  );
}

export default App;
