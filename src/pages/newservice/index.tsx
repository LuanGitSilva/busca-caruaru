import { useEffect, useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import api from "../../../libs/api";
import { Place } from "../../../types/Place";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ServiceType } from "../../../types/ServiceType";

type Props = {
    places: Place[];
    servicetype: ServiceType[];
}

const NewService = ({ places, servicetype }: Props) => {    
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
    const [userId, setUserId] = useState<number>( );

    const sendInfo = async () => {
        console.log('imagem: ' + image)
        console.log('texto: ' + text)
        console.log('preço: ' + price)
        console.log('loja: ' + store)
        console.log('título: ' + title)
        console.log('tipo: ' + type)
        console.log('user id: ' + userId)
        if(image && text && price && store && title && type && userId) {

            let response = await fetch("/api/services", {
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
                alert('Serviço cadastrado com sucesso!');
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

                    <h1 className={styles.title}>Insira os dados do serviço para o cadastro</h1>
                    
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
                    
                    <h2 className={styles.subtitle}>Url da imagem do serviço:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                            placeholder="Digite a url da imagem do serviço" />
                        <KeyboardIcon
                            style={{
                                display: image ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Título do serviço:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder="Digite o nome do serviço" />
                        <KeyboardIcon
                            style={{
                                display: title ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Descrição do serviço:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                            placeholder="Digite uma descrição sobre o serviço" />
                        <KeyboardIcon
                            style={{
                                display: text ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Preço do serviço:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            placeholder="Digite o preço do serviço (ex: 19,90)" />
                        <KeyboardIcon
                            style={{
                                display: price ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <h2 className={styles.subtitle}>Selecione o tipo de serviço: <small>{type}</small></h2>

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
                            {servicetype.map((item, index) => (
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
                            display: image && text && price && store && title && type ? 'none' : 'flex'
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
    const servicetype = await api.getAllServicesType();
    return { 
        props: { places, servicetype }
    }
}

export default NewService;