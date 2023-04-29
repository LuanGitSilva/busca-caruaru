import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all tourism
const handlerGet: NextApiHandler = async(req, res) => {
    const tourism = await api.getAllTourism();
    res.json({ status: true, tourism });
}

// Inserting new tourism
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, title, text, image, date, local, responsible, maps } = req.body;

    const newTourism = await api.addTourism(id, title, text, image, date, local, responsible, maps).catch(() => {
        res.json({ error: 'Local de turismo já existe!' })
    });

    if(newTourism) {
        res.status(201).json({ status: true, tourism: newTourism })
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