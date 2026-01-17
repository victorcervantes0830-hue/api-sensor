const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// Variables de entorno (Render)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Variables de entorno no definidas");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Ruta POST sensores
app.post("/sensores", async (req, res) => {
  try {
    const { ph, turbidez, tds, temperatura } = req.body;

    if (ph == null || turbidez == null || tds == null || temperatura == null) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const fecha = new Date();
    const dia = fecha.getDate();
    const anio = fecha.getFullYear();
    const mes = fecha.toLocaleString("es-ES", { month: "long" });

    const { error } = await supabase
      .from("sensores")
      .insert([{ ph, turbidez, tds, temperatura, dia, mes, anio }]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en Supabase" });
    }

    res.json({ message: "Datos guardados correctamente 🌱" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
});

// Ruta prueba
app.get("/", (req, res) => {
  res.send("API NAVECO funcionando correctamente 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});

