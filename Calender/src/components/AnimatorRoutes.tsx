import React from 'react'
import { Routes, Route,useLocation } from "react-router-dom";
import CalenderPage from '../pages/CalenderPage';
import WeeklyPage from '../pages/WeeklyPage';

import {AnimatePresence} from 'framer-motion';
const AnimatorRoutes = () => {
    const location = useLocation();
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
    <Route path="/" element={<CalenderPage />} />
    <Route path="/Weekly" element={<WeeklyPage />}/>
    <Route path="/Contact" />
  </Routes>
  </AnimatePresence>
  )
}

export default AnimatorRoutes