const express = require("express");
const {check} = require("express-validator");
const {register, login} = require("../controllers/auth.controller");
const validateFields = require("../middlewares/validateFields");
const router = express.Router();


// Rutas de autenticacion
router.post(
    "/register",
    [
        // not().isEmpty es para verificar que no este vacio
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email no es valido").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({min: 6}),
        validateFields
    ],
    register
);

router.post(
    "/login",
    [
        check("email", "El email no es valido").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
    ],
    login
);

module.exports = router;