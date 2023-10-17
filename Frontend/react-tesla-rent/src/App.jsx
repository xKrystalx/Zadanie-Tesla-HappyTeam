import { Home } from "./views/Home";
import { Location } from "./views/Location";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Madrid");

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
      <Location />
    </LocalizationProvider>
  );
}

export default App;
