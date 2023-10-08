import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetCSS from "./styles/ResetCss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.css";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Home from "./components/Home/Home";

function App() {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ResetCSS />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
