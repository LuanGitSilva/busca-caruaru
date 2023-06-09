import { Place } from "../../../types/Place";
import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import Image from "next/image";
import { Slide } from "../../../components/Slide";

type Props = {
    place: Place
}
  
const CategoryType = ({ place }: Props) => {
    return (
        <div className={styles.container}>
            <h1>{place.name}</h1>

            <div className={styles.smallContainer}>
              <div className={styles.image}>
                  <Image width={400} height={300} src={place.image1} alt="" />
              </div>
              <div>
                <h3>Sobre nós:</h3>
                <p>{place.text1}</p>
              </div>
            </div>

            <Slide />

            <p>{place.text2}</p>

            <div className={styles.smallContainer}>
              <div className={styles.image}>
                  <Image width={400} height={300} src={place.image2} alt="" />
              </div>
              <div className={styles.image}>
                  <Image width={400} height={300} src={place.image3} alt="" />
              </div>
            </div>

            <p>{place.text3}</p>

            <div className={styles.smallContainer}>
              <div>
                <h3>Nosso endereço:</h3>
                <p>{place.address}</p>
              </div>
              <div>
                <h3>Nosso contato:</h3>
                <p>{place.contact}</p>
              </div>
            </div>

            <div className={styles.googleMaps}>
              <iframe src={place.maps} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            

            <div>
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