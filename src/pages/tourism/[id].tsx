import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/CategoryId.module.css";
import { PrismaClient } from "@prisma/client";
import api from "../../../libs/api";
import { BackButton } from "../../../components/BackButton";
import Image from "next/image";
import { useRouter } from 'next/router';
import { Tourism } from "../../../types/Tourism";
import { Slide } from "../../../components/Slide";

type Props = {
    tourism: Tourism
}

const Party = ({ tourism }: Props) => {
    const router = useRouter();

    // const go = () => {
    //   router.push(`/category/${storeid}`)
    // }

    // const [store, setStore] = useState('');
    // const [storeid, setStoreid] = useState(0);

    // places.map(function(place, i) {
    //   useEffect(() => {
    //     let newStore: Place[] = [];
    //     for(let i of places) {
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
            <h1>{tourism.title}</h1>

            <div className={styles.smallContainer}>
              <div className={styles.image}>
                  <Image width={400} height={300} src={tourism.image} alt="" />
              </div>
              <div>
                <p>{tourism.text}</p>
                <p>Local: <small>{tourism.local}</small></p>
                <p>Organizado por: {tourism.responsible}</p>
                <p>Data: {tourism.date}</p>
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
    const tourism = await prisma.tourism.findMany();
    return {
      paths: tourism.map((tourism) => ({
        params: {
          id: tourism.id.toString()
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

    const tourism = await api.getTourism(parseInt(id as string));
    return {
      props: {
        tourism
      }
    }
}

export default Party;