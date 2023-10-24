import { Routes, Route,useLocation } from "react-router-dom";

import CalenderPage from "./pages/CalenderPage";
import Navbar from "./Navbar";
import WeeklyPage from "./pages/WeeklyPage";
import PariclesBg from "./components/PariclesBg";
import AnimatorRoutes from "./components/AnimatorRoutes";
import { useState, useEffect,useRef } from "react";
const App = () => {
  return (
    <>
      <PariclesBg />
      <Navbar />
      <AnimatorRoutes />
    </>
  );
};

export default App;
