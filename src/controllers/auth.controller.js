const bcrypt = require("bcryptjs"); // Para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Para generar el token
const { createUser, findUserByEmail } = require("../models/user.model");
const { users } = require("../models/user.model"); // Importar el array de usuarios

// Obtener todos los usuarios
const getUsers = (req, res) => {
    res.json(users); // Enviar la lista de usuarios como JSON
};

// Registrar un usuario
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si todos los campos están presentes
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        // Verificar si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const newUser = {
            id: Date.now(), // Si usas una BD real, la ID debería generarse automáticamente
            name,
            email,
            password: hashedPassword,
        };

        // Guardar el usuario en la base de datos
        await createUser(newUser);

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Usuario no registrado" });
        }

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
            },
            process.env.JWT_SECRET || "secretKey", // Usa una clave secreta segura
            { expiresIn: "1h" }
        );

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};



module.exports = { register, login, getUsers };