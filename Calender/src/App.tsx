import { Routes, Route } from "react-router-dom";

import CalenderPage from "./pages/CalenderPage";
import Navbar from "./Navbar";
import WeeklyPage from "./pages/WeeklyPage";

const App = () => {
  return (
    <>
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
