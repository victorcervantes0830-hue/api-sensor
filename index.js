const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// 🔐 Credenciales desde variables de entorno (OBLIGATORIO en Render)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔹 Ruta principal (prueba)
app.get("/", (req, res) => {
  res.send("API NAVECO funcionando correctamente 🌱");
});

// 🔹 Ruta para recibir datos del ESP32 / Postman
app.post("/sensores", async (req, res) => {
  const { ph, turbidez, tds, temperatura } = req.body;

  // 🔍 Validación básica
  if (
    ph === undefined ||
    turbidez === undefined ||
    tds === undefined ||
    temperatura === undefined
  ) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  // 📅 Fecha automática separada
  const fecha = new Date();
  const dia = fecha.getDate();
  const anio = fecha.getFullYear();
  const mes = fecha.toLocaleString("es-ES", { month: "long" });

  // 💾 Insertar en Supabase
  const { error } = await supabase
    .from("sensores")
    .insert([
      {
        ph,
        turbidez,
        tds,
        temperatura,
        dia,
        mes,
        anio
      }
    ]);

  if (error) {
    console.error("Error Supabase:", error);
    return res.status(500).json({ error: "Error guardando datos" });
  }

  res.json({ message: "Datos guardados correctamente 🚀" });
});

// 🚀 Puerto dinámico (Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});


