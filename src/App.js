// import { Link } from "react-router-dom";
// import style from "./App.module.css";
// import style from "./global/styles.css";
import { ApplicationDataContextProvider } from "./contexts/ApplicationDataContext";
import { Router } from "./routes/Routes";

function App() {
  return (
    <ApplicationDataContextProvider>
      <Router />
    </ApplicationDataContextProvider>
  );
}

export default App;
