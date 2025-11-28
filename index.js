const express = require("express");
const app = express();

app.use(express.json());

// Ruta POST para sensores
app.post("/sensores", (req, res) => {
    console.log("Datos recibidos:", req.body);
    res.json({ message: "Datos recibidos correctamente" });
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API de sensores funcionando correctamente 🚀");
});

// Puerto dinámico para Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API funcionando en http://localhost:${PORT}`);
});
