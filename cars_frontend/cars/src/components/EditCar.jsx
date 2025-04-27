import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCar.css";

function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    model: "",
    description: "",
    price: "",
    mileage: "",
    brandId: ""
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8020/cars`)
      .then(res => res.json())
      .then(data => {
        const foundCar = data.find(c => c.id === parseInt(id));
        if (foundCar) {
          setCar(foundCar);
        }
      })
      .catch(err => console.error(err));

    fetch("http://localhost:8020/brands")
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8020/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
    .then(() => navigate("/list-cars"))
    .catch(err => console.error(err));
  };

  return (
    <div className="editcar-container">
      <h2>Editar Auto</h2>
      <form onSubmit={handleSubmit}>
        <label>Modelo:</label>
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
          required
        />

        <label>Descripción:</label>
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
        />

        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={car.price}
          onChange={handleChange}
          required
        />

        <label>Kilometraje:</label>
        <input
          type="number"
          name="mileage"
          value={car.mileage}
          onChange={handleChange}
          required
        />

        <label>Marca:</label>
        <select
          name="brandId"
          value={car.brandId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una marca</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <button type="submit" className="save-button">Guardar cambios</button>
      </form>

      <button className="back-button" onClick={() => navigate("/list-cars")}>
        Volver a la lista
      </button>
    </div>
  );
}

export default EditCar;
