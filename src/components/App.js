import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import GlobalStyled from "./GlobalStyled";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import AddInflow from "./AddInflow";
import AddOutflow from "./AddOutflow";
import UserContext from "../contexts.js/UserContext";

export default function App() {
  const [token, setToken] = useState({});
  return (
    <UserContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inflow" element={<AddInflow />} />
          <Route path="/outflow" element={<AddOutflow />} />
        </Routes>
        <GlobalStyled />
      </BrowserRouter>
    </UserContext.Provider>
  );
}
