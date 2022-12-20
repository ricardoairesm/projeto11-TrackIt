import Login from "./Pages/login";
import "./Assets/CSS/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Pages/cadastro";
import Habitos from "./Pages/habitos";
import Context from "./Pages/Context";
import Hoje from "./Pages/hoje";
import { useState } from "react";


function App() {
  const [info, setInfo] = useState({
    token: "",
    image: ""
  });
  return (
    <>
      <Context.Provider value={[info, setInfo]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/hoje" element={<Hoje></Hoje>} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>

    </>
  );
}

export default App;
