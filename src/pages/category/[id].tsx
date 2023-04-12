import { Place } from "../../../types/Place";
import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

type Props = {
    place: Place
}

const CategoryType = ({ place }: Props) => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []); 

    return (
        <div className={styles.container}>
            <h1>{place.name}</h1>

            <div className={styles.image}>
                <img src={place.image} alt="" />
            </div>

            <h3 data-aos='fade-up'>Sobre nós:</h3>
            <p data-aos='fade-up'>{place.text} {place.text}</p>
            <p data-aos='fade-up'>{place.text} {place.text}</p>

            <h3 data-aos='fade-up'>Nosso endereço:</h3>
            <p data-aos='fade-up'>{place.address}</p>

            <h3 data-aos='fade-up'>Nosso contato:</h3>
            <p data-aos='fade-up'>{place.contact}</p>

            <div data-aos='fade-up' className={styles.googleMaps}>
              <iframe src={place.maps} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            

            <div data-aos='fade-up'>
              <BackButton />
            </div>
        </div>
    );
}

export default CategoryType;

export const getStaticPaths = async () => {

    const prisma = new PrismaClient();
    const places = await prisma.place.findMany();
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

    const prisma = new PrismaClient()
    const place = await api.getPlace(parseInt(id as string));
    return {
      props: {
        place
      }
    }
}