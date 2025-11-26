const express = require("express");
const app = express();

app.use(express.json());

app.post("/sensores", (req, res) => {
    console.log("Datos recibidos:", req.body);
    res.json({ message: "Datos recibidos correctamente" });
});

app.get("/", (req, res) => {
    res.send("API de sensores funcionando correctamente");
});

app.listen(3000, () => {
    console.log("API funcionando en http://localhost:3000");
});
