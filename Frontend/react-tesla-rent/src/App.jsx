import { Home } from "./views/Home";
import { Location } from "./views/Location";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
      <Location />
    </LocalizationProvider>
  );
}

export default App;
