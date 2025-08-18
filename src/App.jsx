// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import CGPA from "./components/CGPA/CGPA.jsx";
import Layout from "./layout.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";

export default function App() {
  return (
    
      <Routes>
        <Route path="/"  element={<Layout />}>
          <Route path="attendance" element={<Attendance />} /> {/* Default page */}
          
          <Route path="cgpa" element={<CGPA />} />
        </Route>
      </Routes>
    
  );
}
