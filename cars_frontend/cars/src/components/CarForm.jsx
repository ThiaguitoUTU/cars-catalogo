import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarForm.css";

export default function CarForm() {
  const [formData, setFormData] = useState({
    model: "",
    description: "",
    price: "",
    mileage: "",
    brandId: ""
  });

  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Cargar las marcas al montar el componente
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:8020/brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8020/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Auto agregado exitosamente");
        setFormData({
          model: "",
          description: "",
          price: "",
          mileage: "",
          brandId: ""
        });
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="carform-container">
      <h2>Agregar Auto</h2>
      <form onSubmit={handleSubmit}>
        {["model", "description", "price", "mileage"].map((field) => (
          <div key={field}>
            <label>{field}:</label>
            <input
              type={field === "price" || field === "mileage" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={["model", "price", "mileage"].includes(field)}
            />
          </div>
        ))}
        
        <div>
          <label>Marca:</label>
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name} ID:{brand.id}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="submit-button">Guardar</button>
      </form>

      {message && (
        <p className={`message ${message.includes("exitosamente") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      <button className="back-button" onClick={() => navigate("/")}>
        Volver al Inicio
      </button>
    </div>
  );
}