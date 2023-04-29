// import { NextApiHandler } from "next";
// import api from "../../../../libs/api";

// // Getting all users
// const handlerGet: NextApiHandler = async(req, res) => {
//     const places = await api.getAllPlaces();
//     res.json({ status: true, places });
// }

// // Inserting new user
// const handlerPost: NextApiHandler = async (req, res) => {
//     const { id, name, text, contact, address, image, maps } = req.body;

//     const newPlace = await api.addPlace(id, name, text, contact, address, image, maps).catch(() => {
//         res.json({ error: 'Usuário já existe!' })
//     });

//     if(newPlace) {
//         res.status(201).json({ status: true, place: newPlace })
//     }
// }

// const handler: NextApiHandler = (req, res) => {
//     switch(req.method) {
//         case 'GET':
//             handlerGet(req, res);
//             break;
//         case 'POST':
//             handlerPost(req, res);
//             break;
//     }
// }

// export default handler;