import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import { useEffect, useState } from "react";
import { Product } from "../../../types/Product";
import { Place } from "../../../types/Place";
import Image from "next/image";
import { useRouter } from 'next/router';
import { Slide } from "../../../components/Slide";

type Props = {
    product: Product,
    places: Place[]
}

const CategoryType = ({ product, places }: Props) => {
    const router = useRouter();

    const go = () => {
      router.push(`/category/${storeid}`)
    }

    const [store, setStore] = useState('');
    const [storeid, setStoreid] = useState(0);

    useEffect(() => {
      let newStore: Place[] = [];
      for(let i of places) {
        if(i.id == product.userId) {
          newStore.push(i);
          setStore(i.name);
          setStoreid(i.id);
        }
      }
    });

    console.log(store)

    return (
        <div className={styles.container}>
            <h1>{product.title}</h1>

            <div className={styles.smallContainer}>
              <div className={styles.image}>
                  <Image width={400} height={300} src={product.image} alt="" />
              </div>
              <div>
                <h3>Sobre nós:</h3>
                <p>{product.text}</p>
              </div>
            </div>

            <div className={styles.smallContainer}>
              <p>Visite o vendedor do produto aqui:
              <small onClick={go}>{store}</small>
              </p>
            </div>

            <Slide />           

            <div>
              <BackButton />
            </div>
        </div>
    );
}

export default CategoryType;

export const getStaticPaths = async () => {

    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();
    return {
      paths: products.map((product) => ({
        params: {
          id: product.id.toString()
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

    const places = await api.getAllPlaces();

    const prisma = new PrismaClient()
    const product = await api.getProduct(parseInt(id as string));
    return {
      props: {
        product,
        places
      }
    }
}