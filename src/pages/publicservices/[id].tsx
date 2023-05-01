import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import { useEffect, useState } from "react";
import { Place } from "../../../types/Place";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Service } from "../../../types/Service";

type Props = {
    publicservice: Service,
    places: Place[]
}

const PublicServiceType = ({ publicservice, places }: Props) => {
    const router = useRouter();

    const go = () => {
      router.push(`/category/${storeid}`)
    }

    const [store, setStore] = useState('');
    const [storeid, setStoreid] = useState(0);

    places.map(function(place, i) {
      useEffect(() => {
        let newStore: Place[] = [];
        for(let i of places) {
          if(i.id == publicservice.userId) {
            newStore.push(i);
            setStore(i.name);
            setStoreid(i.id);
          }
        }
      })
    });

    console.log(store)

    return (
        <div className={styles.container}>
            <h1>{publicservice.title}</h1>

            <div className={styles.image}>
                <img src={publicservice.image} alt="" />
            </div>

            <h3>Sobre o produto:</h3>
            <p>{publicservice.text}</p>

            <h3>Preço:</h3>
            <p>{publicservice.price}</p>

            <h3>Loja:</h3>

            <p onClick={go}>{store}</p>            

            <div>
              <BackButton />
            </div>
        </div>
    );
}

export default PublicServiceType;

export const getStaticPaths = async () => {

    const prisma = new PrismaClient();
    const services = await prisma.service.findMany();
    return {
      paths: services.map((service) => ({
        params: {
          id: service.id.toString()
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
    const publicservice = await api.getPublicService(parseInt(id as string));
    return {
      props: {
        publicservice,
        places
      }
    }
}