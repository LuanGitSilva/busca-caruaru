import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import api from "../../../libs/api";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Tourism } from "../../../types/Tourism";


type Props = {
    tourism: Tourism[];
}

const EditParty = ({ tourism }: Props) => {
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
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [local, setLocal] = useState('');
    const [responsible, setResponsible] = useState('');
    const [maps, setMaps] = useState('');

    const sendInfo = async () => {
        if(id && title || image || text || local) {

            let response = await fetch(`/api/tourism/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: title,
                    image: image,
                    text: text,
                    date: date,
                    local: local,
                    responsible: responsible,
                    maps: maps
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();

            if(json.status) {
                alert('Festa alterada com sucesso!');
                setId(0);
                setTitle('');
                setImage('');
                setText('');
                setDate('');
                setLocal('')
                setResponsible('');
                setMaps('');
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

                <h2 className={styles.subtitle}>Selecione o turismo: <small>{title}</small></h2>
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
                        {tourism.map((item, index) => (
                            <li
                                onClick={()=>{
                                    setTitle(item.title)
                                    setId(item.id)
                                    setShow(false)
                                    console.log(title)
                                    console.log(id)
                                }}
                                key={index}
                            >{item.title}</li>
                        ))}
                    </ul>
                </div>
                
                <h2 className={styles.subtitle}>Url da imagem do turismo:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                        placeholder="Digite a url da imagem do turismo" />
                    <KeyboardIcon
                        style={{
                            display: image ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>
                
                <h2 className={styles.subtitle}>Texto sobre o turismo:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                        placeholder="Digite uma descrição sobre o turismo" />
                    <KeyboardIcon
                        style={{
                            display: text ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Data do turismo:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                        placeholder="Digite a data do turismo" />
                    <KeyboardIcon
                        style={{
                            display: date ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Responsável:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={responsible}
                        onChange={(e)=>setResponsible(e.target.value)}
                        placeholder="Digite o nome do responsável do turismo" />
                    <KeyboardIcon
                        style={{
                            display: responsible ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Informe o local:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={local}
                        onChange={(e)=>setLocal(e.target.value)}
                        placeholder="Informe o local" />
                    <KeyboardIcon
                        style={{
                            display: local ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Localização no maps:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={maps}
                        onChange={(e)=>setMaps(e.target.value)}
                        placeholder="Digite a URL do GoogleMaps" />
                    <KeyboardIcon
                        style={{
                            display: maps ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div 
                    style={{
                        display: id && title || image || text || local ? 'flex' : 'none'
                    }}
                    className={styles.btn}
                >
                    <button onClick={sendInfo}>Enviar</button>
                </div>

                <div 
                    style={{
                        display: id && title || image || text || local ? 'none' : 'flex'
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

// falta inserir o maps e local de turismo e festa

export const getStaticProps = async () => {
    // DRY = Don't Repeat Yourself
    const tourism = await api.getAllTourism();  
    return { 
        props: { tourism }
    }
}

export default EditParty;