require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rutas de productos
app.use("/products", productRoutes);

// Ruta de autenticación
app.use("/auth", authRoutes);


// Ruta principal
app.get("/", (req, res) => {
    res.send("API Ecommerce funcionando 🚀");
});

// Servidor en el puerto definido en .env o 5000 por defecto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
