const express = require("express");
const { check } = require("express-validator");
const { register, login, getUsers } = require("../controllers/auth.controller");
const validateFields = require("../middlewares/validateFields");

const router = express.Router(); // 🔹 Aquí lo definimos antes de usarlo

// Ruta para obtener todos los usuarios
router.get("/users", getUsers);

// Rutas de autenticación
router.post(
    "/register",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email no es válido").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
        validateFields // Middleware para validar los campos
    ],
    register
);

router.post(
    "/login",
    [
        check("email", "El email no es válido").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        validateFields
    ],
    login
);

module.exports = router;
