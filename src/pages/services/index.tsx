import { useEffect, useState } from "react";
import styles from '../../styles/Category.module.css';
import Link from "next/link";
import api from "../../../libs/api";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { Service } from "../../../types/Service";

type Props = {
    services: Service[];
}

const Services = ({ services }: Props) => {
    const [busca, setBusca] = useState('');
    const [filtered, setFiltered] = useState<Service[]>([]);
    const [show, setShow] = useState(false);
      
    services.map(function(service, i) {
        useEffect(() => {
            let newFiltered: Service[] = [];
            for(let i of services) {
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
    });

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
                                <Link href={`services/${item.id}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <BackButton />
                </div>
            }
            {!show &&
                <div className={styles.container}>
                    <h1>Serviços</h1>
                    <ul>
                        {services.map((item, index)=>(
                            <li key={index}>
                                <Link href={`services/${item.id}`}>{item.title}</Link>
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
    const services = await api.getAllServices();  
    return { 
        props: { services }
    }
}

export default Services;