import { Routes, Route } from "react-router-dom";

import CalenderPage from "./pages/CalenderPage";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalenderPage />} />
        <Route path="/Weekly" />
        <Route path="/Contact" />
      </Routes>
    </>
  );
};

export default App;
