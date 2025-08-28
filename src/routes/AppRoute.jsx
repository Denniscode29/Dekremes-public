import { Route, Routes } from "react-router-dom";
import App from "../App";
import About from "../pages/About";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
}

export default AppRoute;