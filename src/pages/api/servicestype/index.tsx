import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all products
const handlerGet: NextApiHandler = async(req, res) => {
    const productstype = await api.getAllServicesType();
    res.json({ status: true, productstype });
}

// Inserting new product
const handlerPost: NextApiHandler = async (req, res) => {
    const { title } = req.body;

    const newProductType = await api.addServiceType(title).catch(() => {
        res.json({ error: 'O tipo de serviço já existe!' })
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