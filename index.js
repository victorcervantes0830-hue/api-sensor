const express = require("express");
const app = express();

app.use(express.json());

// 💾 Aquí guardamos los datos temporalmente en memoria
let datosSensores = [];

// Ruta POST para sensores
app.post("/sensores", (req, res) => {
    console.log("Datos recibidos:", req.body);

    // Guardamos los datos que llegan
    datosSensores.push(req.body);

    res.json({ message: "Datos recibidos correctamente" });
});

// Ruta GET para que Power BI consulte los datos
app.get("/sensores", (req, res) => {
    res.json(datosSensores);
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API de sensores funcionando correctamente 🚀");
});

// Puerto dinámico para Railway/Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API funcionando en http://localhost:${PORT}`);
});
