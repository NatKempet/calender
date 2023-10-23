import { Routes, Route } from "react-router-dom";

import CalenderPage from "./pages/CalenderPage";
import Navbar from "./Navbar";
import WeeklyPage from "./pages/WeeklyPage";
import PariclesBg from "./components/PariclesBg";
const App = () => {
  return (
    <>
      <PariclesBg />
      <Navbar />
      <Routes>
        <Route path="/" element={<CalenderPage />} />
        <Route path="/Weekly" element={<WeeklyPage />}/>
        <Route path="/Contact" />
      </Routes>
    </>
  );
};

export default App;
