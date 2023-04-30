// import { NextApiHandler } from "next";
// import prisma from "../../../../libs/prisma";
// import api from "../../../../libs/api";

// // Reading product info
// const handlerGet: NextApiHandler = async (req, res) => {
//     const { id } = req.query;
//     const product = await api.getProduct(parseInt(id as string));
//     if(product) {
//         res.json({ status: true, product });
//         return;
//     }
//     res.json({ error: 'Produto não encontrado!' });
// }

// const handlerPut: NextApiHandler = async (req, res) => {
//     const { image, text, type, price, store, title, userId } = req.body;
//     const { id } = req.query;

//     const updatedProduct = await api.updateProduct(
//         parseInt(id as string),
//         image,
//         text,
//         type,
//         price,
//         store,
//         title,
//         userId
//     );

//     if(updatedProduct) {
//         res.json({ status: true, place: updatedProduct });
//         return;
//     }

//     res.json({ error: 'Auteração não realizada!' });
// }

// const handleDelete: NextApiHandler = async (req, res) => {
//     const { id } = req.query;

//     const deletedProduct = await api.deleteProduct(parseInt(id as string)).catch(() => {
//         res.json({ error: 'Produto não encontrado!' })
//      });

//      if(deletedProduct) {
//          res.json({ status: true });
//      }
// }

// const handler: NextApiHandler = async (req, res) => {
//     switch(req.method) {
//         case 'GET':
//             handlerGet(req, res);
//             break;
//         case 'PUT':
//             handlerPut(req, res);
//             break;
//         case 'DELETE':
//             handleDelete(req, res);
//             break;
//     }
// }

// export default handler;