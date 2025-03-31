// simular una base de datos para los usuarios
const users = [];

// Crear un usuario
const createUser = (user) => {
    users.push(user);
};

const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};

module.exports = {createUser, findUserByEmail, users };

//TODO: a futuro este modelo se conectara con MongoDB