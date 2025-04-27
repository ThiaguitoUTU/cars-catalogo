import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandForm.css";

export default function BrandForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8020/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Marca agregada exitosamente");
        setFormData({ id: "", name: "" });
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (err) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="brandform-container">
      <h2>Agregar Marca</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            maxLength={20}
            value={formData.name}
            onChange={handleChange}
            required
          />
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