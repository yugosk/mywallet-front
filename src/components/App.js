import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import GlobalStyled from "./GlobalStyled";
import SignUp from "./SignUp";
import Login from "./Login";
import UserContext from "../contexts.js/UserContext";

export default function App() {
  const [token, setToken] = useState({});
  return (
    <UserContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <GlobalStyled />
      </BrowserRouter>
    </UserContext.Provider>
  );
}
