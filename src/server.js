require("dotenv").config(); // el simulador de vm, manejar las variables de entorno
const express = require("express");  //framework para trabajar routes
const cors = require("cors");
const morgan = require("morgan"); //solicitudes del server

const authRoutes = require("./routes/auth.routes");

// Importar los productos routes
const productRoutes = require("./routes/product.routes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); //trabaja en el entorno de desarrollo aca

//rutas de productos
app.use("/products", productRoutes);

// Rutas - Routes
app.get("/", (req, res) => { //puntero es para que lance o lance algo
    res.send("API Ecommerce funcionando 🚀");
});

// Ruta de la autenticacion
app.use("/auth", authRoutes);

// Apuntar al puerto
const PORT = process.env.PORT || 5000; //hace el proceso de buscar la variable port del .env
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Comillas invertida alt+96
});

