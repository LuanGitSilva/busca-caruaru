import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";
import api from "../../../../libs/api";

// Reading news tourism
const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const tourism = await api.getTourism(parseInt(id as string));
    if(tourism) {
        res.json({ status: true, tourism });
        return;
    }
    res.json({ error: 'Local de turismo não encontrada!' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { title, text, image, date, local, responsible, maps } = req.body;
    const { id } = req.query;

    const updatedTourism = await api.updateTourism(
        parseInt(id as string),
        title,
        text,
        date,
        local, 
        image,
        responsible,
        maps
    );

    if(updatedTourism) {
        res.json({ status: true, tourism: updatedTourism });
        return;
    }

    res.json({ error: 'Alteração não realizada!' });
}

const handleDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deletedTourism = await api.deleteTourism(parseInt(id as string)).catch(() => {
        res.json({ error: 'Local de turismo não encontrada!' })
     });

     if(deletedTourism) {
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