import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";
import api from "../../../../libs/api";

// Reading news info
const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const party = await api.getParty(parseInt(id as string));
    if(party) {
        res.json({ status: true, party });
        return;
    }
    res.json({ error: 'Festa não encontrada!' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { title, text, image, date, local, responsible, maps } = req.body;
    const { id } = req.query;

    const updatedParty = await api.updateParty(
        parseInt(id as string),
        title,
        text,
        date,
        local, 
        image,
        responsible,
        maps
    );

    if(updatedParty) {
        res.json({ status: true, party: updatedParty });
        return;
    }

    res.json({ error: 'Alteração não realizada!' });
}

const handleDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deletedParty = await api.deleteParty(parseInt(id as string)).catch(() => {
        res.json({ error: 'Festa não encontrada!' })
     });

     if(deletedParty) {
         res.json({ status: true });
     }
}

const handler: NextApiHandler = async (req, res) => {
    switch(req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'PUT':
            handlerPut(req, res);
            break;
        case 'DELETE':
            handleDelete(req, res);
            break;
    }
}

export default handler;