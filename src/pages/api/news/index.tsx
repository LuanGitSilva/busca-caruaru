import { NextApiHandler } from "next";
import api from "../../../../libs/api";

// Getting all news
const handlerGet: NextApiHandler = async(req, res) => {
    const news = await api.getAllNews();
    res.json({ status: true, news });
}

// Inserting new news
const handlerPost: NextApiHandler = async (req, res) => {
    const { id, title, text, image, date, author } = req.body;

    const newNews = await api.addNews(id, title, text, image, date, author).catch(() => {
        res.json({ error: 'Notícia já existe!' })
    });

    if(newNews) {
        res.status(201).json({ status: true, news: newNews })
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