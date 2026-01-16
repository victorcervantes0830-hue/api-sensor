const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// 🔹 Credenciales Supabase
const SUPABASE_URL = "https://vbaleegzadvmkrsmiijq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiYWxlZWd6YWR2bWtyc21paWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODQwNTUsImV4cCI6MjA4NDE2MDA1NX0.KBIJrYMvLICSTyCQb2x2XpLu2tEamg3CO6OodJ-rz_I";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔹 Ruta para recibir datos del ESP32
app.post("/sensores", async (req, res) => {
  const { ph, turbidez, tds, temperatura } = req.body;

  // Fecha automática separada
  const fecha = new Date();
  const dia = fecha.getDate();
  const anio = fecha.getFullYear();
  const mes = fecha.toLocaleString("es-ES", { month: "long" });

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
    console.error(error);
    return res.status(500).json({ error: "Error guardando datos" });
  }

  res.json({ message: "Datos guardados correctamente 🚀" });
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API NAVECO funcionando correctamente 🌱");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});

