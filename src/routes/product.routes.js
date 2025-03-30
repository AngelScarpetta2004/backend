const express = require('express');
const router = express.Router();
const {getProducts, getProductsById, createProduct} = require("../controllers/product.controller");

const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");



//Definir las rutas
router.get("/", getProducts);

router.get(
    "/:id", 
    [check("id", "EL ID debe ser un numero valido").isNumeric()],
    validateFields, 
    getProductsById
);

router.post("/",
    [
        check("name", "el nombre es obligatorio").not().isEmpty(),
        check("price", "el precio es obligatorio").isFloat({gt:0}),
        // gt -> Greater than esto especifica que el numero debe ser positivo mayor a cero
        validateFields
    ],
    createProduct
);

module.exports = router;


