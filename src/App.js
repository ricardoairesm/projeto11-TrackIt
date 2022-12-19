import Login from "./Pages/login";
import "./Assets/CSS/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Pages/cadastro";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
