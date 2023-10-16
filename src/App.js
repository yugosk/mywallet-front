import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetCSS from "./styles/ResetCss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.css";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import EditContext from "./contexts/EditContext";
import Home from "./components/Home/Home";
import InRecords from "./components/AddRecords/InRecords";
import OutRecords from "./components/AddRecords/OutRecords";
import EditRecords from "./components/EditRecords/EditRecords";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [editInfo, setEditInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <EditContext.Provider value={{ editInfo, setEditInfo }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addin" element={<InRecords />} />
            <Route path="/addout" element={<OutRecords />} />
            <Route path="/edit" element={<EditRecords />} />
          </Routes>
          <ResetCSS />
        </BrowserRouter>
      </EditContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
