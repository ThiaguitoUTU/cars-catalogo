// src/App.jsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import BrandForm from "./components/BrandForm";
import CarForm from "./components/CarForm";
import CarList from "./components/CarList";
import EditCar from "./components/EditCar"; // <--- LO AGREGAMOS AQUÍ

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Gestión de Carros</h1>
      <div className="buttons-container">
        <button onClick={() => navigate("/add-car")}>Agregar Carro</button>
        <button onClick={() => navigate("/list-cars")}>Listar Carros</button>
        <button onClick={() => navigate("/add-brand")}>Agregar Marca</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-car" element={<CarForm />} />
        <Route path="/list-cars" element={<CarList />} />
        <Route path="/add-brand" element={<BrandForm />} />
        <Route path="/edit-car/:id" element={<EditCar />} /> {/* Editar auto */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
