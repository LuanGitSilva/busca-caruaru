import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";
import api from "../../../../libs/api";

// Reading place info
const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const place = await api.getPlace(parseInt(id as string));
    if(place) {
        res.json({ status: true, place });
        return;
    }
    res.json({ error: 'Lugar não encontrado!' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { name, text, contact, address, image, maps } = req.body;
    const { id } = req.query;

    const updatedPlace = await api.updatePlace(
        parseInt(id as string),
        name,
        text,
        contact,
        address, 
        image,
        maps
    );

    if(updatedPlace) {
        res.json({ status: true, place: updatedPlace });
        return;
    }

    res.json({ error: 'Auteração não realizada!' });
}

const handleDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deletedPlace = await api.deletePlace(parseInt(id as string)).catch(() => {
        res.json({ error: 'Lugar não encontrado!' })
     });

     if(deletedPlace) {
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