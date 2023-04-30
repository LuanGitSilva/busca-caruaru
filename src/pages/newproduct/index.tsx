import { useEffect, useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import api from "../../../libs/api";
import { Place } from "../../../types/Place";
import { Product } from "../../../types/Product";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProductType } from "../../../types/ProductType";

type Props = {
    places: Place[];
    producttype: ProductType[];
}

const RegisterProduct = ({ places, producttype }: Props) => {    
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleClick = () => {
        if(show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const [show2, setShow2] = useState(false);
    const handleClick2 = () => {
        if(show2) {
            setShow2(false);
        } else {
            setShow2(true);
        }
    }

    const [id, setId] = useState();
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [price, setPrice] = useState('');
    const [store, setStore] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [userId, setUserId] = useState<number>(0);

    const sendInfo = async () => {
        console.log('imagem: ' + image)
        console.log('texto: ' + text)
        console.log('preço: ' + price)
        console.log('loja: ' + store)
        console.log('título: ' + title)
        console.log('tipo: ' + type)
        console.log('user id: ' + userId)
        if(image && text && price && store && title && type && userId) {
            console.log(image)
            console.log(text)
            console.log(price)
            console.log(store)
            console.log(title)
            console.log(type)
            console.log(userId)

            let response = await fetch("/api/products", {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    image: image,
                    text: text,
                    price: price,
                    store: store,
                    type: type,
                    userId: userId,
                    title: title
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            if(json.status) {
                alert('Produto cadastrado com sucesso!');
                setImage('');
                setText('');
                setPrice('');
                setStore('');
                setTitle('');
                setType('');
                // setUserId(0);
            }
        } else {
            alert("Preencha todos os dados!")
        }
    }

    return (
        <> 
            {sessionStatus === 'unauthenticated' &&
                <div>
                    <h2>Acesso não autorizado, por favor entre em contato com a administração.</h2>
                    <button
                        onClick={() => router.replace('/')}
                    >Painel geral</button>
                </div>
            }
            {sessionStatus === 'authenticated' &&        
                <div>
                    {session &&
                        <h1>Olá {session.user?.name}.</h1>
                    }

                    <h1 className={styles.title}>Insira os dados do produto para o cadastro</h1>
                    
                    <h2 className={styles.subtitle}>Selecione o local: <small>{store}</small></h2>
                    <div className={styles.listName}>
                        <p
                            onClick={handleClick}
                        >
                            Escolher
                            {!show &&
                                <KeyboardArrowDownIcon className={styles.arrow} />
                            }
                            {show &&
                                <KeyboardArrowUpIcon className={styles.arrow} />
                            }
                        </p>
                        <ul
                            style={{
                                transition: '.4s',
                                height: show ? '100%' : '0'
                            }}
                        >
                            {places.map((item, index) => (
                                <li
                                    onClick={()=>{
                                        setStore(item.name)
                                        setUserId(item.id)
                                        setShow(false)
                                        console.log(store)
                                        console.log(userId)
                                    }}
                                    key={index}
                                >{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <h2 className={styles.subtitle}>Url da imagem do produto:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                            placeholder="Digite a url da imagem do produto" />
                        <KeyboardIcon
                            style={{
                                display: image ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Título do produto:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder="Digite o nome do produto" />
                        <KeyboardIcon
                            style={{
                                display: title ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Descrição do produto:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                            placeholder="Digite uma descrição sobre o produto" />
                        <KeyboardIcon
                            style={{
                                display: text ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Preço do produto:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            placeholder="Digite o preço do produto (ex: 19,90)" />
                        <KeyboardIcon
                            style={{
                                display: price ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Selecione o tipo do produto: <small>{type}</small></h2>

                    <div className={styles.listName}>
                        <p
                            onClick={handleClick2}
                        >
                            Escolher
                            {!show2 &&
                                <KeyboardArrowDownIcon className={styles.arrow} />
                            }
                            {show2 &&
                                <KeyboardArrowUpIcon className={styles.arrow} />
                            }
                        </p>
                        <ul
                            style={{
                                transition: '.4s',
                                height: show2 ? '100%' : '0'
                            }}
                        >
                            {producttype.map((item, index) => (
                                <li
                                    onClick={()=>{
                                        setType(item.title)
                                        setShow2(false)
                                        console.log(store)
                                        console.log(userId)
                                    }}
                                    key={index}
                                >{item.title}</li>
                            ))}
                        </ul>
                    </div>

                    <div
                        style={{
                            display: image && text && price && store && title && type ? 'flex' : 'none'
                        }}
                        className={styles.btn}
                    >
                        <button onClick={sendInfo}>Enviar</button>
                    </div>

                    <div
                        style={{
                            display: image && text && price && store && title && type  ? 'none' : 'flex'
                        }}
                    >
                        <BackButton />
                    </div>
                </div>
            }
        </>
    );
}

export const getStaticProps = async () => {
    // DRY = Don't Repeat Yourself
    const places = await api.getAllPlaces(); 
    const producttype = await api.getAllProductsType();
    return { 
        props: { places, producttype }
    }
}

export default RegisterProduct;