import { useEffect, useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import Link from "next/link";
import api from "../../../libs/api";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton"; 
import { Product } from "../../../types/Product";

type Props = {
    products: Product[];
}

const Product = ({ products }: Props) => {
    const [busca, setBusca] = useState('');
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [show, setShow] = useState(false);
      
    products.map(function(product, i) {
        useEffect(() => {
            let newFiltered: Product[] = [];
            for(let i of products) {
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
                                <Link href={`product/${item.id}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <BackButton />
                </div>
            }
            {!show &&
                <div className={styles.container}>
                    <h1>Produtos</h1>
                    <ul>
                        {products.map((item, index)=>(
                            <li key={index}>
                                <Link href={`product/${item.id}`}>{item.title}</Link>
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
    const products = await api.getAllProducts();  
    return { 
        props: { products }
    }
}

export default Product;