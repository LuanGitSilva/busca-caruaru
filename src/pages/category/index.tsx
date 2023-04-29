import { useEffect, useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import Link from "next/link";
import api from "../../../libs/api";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton"; 

type Props = {
    places: Place[];
}

const Category = ({ places }: Props) => {
    const [busca, setBusca] = useState('');
    const [filtered, setFiltered] = useState<Place[]>([]);
    const [show, setShow] = useState(false);
      
    places.map(function(place, i) {
        useEffect(() => {
            let newFiltered: Place[] = [];
            for(let i of places) {
                if(i.name.toLowerCase().indexOf(busca.toLowerCase()) > -1) {
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
                                <Link href={`category/${item.id}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>

                    <BackButton />
                </div>
            }
            {!show &&
                <div className={styles.container}>
                    <h1>Locais</h1>
                    <ul>
                        {places.map((item, index)=>(
                            <li key={index}>
                                <Link href={`category/${item.id}`}>{item.name}</Link>
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
    const places = await api.getAllPlaces();  
    return { 
        props: { places }
    }
}

export default Category;