import { Routes, Route } from "react-router-dom";

import CalenderPage from "./pages/CalenderPage";

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<CalenderPage/>} />
    </Routes>
  );

};

export default App;
