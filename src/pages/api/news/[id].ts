import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";
import api from "../../../../libs/api";

// Reading news info
const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const news = await api.getNews(parseInt(id as string));
    if(news) {
        res.json({ status: true, news });
        return;
    }
    res.json({ error: 'Notícia não encontrada!' });
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { title, text, image, date, author } = req.body;
    const { id } = req.query;

    const updatedNews = await api.updateNews(
        parseInt(id as string),
        title,
        text,
        date,
        author, 
        image
    );

    if(updatedNews) {
        res.json({ status: true, news: updatedNews });
        return;
    }

    res.json({ error: 'Alteração não realizada!' });
}

const handleDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deletedNews = await api.deleteNews(parseInt(id as string)).catch(() => {
        res.json({ error: 'Notícia não encontrada!' })
     });

     if(deletedNews) {
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