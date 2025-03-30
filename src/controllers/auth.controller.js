const bcrypt = require("bcryptjs"); // esto es para encriptrar la contraseñ
const jwt = require("jsonwebtoken"); // esto es para generar el token
const { createUser, findUserByEmail } = require("../models/user.model");

//Registrar un usuario
const register = async (req, res) => {
    //name-email-password
    const {name, email, password} = req.body;

    // Verificar si el usuario ya existe
    if(!name || !email || !password){
        return res.status(400).json({ mesaage: "Todos los campos son requeridos"});
    }


    // Verificar si el email ya existe
    if(findUserByEmail(email)){
        return res.status(400).json({ message: "Man pa bruto"});
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    }

    // Guardar el usuario en la base de Datos
    createUser(newUser);

    // Responder al cliente
    res.status(201).json({message: "Estas en la base de datos usuario nuevo"});
};

// Iniciar sesion
const login = async (req, res) => {
    const {email, password} =  req.body; //sacer los datos del body
    const user =  findUserByEmail(email); // buscar usuario por emial

    //Verificar que el usuario existe
    if(!user){
        return res.status(400).json({message: "Usuario no existe"});
    }

    // Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "la contraseña esta mal"})
    }

    //Generar el token
    const token = jwt.sign({
        id: user.id,
        name: user.name
    },process.env.JWT_SECRET, { expiresIn: "1h"});
    res.json({ token });// en caso de algun erroe resolverlo
};

// Exportar los metodos
module.exports = {register, login};

