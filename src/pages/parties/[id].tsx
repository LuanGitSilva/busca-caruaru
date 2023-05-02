import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Party } from "../../../types/Party";
import { Slide } from "../../../components/Slide";

type Props = {
    party: Party
}

const Party = ({ party }: Props) => {
    const router = useRouter();

    // const go = () => {
    //   router.push(`/category/${storeid}`)
    // }

    // const [store, setStore] = useState('');
    // const [storeid, setStoreid] = useState(0);

    // party.map(function(place, i) {
    //   useEffect(() => {
    //     let newStore: Party[] = [];
    //     for(let i of party) {
    //       if(i.id == party.userId) {
    //         newStore.push(i);
    //         setStore(i.name);
    //         setStoreid(i.id);
    //       }
    //     }
    //   })
    // });

    // console.log(store)

    return (
        <div className={styles.container}>
          <h1>{party.title}</h1>

          <div className={styles.smallContainer}>
            <div className={styles.image}>
                <img src={party.image} alt="" />
            </div>
            <div>
              <p>{party.text}</p>
              <p>Local: <small>{party.local}</small></p>
              <p>Organizado por: {party.responsible}</p>
              <p>Data: {party.date}</p>
            </div>
          </div>

          <Slide />

            <div>
              <BackButton />
            </div>
        </div>
    );
}

export const getStaticPaths = async () => {

    const prisma = new PrismaClient();
    const parties = await prisma.party.findMany();
    return {
      paths: parties.map((party) => ({
        params: {
          id: party.id.toString()
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

    const party = await api.getParty(parseInt(id as string));
    return {
      props: {
        party
      }
    }
}

export default Party;