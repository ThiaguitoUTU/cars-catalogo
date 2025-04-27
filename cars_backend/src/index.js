const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./database");

const app = express();

app.use(express.json()); 
app.set("port", 8020);
app.use(cors());
app.use(morgan("dev"));

// Endpoint para obtener todos los autos
app.get("/cars", async (req, res) => {
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * FROM cars");
  res.json(result);
});

// Endpoint para obtener todas las marcas
app.get("/brands", async (req, res) => {
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * FROM brands");
  res.json(result);
});

// Endpoint para crear un nuevo auto
app.post("/cars", async (req, res) => {
  const { model, description, price, mileage, brandId } = req.body;

  if (!model || !price || !mileage || !brandId) {
    return res.status(400).json({ error: "Faltan campos requeridos." });
  }

  try {
    const connection = await database.getConnection();
    const query = `
      INSERT INTO cars (model, description, price, mileage, brandId)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [model, description, price, mileage, brandId];

    await connection.query(query, values);
    res.status(201).json({ message: "Auto agregado exitosamente." });
  } catch (err) {
    console.error("Error al insertar en la base de datos:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.post("/brands", async (req, res) => {
    const { id, name } = req.body;
  
    if (!id || !name) {
      return res.status(400).json({ error: "ID y nombre son requeridos." });
    }
  
    try {
      const connection = await database.getConnection();
      const query = `INSERT INTO brands (id, name) VALUES (?, ?)`;
      await connection.query(query, [id, name]);
      res.status(201).json({ message: "Marca agregada exitosamente." });
    } catch (err) {
      console.error("Error al insertar marca:", err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });
  

// Endpoint para eliminar un auto
app.delete("/cars/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const connection = await database.getConnection();
      const query = `DELETE FROM cars WHERE id = ?`;
      const result = await connection.query(query, [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Auto no encontrado." });
      }
  
      res.json({ message: "Auto eliminado exitosamente." });
    } catch (err) {
      console.error("Error al eliminar auto:", err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });
  
  // Endpoint para actualizar un auto
  app.put("/cars/:id", async (req, res) => {
    const { id } = req.params;
    const { model, description, price, mileage, brandId } = req.body;
  
    if (!model || !price || !mileage || !brandId) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }
  
    try {
      const connection = await database.getConnection();
      const query = `
        UPDATE cars
        SET model = ?, description = ?, price = ?, mileage = ?, brandId = ?
        WHERE id = ?
      `;
      const values = [model, description, price, mileage, brandId, id];
  
      const result = await connection.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Auto no encontrado." });
      }
  
      res.json({ message: "Auto actualizado exitosamente." });
    } catch (err) {
      console.error("Error al actualizar auto:", err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  });
  

app.listen(app.get("port"));
console.log("Escuchando comunicaciones al puerto " + app.get("port"));