import { useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import api from "../../../libs/api";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type Props = {
    places: Place[];
}

const Edit = ({ places }: Props) => {
    const { data: session, status: sessionStatus } = useSession();

    const [show, setShow] = useState(false);
    const handleClick = () => {
        if(show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const [id, setId] = useState<number>();
    const [name, setName] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [maps, setMaps] = useState('');
    const [type, setType] = useState('');

    const sendInfo = async () => {
        if(id && name || image1 || image2 || image3 || text1 || text2 || text3 || contact || address || type) {

            let response = await fetch(`/api/places/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    name: name,
                    image1: image1,
                    image2: image2,
                    image3: image3,
                    text1: text1,
                    text2: text2,
                    text3: text3,
                    contact: contact,
                    address: address,
                    type: type
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();

            if(json.status) {
                alert('Local alterado com sucesso!');
                setId(0);
                setName('');
                setImage1('');
                setImage2('');
                setImage3('');
                setText1('');
                setText2('');
                setText3('');
                setContact('');
                setAddress('');
                setMaps('');
                setType('');
            }

        } else {
            alert("Preencha algum dado!")
        }
    }

    return (
        <>
            {sessionStatus === 'authenticated' &&
            <>
                <h1 className={styles.title}>Insira os dados para alteração</h1>

                <h2 className={styles.subtitle}>Selecione o local: <small>{name}</small></h2>
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
                                    setName(item.name)
                                    setId(item.id)
                                    setShow(false)
                                    console.log(name)
                                    console.log(id)
                                }}
                                key={index}
                            >{item.name}</li>
                        ))}
                    </ul>
                </div>
            
                <h2 className={styles.subtitle}>Nome do local:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Digite o nome do local" />
                    <KeyboardIcon
                        style={{
                            display: name ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>
                
                <h2 className={styles.subtitle}>Url da imagem do local:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={image1}
                        onChange={(e)=>setImage1(e.target.value)}
                        placeholder="Digite a url da primeira imagem do local" />
                    <KeyboardIcon
                        style={{
                            display: image1 ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div className={styles.search}>
                    <input
                        type="text"
                        value={image2}
                        onChange={(e)=>setImage2(e.target.value)}
                        placeholder="Digite a url da segunda imagem do local" />
                    <KeyboardIcon
                        style={{
                            display: image2 ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div className={styles.search}>
                    <input
                        type="text"
                        value={image3}
                        onChange={(e)=>setImage3(e.target.value)}
                        placeholder="Digite a url da terceira imagem do local" />
                    <KeyboardIcon
                        style={{
                            display: image3 ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>
                
                <h2 className={styles.subtitle}>Descrição do local:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={text1}
                        onChange={(e)=>setText1(e.target.value)}
                        placeholder="Digite uma descrição sobre o local" />
                    <KeyboardIcon
                        style={{
                            display: text1 ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div className={styles.search}>
                    <input
                        type="text"
                        value={text2}
                        onChange={(e)=>setText2(e.target.value)}
                        placeholder="Digite mais um texto sobre o local" />
                    <KeyboardIcon
                        style={{
                            display: text2 ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div className={styles.search}>
                    <input
                        type="text"
                        value={text3}
                        onChange={(e)=>setText3(e.target.value)}
                        placeholder="Digite mais um texto sobre o local" />
                    <KeyboardIcon
                        style={{
                            display: text3 ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Contato:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e)=>setContact(e.target.value)}
                        placeholder="Digite o contato do local" />
                    <KeyboardIcon
                        style={{
                            display: contact ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Endereço:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        placeholder="Digite o endereço do local" />
                    <KeyboardIcon
                        style={{
                            display: address ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>link do GoogleMaps:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={maps}
                        onChange={(e)=>setMaps(e.target.value)}
                        placeholder="Digite o link do GoogleMaps" />
                    <KeyboardIcon
                        style={{
                            display: maps ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Tipo do local:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={type}
                        onChange={(e)=>setType(e.target.value)}
                        placeholder="Digite o tipo do local" />
                    <KeyboardIcon
                        style={{
                            display: type ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div 
                    style={{
                        display: id && name || image1 || image2 || image3 || text1 || text2 || text3 || contact || address || type ? 'flex' : 'none'
                    }}
                    className={styles.btn}
                >
                    <button onClick={sendInfo}>Enviar</button>
                </div>

                <div 
                    style={{
                        display: id && name || image1 || image2 || image3 || text1 || text2 || text3 || contact || address || type ? 'none' : 'flex'
                    }}
                    className={styles.btn}
                >
                    <BackButton />
                </div>
                </>
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

export default Edit;