import { GetStaticPaths ,GetStaticProps } from "next";
import { Place } from "../../../types/Place";
import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";

type Props = {
    place: Place
}

const CategoryType = ({ place }: Props) => {

    return (
        <div className={styles.container}>
            <h1>{place.name}</h1>

            <div className={styles.image}>
                <img src={place.image} alt="" />
            </div>

            <h3>Sobre nós:</h3>
            <p>{place.text} {place.text}</p>
            <p>{place.text} {place.text}</p>

            <h3>Nosso endereço:</h3>
            <p>{place.address}</p>

            <h3>Nosso contato:</h3>
            <p>{place.contact}</p>
        </div>
    );
}

export default CategoryType;

export const getStaticPaths = async () => {
    // const res = await fetch('https://my-json-server.typicode.com/LuanGitSilva/api/data');
    // const places: Place[] = await res.json();
    // const paths = places.map(place => ({ 
    //     params: { id: place.id.toString() } 
    // }));
    // return { paths, fallback: false }

    const prisma = new PrismaClient();
    const places: Place[] = await prisma.place.findMany();
    return {
      paths: places.map((place) => ({
        params: {
          id: place.id.toString()
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

    // const req = await fetch(`https://my-json-server.typicode.com/LuanGitSilva/api/data/${id}`);
    // const place = await req.json();

    // return {
    //     props: {
    //         place
    //     }
    // }

    const prisma = new PrismaClient()
    const place = await api.getPlace(parseInt(id as string));
    return {
      props: {
        place
      }
    }
}