import { useEffect, useState } from "react";
import styles from '../../styles/Category.module.css';
import Link from "next/link";
import api from "../../../libs/api";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { Service } from "../../../types/Service";
import { PublicService } from "../../../types/PublicService";

type Props = {
    publicservices: PublicService[];
}

const PublicServices = ({ publicservices }: Props) => {
    const [busca, setBusca] = useState('');
    const [filtered, setFiltered] = useState<Service[]>([]);
    const [show, setShow] = useState(false);
      
    useEffect(() => {
        let newFiltered: Service[] = [];
        for(let i of publicservices) {
            if(i.title.toLowerCase().indexOf(busca.toLowerCase()) > -1) {
                newFiltered.push(i);
            }
        }
        setFiltered(newFiltered);
        if(busca) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [busca]);

    return (
        <>
            <div className={styles.search}>
                <input 
                    type="text"
                    value={busca}
                    onChange={(e)=>setBusca(e.target.value)}
                    placeholder="Digite sua busca" />
                {show &&
                    <KeyboardIcon 
                        className={styles.icon}
                    />
                }
                {!show &&
                    <SearchIcon
                        className={styles.icon}
                    />
                }
            </div>

            {show &&
                <div className={styles.container}>
                    <h1>Locais</h1>
                    <ul>
                        {filtered.map((item, index)=>(
                            <li key={index}>
                                <Link href={`publicservices/${item.id}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <BackButton />
                </div>
            }
            {!show &&
                <div className={styles.container}>
                    <h1>Serviços Públicos</h1>
                    <ul>
                        {publicservices.map((item, index)=>(
                            <li key={index}>
                                <Link href={`publicservices/${item.id}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    
                    <BackButton />
                </div>
            }
        </>
    );
}

export const getStaticProps = async () => {
    // DRY = Don't Repeat Yourself
    const publicservices = await api.getAllPublicServices();  
    return { 
        props: { publicservices }
    }
}

export default PublicServices;