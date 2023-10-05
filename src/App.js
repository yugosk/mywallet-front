import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetCSS from "./styles/ResetCss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ResetCSS />
    </BrowserRouter>
  );
}

export default App;
