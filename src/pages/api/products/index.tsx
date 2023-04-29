import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all products
const handlerGet: NextApiHandler = async(req, res) => {
    const products = await api.getAllProducts();
    res.json({ status: true, products });
}

// Inserting new product
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, image, text, type, price, store, title, userId } = req.body;

    const newProduct = await api.addProduct(id, image, text, type, price, store, title, userId).catch(() => {
        res.json({ error: 'O produto já existe!' })
    });

    if(newProduct) {
        res.status(201).json({ status: true, product: newProduct })
    }
}

const handler: NextApiHandler = (req, res) => {
    switch(req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'POST':
            handlerPost(req, res);
            break;
    }
}

export default handler;