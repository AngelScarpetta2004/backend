//Este middleware se encarga de validar los campos de los request que se envian a la API

const { validationResult} = require("express-validator");

const validateFields = (req, res) => {
    const errors = validationResult(req);

    //si hay errores
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});

    }
    next();
};

module.exports = validateFields;