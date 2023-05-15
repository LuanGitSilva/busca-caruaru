import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import Image from "next/image";
import { Slide } from "../../../components/Slide";
import { News } from "../../../types/News";

type Props = {
    news: News
}
  
const PageNews = ({ news }: Props) => {
    return (
        <div className={styles.container}>
            <h1>{news.title}</h1>

            <div className={styles.smallContainer}>
              <div className={styles.image}>
                <Image 
                  width={400} 
                  height={300} 
                  src={news.image} alt="" 
                />
              </div>
              <div>
                <p>{news.text}</p>
                <p>Fonte: {news.author}</p>
                <p>Data: {news.date}</p>
              </div>
            </div>

            <Slide />          

            <div>
              <BackButton />
            </div>
        </div>
    );
}

export default PageNews;

export const getStaticPaths = async () => {

    const prisma = new PrismaClient();
    const news = await prisma.new.findMany();
    return {
      paths: news.map((news) => ({
        params: {
          id: news.id.toString()
        }
      })),
      fallback: false
    }
}

interface IParams extends ParsedUrlQuery {
    id: string;
}
export const getStaticProps = async (context: { params: IParams }, params: { id: string }) => {
    const { id } = context.params as IParams;

    const prisma = new PrismaClient();
    const news = await api.getNews(parseInt(id as string));
    return {
      props: {
        news
      }
    }
}