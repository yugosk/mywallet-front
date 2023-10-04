import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetCSS from "./styles/ResetCss";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <ResetCSS />
    </BrowserRouter>
  );
}

export default App;
