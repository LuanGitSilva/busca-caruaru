import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all places
const handlerGet: NextApiHandler = async(req, res) => {
    const places = await api.getAllPlaces();
    res.json({ status: true, places });
}

// Inserting new place
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, name, text1, text2, text3, image1, image2, image3, contact, address, maps, type } = req.body;

    const newPlace = await api.addPlace(id, name, text1, text2, text3, image1, image2, image3, contact, address, maps, type).catch(() => {
        res.json({ error: 'Local já existe!' })
    });

    if(newPlace) {
        res.status(201).json({ status: true, place: newPlace })
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