import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all products
const handlerGet: NextApiHandler = async(req, res) => {
    const productstype = await api.getAllProductsType();
    res.json({ status: true, productstype });
}

// Inserting new product
const handlerPost: NextApiHandler = async (req, res) => {
    const { title } = req.body;

    const newProductType = await api.addProductType(title).catch(() => {
        res.json({ error: 'O tipo de produto já existe!' })
    });

    if(newProductType) {
        res.status(201).json({ status: true, product: newProductType })
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