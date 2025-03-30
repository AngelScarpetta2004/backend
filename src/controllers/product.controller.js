// Simular una BD de datos temporal
let products = [
    {id:1, name: 'Laptop Gamer', price: 1200},
    {id:2, name: 'Mouse Inalambrico', price: 50}
];

// Obtener todos los productos
const getProducts = (req, res) => {
    res.json(products);
};

// Obtener un producto por ID
const getProductsById = (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p.id == id);

    if(!product){
        return res.status(404).json({message: 'Producto no encontrado'});
    }
    res.json(product);
};

// Crear producto nuevo
const createProduct = (req, res) => {
    const { name, price } = req.body;

    if(!name || !price){ // || es igual al && se tiene o se tiene que cumplir las dos
        return res.status(400).json({message: 'Nombre y precio son requeridos'});
    }
    const newProduct = {
        id: products.length + 1, //el +1 es par que el id se valla sumando
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

module.exports = {
    getProducts,
    getProductsById,
    createProduct
};