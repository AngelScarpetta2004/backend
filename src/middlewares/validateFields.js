const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    // Si hay errores, se retorna un error 400 con los detalles
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next(); // Permitir que la solicitud continúe al siguiente middleware/controlador
};

module.exports = validateFields;
