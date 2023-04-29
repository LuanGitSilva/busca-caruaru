import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all services
const handlerGet: NextApiHandler = async(req, res) => {
    const services = await api.getAllServices();
    res.json({ status: true, services });
}

// Inserting new service
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, image, text, type, price, store, title, userId } = req.body;

    const newService = await api.addService(id, image, text, type, price, store, title, userId).catch(() => {
        res.json({ error: 'O serviço já existe!' })
    });

    if(newService) {
        res.status(201).json({ status: true, product: newService })
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