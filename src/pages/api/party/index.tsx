import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all parties
const handlerGet: NextApiHandler = async(req, res) => {
    const parties = await api.getAllParties();
    res.json({ status: true, parties });
}

// Inserting new news
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, title, text, image, date, local, responsible, maps } = req.body;

    const newParty = await api.addParty(id, title, text, image, date, local, responsible, maps).catch(() => {
        res.json({ error: 'Festa já existe!' })
    });

    if(newParty) {
        res.status(201).json({ status: true, news: newParty })
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