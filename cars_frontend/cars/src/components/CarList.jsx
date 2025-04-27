import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarList.css";

function CarList() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, []);

  const fetchCars = () => {
    fetch("http://localhost:8020/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error(err));
  };

  const fetchBrands = () => {
    fetch("http://localhost:8020/brands")
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este auto?")) {
      fetch(`http://localhost:8020/cars/${id}`, {
        method: "DELETE",
      })
      .then(() => fetchCars())
      .catch(err => console.error(err));
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCars = selectedBrandId
    ? cars.filter(car => car.brandId === selectedBrandId)
    : cars;

  return (
    <div className="carlist-container">
      <h2>Lista de Autos</h2>

      <div className="filter-container">
        <label htmlFor="brand-select">Filtrar por marca: </label>
        <select
          id="brand-select"
          value={selectedBrandId}
          onChange={(e) => setSelectedBrandId(e.target.value)}
        >
          <option value="">Todas las marcas</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <table className="cars-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Kilometraje</th>
            <th>Marca</th>
            <th>Descripción</th>
            <th>Editar / Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map(car => {
            const brand = brands.find(b => b.id === car.brandId);
            const brandName = brand ? brand.name : car.brandId;
            const isExpanded = expandedDescriptions[car.id];
            
            return (
              <tr key={car.id}>
                <td>{car.model}</td>
                <td>${car.price.toLocaleString()}</td>
                <td>{car.mileage.toLocaleString()} km</td>
                <td>{brandName}</td>
                <td className="description-cell">
                  {car.description && (
                    <>
                      <div 
                        className={`description-text ${isExpanded ? 'expanded' : ''}`}
                        onClick={() => toggleDescription(car.id)}
                      >
                        {isExpanded ? car.description : `${car.description.substring(0, 50)}${car.description.length > 50 ? '...' : ''}`}
                      </div>
                      {car.description.length > 50 && (
                        <button 
                          className="toggle-description-btn"
                          onClick={() => toggleDescription(car.id)}
                        >
                          {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/edit-car/${car.id}`)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(car.id)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate("/")}>
        Volver al Inicio
      </button>
    </div>
  );
}

export default CarList;