import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NewTourism = () => {    
    const { data: session, status: sessionStatus } = useSession();

    const router = useRouter();

    const [id, setId] = useState();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [local, setLocal] = useState('');
    const [responsible, setResponsible] = useState('');
    const [maps, setMaps] = useState('');

    const sendInfo = async () => {
        if(title && image && text && local) {
            let response = await fetch("/api/tourism", {
                method: 'POST',
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
                alert('Turismo cadastrado com sucesso!');
                setTitle('');
                setImage('');
                setText('');
                setDate('');
                setResponsible('');
                setLocal('');
                setMaps('');
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
                        <>
                        
                            <h1>Olá {session.user?.name}.</h1>
                        </>
                    }

                    <h1 className={styles.title}>Insira os dados sobre o turismo</h1>
                    
                    <h2 className={styles.subtitle}>Título do turismo:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder="Digite o título do turismo" />
                        <KeyboardIcon
                            style={{
                                display: title ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
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

                    <h2 className={styles.subtitle}>Data do turismo:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                            placeholder="Digite a data do turismo (ex.: 01/06/2023)" />
                        <KeyboardIcon
                            style={{
                                display: date ? 'none' : 'block'
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
                            placeholder="Digite o texto sobre o turismo" />
                        <KeyboardIcon
                            style={{
                                display: text ? 'none' : 'block'
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

                    <h2 className={styles.subtitle}>local:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={local}
                            onChange={(e)=>setLocal(e.target.value)}
                            placeholder="Informe o local do turismo" />
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
                            placeholder="Digite o link do GoogleMaps" />
                        <KeyboardIcon
                            style={{
                                display: maps ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <div
                        style={{
                            display: title && image && text && local ? 'flex' : 'none'
                        }}
                        className={styles.btn}
                    >
                        <button onClick={sendInfo}>Enviar</button>
                    </div>

                    <div
                        style={{
                            display: title && image && text && local ? 'none' : 'flex'
                        }}
                    >
                        <BackButton />
                    </div>
                </div>
            }
        </>
    );
}

export default NewTourism;