import { Route, Routes } from 'react-router-dom';
import App from "../App";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoute;