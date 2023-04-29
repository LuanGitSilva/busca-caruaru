import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all public services
const handlerGet: NextApiHandler = async(req, res) => {
    const publicservicestype = await api.getAllPublicServicesType();
    res.json({ status: true, publicservicestype });
}

// Inserting new public service
const handlerPost: NextApiHandler = async (req, res) => {
    const { title } = req.body;

    const newPublicServiceType = await api.addPublicServiceType(title).catch(() => {
        res.json({ error: 'O tipo de serviço público já existe!' })
    });

    if(newPublicServiceType) {
        res.status(201).json({ status: true, product: newPublicServiceType })
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