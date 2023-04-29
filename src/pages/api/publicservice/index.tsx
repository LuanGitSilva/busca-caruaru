import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all ppublic services
const handlerGet: NextApiHandler = async(req, res) => {
    const publicServices = await api.getAllPublicServices();
    res.json({ status: true, publicServices });
}

// Inserting new public service
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, image, text, type, price, store, title, userId } = req.body;

    const newPublicService = await api.addPublicService(id, image, text, type, price, store, title, userId).catch(() => {
        res.json({ error: 'O serviço público já existe!' })
    });

    if(newPublicService) {
        res.status(201).json({ status: true, product: newPublicService })
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